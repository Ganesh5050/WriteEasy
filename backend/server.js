const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const yaml = require('js-yaml');
const nodemailer = require('nodemailer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OAuth2Client } = require('google-auth-library');
const { supabaseAdmin, supabase } = require('./config/supabase');
const { User, Project, ApiSpec, GeneratedArtifact, Notification, AuditLog } = require('./models');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Google Gemini AI client (FREE!)
let genAI = null;
let geminiModel = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Stable and reliable!
  console.log('🤖 Google Gemini 2.0 Flash AI integration enabled (FREE!)');
} else {
  console.log('⚠️ Gemini API key not found - AI features disabled');
}

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8080', 
    'http://localhost:8081',
    'http://localhost:8082',
    'http://localhost:8083',
    'http://localhost:8084',
    'http://localhost:5173',
    /\.vercel\.app$/,  // Allow all Vercel deployments
    /\.onrender\.com$/ // Allow Render deployments
  ],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/generated', express.static('generated'));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.json', '.yaml', '.yml'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only JSON and YAML files are allowed'));
    }
  }
});

// Initialize database models (replaces in-memory arrays)
const userModel = new User();
const projectModel = new Project();
const apiSpecModel = new ApiSpec();
const generatedArtifactModel = new GeneratedArtifact();
const notificationModel = new Notification();
const auditLogModel = new AuditLog();

