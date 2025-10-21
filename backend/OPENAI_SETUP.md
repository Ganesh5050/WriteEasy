# Environment Setup Instructions

## Backend Environment Variables

The Speakeasy clone works perfectly **WITHOUT any API keys**! All core features are available:

### ✅ **Core Features (No API Keys Required)**
- OpenAPI specification upload and management
- SDK generation in 10+ languages
- MCP server generation
- Terraform provider generation
- Documentation generation
- User authentication and project management
- Version control and notifications

### 🔧 **Optional Features (API Keys Required)**

If you want additional features, create a `.env` file in the `backend` directory:

```
# OpenAI API Configuration (OPTIONAL)
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/speakeasy_clone

# Email Configuration (optional)
EMAIL_USER=
EMAIL_PASS=

# Stripe Configuration (optional)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# OpenAPI Generator Version
OPENAPI_GENERATOR_VERSION=7.0.0
```

## Quick Start (No API Keys Needed)

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

3. **Server will run on:** `http://localhost:3001`

4. **Start the frontend:**
   ```bash
   cd ..
   npm run dev
   ```

5. **Access the application:** `http://localhost:3000`

## Optional OpenAI Integration

If you add an OpenAI API key, you get:
- Chat completions (`/api/openai/chat`)
- Text completions (`/api/openai/completions`) 
- Embeddings (`/api/openai/embeddings`)
- Model listing (`/api/openai/models`)

Access the OpenAI Chat interface at: `http://localhost:3000/openai-chat`

## Security Notes

- The `.env` file should be added to `.gitignore` to prevent committing sensitive data
- Never commit API keys to version control
- Use different API keys for development and production environments
- Rotate API keys regularly for security
