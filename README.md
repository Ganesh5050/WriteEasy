# ✨ WriteEasy

> **Transform your OpenAPI specs into production-ready SDKs, beautiful documentation, and powerful developer tools**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ganesh5050/WriteEasy)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

### 🛠️ Developer Tools
- **SDK Generator**: Generate client libraries in 10+ languages from OpenAPI specs
- **API Documentation**: Auto-generate beautiful, interactive API docs
- **Terraform Provider**: Create infrastructure-as-code from your APIs
- **MCP Server Generator**: Build Model Context Protocol servers for AI integration

### 🎯 Core Capabilities
- ✅ **Multi-language Support**: TypeScript, Python, Go, Java, Ruby, PHP, C#, Rust, Swift, Kotlin
- ✅ **Real-time Generation**: Instant SDK and documentation creation
- ✅ **Version Control**: Track changes and manage multiple API versions
- ✅ **Authentication**: Secure user management with Supabase
- ✅ **Project Dashboard**: Organize and manage all your API projects
- ✅ **Beautiful UI**: Modern, responsive design with dark mode support

## 📸 Screenshots

![WriteEasy Homepage](public/images/screenshot-home.png)
![SDK Generator](public/images/screenshot-sdk.png)

## 🏗️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Framer Motion** - Smooth animations

### Backend
- **Node.js** + **Express.js**
- **Supabase** - Authentication & Database (PostgreSQL)
- **JWT** - Secure token-based auth
- **OpenAPI Generator** - SDK generation engine
- **Multer** - File upload handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ganesh5050/WriteEasy.git
   cd WriteEasy
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

3. **Set up environment variables**

   Create `.env` in the root directory:
   ```env
   VITE_API_URL=http://localhost:3001/api
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Create `backend/.env`:
   ```env
   JWT_SECRET=your_super_secret_jwt_key
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=3001
   ```

4. **Set up database**
   ```bash
   # Run the SQL schema in your Supabase SQL editor
   # File: backend/database/schema.sql
   ```

5. **Start development servers**

   Terminal 1 (Frontend):
   ```bash
   npm run dev
   ```

   Terminal 2 (Backend):
   ```bash
   cd backend
   node server.js
   ```

6. **Open your browser**
   ```
   http://localhost:8081
   ```

## 📦 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ganesh5050/WriteEasy)

## 🎯 Usage

### 1. Upload OpenAPI Spec
- Click "Get Started" or "Upload Spec"
- Upload your `openapi.json` or `openapi.yaml` file
- Or paste your spec directly

### 2. Generate SDK
- Select target language (TypeScript, Python, Go, etc.)
- Configure package name and version
- Click "Generate SDK"
- Download your ready-to-use client library

### 3. Generate Documentation
- Select your uploaded spec
- Choose documentation style
- Preview in real-time
- Deploy or download

### 4. Create MCP Server
- Configure server settings
- Add custom tools and prompts
- Generate production-ready MCP server
- Integrate with AI applications

## 🔐 Authentication

WriteEasy uses Supabase for authentication:
- ✅ Email/Password registration
- ✅ OAuth (Google, GitHub)
- ✅ JWT token-based sessions
- ✅ Secure password hashing
- ✅ Email verification

## 🗂️ Project Structure

```
WriteEasy/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── lib/               # Utilities & API client
│   └── hooks/             # Custom React hooks
├── backend/               # Backend source
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── middleware/        # Express middleware
│   ├── database/          # Database schemas
│   └── server.js          # Express server
├── public/                # Static assets
└── dist/                  # Production build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAPI Generator](https://openapi-generator.tech/) - SDK generation engine
- [Supabase](https://supabase.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel](https://vercel.com/) - Deployment platform

## 📧 Contact

Ganesh - [@Ganesh5050](https://github.com/Ganesh5050)

Project Link: [https://github.com/Ganesh5050/WriteEasy](https://github.com/Ganesh5050/WriteEasy)

---

**Made with ❤️ by Ganesh**