// JWT Secret (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Utility functions
const sendEmailNotification = async (userId, notification) => {
  try {
    const user = await userModel.findById(userId);
    if (!user || !user.email) return;
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Speakeasy Notification: ${notification.type}`,
      html: `
        <h2>Speakeasy Notification</h2>
        <p><strong>Type:</strong> ${notification.type}</p>
        <p><strong>Message:</strong> ${notification.message}</p>
        <p><strong>Time:</strong> ${new Date(notification.created_at).toLocaleString()}</p>
      `
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

const parseOpenAPISpec = (content) => {
  try {
    // Try JSON first
    return JSON.parse(content);
  } catch {
    try {
      // Try YAML
      return yaml.load(content);
    } catch (error) {
      throw new Error('Invalid OpenAPI specification format');
    }
  }
};

const generateMcpConfig = (spec, config) => {
  return {
    name: config.name || spec.info?.title || 'mcp-server',
    version: config.version || spec.info?.version || '1.0.0',
    description: config.description || spec.info?.description || 'MCP Server',
    tools: Object.keys(spec.paths || {}).map(path => ({
      name: path.replace(/[{}]/g, '').replace(/\//g, '_'),
      description: `Tool for ${path}`,
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', default: path },
          method: { type: 'string', default: 'GET' }
        }
      }
    })),
    server: {
      host: config.host || 'localhost',
      port: config.port || 3002
    }
  };
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Check if email exists
app.post('/api/auth/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await userModel.findByEmail(email);
    
    res.json({ exists: !!user });
  } catch (error) {
    console.error('Check email error:', error);
    res.status(500).json({ error: 'Failed to check email' });
  }
});

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }
    
    // Check if user already exists
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists. Please try logging in instead.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user in Supabase Auth first
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true  // Auto-confirm email for development
    });
    
    if (authError) {
      console.error('Supabase Auth Error:', authError);
      return res.status(400).json({ error: `Failed to create user account: ${authError.message}` });
    }
    
    // User is automatically created in our database by the trigger
    // Just fetch the created user
    const user = await userModel.findById(authUser.user.id);
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    
    // Log the registration
    await auditLogModel.log(user.id, 'user_registered', 'user', user.id, { email, name });
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        createdAt: user.created_at
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: `Registration failed: ${error.message}` });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Authenticate with Supabase Auth using regular client
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (authError || !authData.user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Get user profile from our database
    const user = await userModel.findById(authData.user.id);
    if (!user) {
      return res.status(401).json({ error: 'User profile not found' });
    }
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    
    // Log the login
    await auditLogModel.log(user.id, 'user_login', 'user', user.id, { email });
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        createdAt: user.created_at
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: `Login failed: ${error.message}` });
  }
});

// Get current user endpoint
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        createdAt: user.created_at
      } 
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user information' });
  }
});

// GitHub OAuth routes
app.post('/api/auth/github', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'GitHub authorization code is required' });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return res.status(400).json({ error: 'GitHub token exchange failed' });
    }

    // Get user info from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const githubUser = await userResponse.json();

    // Check if user already exists by GitHub ID or email
    let user = await userModel.findByGithubId(githubUser.id) || await userModel.findByEmail(githubUser.email);
    
    if (!user) {
      // Create new user in Supabase Auth
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: githubUser.email,
        user_metadata: { 
          name: githubUser.name,
          avatar_url: githubUser.avatar_url,
          github_id: githubUser.id
        }
      });
      
      if (authError) {
        return res.status(400).json({ error: 'Failed to create user account' });
      }
      
      // Create user profile in our database
      user = await userModel.create({
        id: authUser.user.id,
        email: githubUser.email,
        name: githubUser.name,
        avatar_url: githubUser.avatar_url,
        github_id: githubUser.id,
        provider: 'github'
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Log the GitHub login
    await auditLogModel.log(user.id, 'github_login', 'user', user.id, { email: githubUser.email, github_id: githubUser.id });

    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar_url,
        provider: user.provider
      }
    });
  } catch (error) {
    console.error('GitHub OAuth Error:', error);
    res.status(500).json({ 
      error: 'GitHub authentication failed', 
      details: error.message 
    });
  }
});

// Microsoft OAuth routes
app.post('/api/auth/microsoft', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Microsoft authorization code is required' });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.MICROSOFT_CLIENT_ID,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.MICROSOFT_REDIRECT_URI || 'http://localhost:8081/auth/microsoft/callback',
        scope: 'openid profile email'
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return res.status(400).json({ error: 'Microsoft token exchange failed' });
    }

    // Get user info from Microsoft
    const userResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });

    const microsoftUser = await userResponse.json();

    // Check if user already exists by Microsoft ID or email
    let user = await userModel.findByMicrosoftId(microsoftUser.id) || await userModel.findByEmail(microsoftUser.mail || microsoftUser.userPrincipalName);
    
    if (!user) {
      // Create new user in Supabase Auth
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: microsoftUser.mail || microsoftUser.userPrincipalName,
        user_metadata: { 
          name: microsoftUser.displayName,
          microsoft_id: microsoftUser.id
        }
      });
      
      if (authError) {
        return res.status(400).json({ error: 'Failed to create user account' });
      }
      
      // Create user profile in our database
      user = await userModel.create({
        id: authUser.user.id,
        email: microsoftUser.mail || microsoftUser.userPrincipalName,
        name: microsoftUser.displayName,
        microsoft_id: microsoftUser.id,
        provider: 'microsoft'
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Log the Microsoft login
    await auditLogModel.log(user.id, 'microsoft_login', 'user', user.id, { email: user.email, microsoft_id: microsoftUser.id });

    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar_url,
        provider: user.provider
      }
    });
  } catch (error) {
    console.error('Microsoft OAuth Error:', error);
    res.status(500).json({ 
      error: 'Microsoft authentication failed', 
      details: error.message 
    });
  }
});

// Discord OAuth routes
app.post('/api/auth/discord', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Discord authorization code is required' });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.DISCORD_REDIRECT_URI || 'http://localhost:8081/auth/discord/callback'
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return res.status(400).json({ error: 'Discord token exchange failed' });
    }

    // Get user info from Discord
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });

    const discordUser = await userResponse.json();

    // Check if user already exists by Discord ID or email
    let user = await userModel.findByDiscordId(discordUser.id) || await userModel.findByEmail(discordUser.email);
    
    if (!user) {
      // Create new user in Supabase Auth
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: discordUser.email,
        user_metadata: { 
          name: discordUser.username,
          avatar_url: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
          discord_id: discordUser.id
        }
      });
      
      if (authError) {
        return res.status(400).json({ error: 'Failed to create user account' });
      }
      
      // Create user profile in our database
      user = await userModel.create({
        id: authUser.user.id,
        email: discordUser.email,
        name: discordUser.username,
        avatar_url: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`,
        discord_id: discordUser.id,
        provider: 'discord'
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Log the Discord login
    await auditLogModel.log(user.id, 'discord_login', 'user', user.id, { email: discordUser.email, discord_id: discordUser.id });

    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar_url,
        provider: user.provider
      }
    });
  } catch (error) {
    console.error('Discord OAuth Error:', error);
    res.status(500).json({ 
      error: 'Discord authentication failed', 
      details: error.message 
    });
  }
});

// Google OAuth routes
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Google token is required' });
    }

    // Verify the Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Check if user already exists
    let user = await userModel.findByGoogleId(googleId);
    
    if (!user) {
      // Check if user exists by email
      user = await userModel.findByEmail(email);
      
      if (user) {
        // Update existing user with Google info
        user = await userModel.update(user.id, {
          google_id: googleId,
          avatar_url: picture,
          provider: 'google'
        });
      } else {
        // Create new user in Supabase Auth
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email,
          user_metadata: { 
            name,
            avatar_url: picture,
            google_id: googleId
          }
        });
        
        if (authError) {
          return res.status(400).json({ error: 'Failed to create user account' });
        }
        
        // Create user profile in our database
        user = await userModel.create({
          id: authUser.user.id,
          email,
          name,
          avatar_url: picture,
          google_id: googleId,
          provider: 'google'
        });
      }
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Log the Google login
    await auditLogModel.log(user.id, 'google_login', 'user', user.id, { email, google_id: googleId });

    res.json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar_url,
        provider: user.provider
      }
    });
  } catch (error) {
    console.error('Google OAuth Error:', error);
    res.status(500).json({ 
      error: 'Google authentication failed', 
      details: error.message 
    });
  }
});

// OpenAPI spec management
app.post('/api/specs/upload', authenticateToken, upload.single('spec'), async (req, res) => {
  try {
    const { file } = req;
    const userId = req.user.userId;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Read and parse OpenAPI spec
    const specContent = fs.readFileSync(file.path, 'utf8');
    const spec = parseOpenAPISpec(specContent);
    
    // Create API spec in database
    const apiSpec = await apiSpecModel.create({
      user_id: userId,
      name: spec.info?.title || file.originalname.replace(/\.[^/.]+$/, ""),
      version: spec.info?.version || '1.0.0',
      content: spec,
      original_file: specContent,
      file_name: file.originalname,
      file_size: file.size
    });
    
    // Clean up uploaded file
    fs.unlinkSync(file.path);
    
    // Log the upload
    await auditLogModel.log(userId, 'api_spec_uploaded', 'api_spec', apiSpec.id, { 
      file_name: file.originalname,
      file_size: file.size 
    });
    
    res.json({ 
      specId: apiSpec.id, 
      spec: {
        id: apiSpec.id,
        info: spec.info,
        paths: Object.keys(spec.paths || {}),
        fileName: file.originalname,
        createdAt: apiSpec.created_at
      }
    });
  } catch (error) {
    console.error('Spec upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/specs', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userSpecs = await apiSpecModel.findByUserId(userId);
    
    res.json(userSpecs.map(spec => ({
      id: spec.id,
      info: spec.content.info,
      fileName: spec.file_name,
      createdAt: spec.created_at
    })));
  } catch (error) {
    console.error('Get specs error:', error);
    res.status(500).json({ error: 'Failed to fetch specs' });
  }
});

// SDK Generation
app.post('/api/generate/sdk', authenticateToken, (req, res) => {
  const { specId, language, packageName, version } = req.body;
  const userId = req.user.userId;
  
  const spec = apiSpecs[specId];
  if (!spec || spec.userId !== userId) {
    return res.status(404).json({ error: 'Spec not found' });
  }
  
  const outputDir = `generated/${specId}/${language}`;
  const tempSpecFile = `uploads/temp-${specId}.json`;
  
  // Write spec to temporary file
  fs.writeFileSync(tempSpecFile, spec.originalFile);
  
  // Generate SDK using OpenAPI Generator
  const command = `npx @openapitools/openapi-generator-cli generate -i "${tempSpecFile}" -g ${language} -o ${outputDir} --package-name ${packageName} --package-version ${version || '1.0.0'}`;
  
  exec(command, (error, stdout, stderr) => {
    // Clean up temp file
    if (fs.existsSync(tempSpecFile)) {
      fs.unlinkSync(tempSpecFile);
    }
    
    if (error) {
      console.error('SDK Generation Error:', error);
      return res.status(500).json({ 
        error: 'SDK generation failed', 
        details: error.message 
      });
    }
    
    // Read generated files
    const generatedFiles = [];
    if (fs.existsSync(outputDir)) {
      const readDir = (dir, basePath = '') => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const relativePath = path.join(basePath, file);
          
          if (fs.statSync(filePath).isDirectory()) {
            readDir(filePath, relativePath);
          } else {
            generatedFiles.push({
              name: relativePath,
              size: fs.statSync(filePath).size,
              path: filePath
            });
          }
        });
      };
      readDir(outputDir);
    }
    
    // Store artifact record
    const artifact = {
      id: Date.now().toString(),
      projectId: null, // Will be set if associated with project
      type: 'sdk',
      language,
      files: generatedFiles,
      downloadUrl: `/api/download/${specId}/${language}`,
      createdAt: new Date()
    };
    generatedArtifacts.push(artifact);
    
    res.json({
      success: true,
      files: generatedFiles,
      downloadUrl: `/api/download/${specId}/${language}`,
      artifactId: artifact.id
    });
  });
});

// MCP Server Generation
app.post('/api/generate/mcp', authenticateToken, (req, res) => {
  const { specId, config } = req.body;
  const userId = req.user.userId;
  
  const spec = apiSpecs[specId];
  if (!spec || spec.userId !== userId) {
    return res.status(404).json({ error: 'Spec not found' });
  }
  
  const mcpConfig = generateMcpConfig(spec.content, config);
  const outputDir = `generated/${specId}/mcp`;
  
  // Create MCP server files
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate MCP server files
  const serverFile = `const express = require('express');
const app = express();
const port = ${mcpConfig.server.port};

app.use(express.json());

// MCP Tools
${mcpConfig.tools.map(tool => `
app.post('/tools/${tool.name}', (req, res) => {
  // Implementation for ${tool.name}
  res.json({ result: 'Tool ${tool.name} executed successfully' });
});`).join('')}

app.listen(port, () => {
  console.log(\`MCP Server running on port \${port}\`);
});`;

  const configFile = JSON.stringify(mcpConfig, null, 2);
  
  fs.writeFileSync(path.join(outputDir, 'server.js'), serverFile);
  fs.writeFileSync(path.join(outputDir, 'config.json'), configFile);
  fs.writeFileSync(path.join(outputDir, 'package.json'), JSON.stringify({
    name: mcpConfig.name,
    version: mcpConfig.version,
    description: mcpConfig.description,
    main: 'server.js',
    dependencies: {
      express: '^4.18.0'
    }
  }, null, 2));
  
  const generatedFiles = [
    { name: 'server.js', size: serverFile.length },
    { name: 'config.json', size: configFile.length },
    { name: 'package.json', size: 200 }
  ];
  
  // Store artifact record
  const artifact = {
    id: Date.now().toString(),
    projectId: null,
    type: 'mcp',
    language: 'javascript',
    files: generatedFiles,
    downloadUrl: `/api/download/mcp/${specId}`,
    createdAt: new Date()
  };
  generatedArtifacts.push(artifact);
  
  res.json({
    success: true,
    config: mcpConfig,
    files: generatedFiles,
    downloadUrl: `/api/download/mcp/${specId}`,
    artifactId: artifact.id
  });
});

// Download endpoints
app.get('/api/download/:specId/:language', authenticateToken, (req, res) => {
  const { specId, language } = req.params;
  const userId = req.user.userId;
  
  const spec = apiSpecs[specId];
  if (!spec || spec.userId !== userId) {
    return res.status(404).json({ error: 'Spec not found' });
  }
  
  const outputDir = `generated/${specId}/${language}`;
  
  if (!fs.existsSync(outputDir)) {
    return res.status(404).json({ error: 'Generated files not found' });
  }
  
  // Create zip file (simplified - in production use archiver)
  const zipFileName = `${spec.content.info?.title || 'api'}-${language}.zip`;
  res.download(outputDir, zipFileName);
});

app.get('/api/download/mcp/:specId', authenticateToken, (req, res) => {
  const { specId } = req.params;
  const userId = req.user.userId;
  
  const spec = apiSpecs[specId];
  if (!spec || spec.userId !== userId) {
    return res.status(404).json({ error: 'Spec not found' });
  }
  
  const outputDir = `generated/${specId}/mcp`;
  
  if (!fs.existsSync(outputDir)) {
    return res.status(404).json({ error: 'Generated files not found' });
  }
  
  const zipFileName = `${spec.content.info?.title || 'mcp-server'}-mcp.zip`;
  res.download(outputDir, zipFileName);
});

// Project management
app.get('/api/projects', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userProjects = await projectModel.findByUserId(userId);
    res.json(userProjects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const { name, description, specId } = req.body;
    const userId = req.user.userId;
    
    const project = await projectModel.create({
      user_id: userId,
      name,
      description,
      status: 'active'
    });
    
    // Log the project creation
    await auditLogModel.log(userId, 'project_created', 'project', project.id, { name, description });
    
    res.json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, gitUrl } = req.body;
    const userId = req.user.userId;
    
    const project = await projectModel.findById(id);
    if (!project || project.user_id !== userId) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const updatedProject = await projectModel.update(id, {
      name: name || project.name,
      description: description || project.description,
      git_url: gitUrl || project.git_url
    });
    
    // Log the project update
    await auditLogModel.log(userId, 'project_updated', 'project', id, { name, description, gitUrl });
    
    res.json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Notifications
app.get('/api/notifications', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userNotifications = await notificationModel.findByUserId(userId);
    res.json(userNotifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

app.post('/api/notifications', authenticateToken, async (req, res) => {
  try {
    const { type, message, projectId } = req.body;
    const userId = req.user.userId;
    
    const notification = await notificationModel.create({
      user_id: userId,
      project_id: projectId,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      message,
      read: false
    });
    
    // Send email notification (if configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      sendEmailNotification(userId, notification);
    }
    
    res.json(notification);
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

app.put('/api/notifications/:id/read', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const notification = await notificationModel.findById(id);
    if (!notification || notification.user_id !== userId) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    const updatedNotification = await notificationModel.markAsRead(id);
    res.json(updatedNotification);
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

// Google Gemini AI Chat Routes (public - no auth required - FREE!)
app.post('/api/openai/chat', async (req, res) => {
  if (!geminiModel) {
    return res.status(503).json({ 
      error: 'AI integration not available', 
      message: 'Please set GEMINI_API_KEY environment variable' 
    });
  }

  try {
    const { messages, model = 'gemini-2.5-flash', max_tokens = 1000 } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Convert OpenAI-style messages to Gemini format
    // Gemini expects a conversation history
    let prompt = '';
    messages.forEach(msg => {
      if (msg.role === 'system') {
        prompt += `System: ${msg.content}\n\n`;
      } else if (msg.role === 'user') {
        prompt += `User: ${msg.content}\n\n`;
      } else if (msg.role === 'assistant') {
        prompt += `Assistant: ${msg.content}\n\n`;
      }
    });

    // Get the last user message as the prompt
    const lastUserMsg = messages.filter(m => m.role === 'user').pop();
    const userPrompt = lastUserMsg ? lastUserMsg.content : prompt;

    // Retry logic for overloaded servers (up to 3 attempts)
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await geminiModel.generateContent(userPrompt);
        const response = await result.response;
        const text = response.text();

        return res.json({
          success: true,
          response: text,
          usage: {
            prompt_tokens: userPrompt.length / 4, // Approximate
            completion_tokens: text.length / 4,    // Approximate
            total_tokens: (userPrompt.length + text.length) / 4
          }
        });
      } catch (error) {
        lastError = error;
        
        // If server is overloaded (503), wait and retry
        if (error.status === 503 && attempt < 3) {
          console.log(`🔄 Gemini server busy, retrying (${attempt}/3)...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Wait 1s, 2s
          continue;
        }
        
        // For other errors or last attempt, throw
        throw error;
      }
    }
  } catch (error) {
    console.error('Gemini AI API Error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ 
      error: 'AI API request failed', 
      details: error.message || 'The AI service is temporarily unavailable. Please try again.',
      tip: error.status === 503 ? 'The AI is very popular right now! Please try again in a few seconds.' : undefined
    });
  }
});

app.post('/api/openai/completions', authenticateToken, async (req, res) => {
  if (!openai) {
    return res.status(503).json({ 
      error: 'OpenAI integration not available', 
      message: 'Please set OPENAI_API_KEY environment variable' 
    });
  }

  try {
    const { prompt, model = 'text-davinci-003', max_tokens = 1000 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.completions.create({
      model,
      prompt,
      max_tokens,
      temperature: 0.7
    });

    res.json({
      success: true,
      response: completion.choices[0].text,
      usage: completion.usage
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'OpenAI API request failed', 
      details: error.message 
    });
  }
});

app.post('/api/openai/embeddings', authenticateToken, async (req, res) => {
  if (!openai) {
    return res.status(503).json({ 
      error: 'OpenAI integration not available', 
      message: 'Please set OPENAI_API_KEY environment variable' 
    });
  }

  try {
    const { input, model = 'text-embedding-ada-002' } = req.body;
    
    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    const embedding = await openai.embeddings.create({
      model,
      input: Array.isArray(input) ? input : [input]
    });

    res.json({
      success: true,
      embeddings: embedding.data,
      usage: embedding.usage
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'OpenAI API request failed', 
      details: error.message 
    });
  }
});

app.get('/api/openai/models', authenticateToken, async (req, res) => {
  if (!openai) {
    return res.status(503).json({ 
      error: 'OpenAI integration not available', 
      message: 'Please set OPENAI_API_KEY environment variable' 
    });
  }

  try {
    const models = await openai.models.list();
    res.json({
      success: true,
      models: models.data
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch models', 
      details: error.message 
    });
  }
});

// Test OpenAI API Key endpoint
app.get('/api/openai/test', authenticateToken, async (req, res) => {
  if (!openai) {
    return res.status(503).json({ 
      success: false,
      error: 'OpenAI integration not available', 
      message: 'Please set OPENAI_API_KEY environment variable',
      status: 'DISABLED'
    });
  }

  try {
    // Test with a simple completion
    const testPrompt = "Say 'Hello, OpenAI API is working!' in exactly those words.";
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: testPrompt }],
      max_tokens: 50,
      temperature: 0
    });

    const response = completion.choices[0].message.content;
    
    res.json({
      success: true,
      status: 'WORKING',
      message: 'OpenAI API key is working perfectly!',
      testResponse: response,
      usage: completion.usage,
      model: 'gpt-3.5-turbo',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('OpenAI Test Error:', error);
    
    let errorType = 'UNKNOWN_ERROR';
    let errorMessage = error.message;
    
    if (error.message.includes('API key')) {
      errorType = 'INVALID_API_KEY';
      errorMessage = 'Invalid or expired API key';
    } else if (error.message.includes('quota')) {
      errorType = 'QUOTA_EXCEEDED';
      errorMessage = 'API quota exceeded';
    } else if (error.message.includes('rate limit')) {
      errorType = 'RATE_LIMITED';
      errorMessage = 'Rate limit exceeded';
    }
    
    res.status(500).json({ 
      success: false,
      status: 'ERROR',
      errorType: errorType,
      error: errorMessage,
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// =====================
// Demo Request Routes
// =====================

// Submit demo request (public endpoint - no auth required)
app.post('/api/demo-requests', async (req, res) => {
  try {
    const { firstName, lastName, email, company, role, demoType, message } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }
    
    // Use admin client to bypass RLS for public demo submissions
    const { data, error } = await supabaseAdmin
      .from('demo_requests')
      .insert([{
        first_name: firstName,
        last_name: lastName,
        email,
        company: company || null,
        role: role || null,
        demo_type: demoType || null,
        message: message || null
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Demo request error:', error);
      throw error;
    }
    
    console.log('✅ Demo request submitted:', data.id);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Demo request submission failed:', error);
    res.status(500).json({ error: 'Failed to submit demo request' });
  }
});

// Get all demo requests (admin only - for now, anyone can view)
app.get('/api/demo-requests', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Failed to fetch demo requests:', error);
    res.status(500).json({ error: 'Failed to fetch demo requests' });
  }
});

// Error handling middleware (MUST be last!)
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Speakeasy Backend Server running on port ${PORT}`);
  console.log(`📁 Upload directory: ${path.resolve('uploads')}`);
  console.log(`📦 Generated files: ${path.resolve('generated')}`);
  console.log(`🗄️ Supabase Database: Connected`);
  console.log(`🔐 Authentication: Supabase Auth + JWT`);
  console.log(`📊 Data Storage: Persistent (Supabase PostgreSQL)`);
});

module.exports = app;
