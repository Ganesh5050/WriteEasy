# Speakeasy Clone Backend

This is the backend API server for the Speakeasy clone project.

## Features

- **Authentication**: JWT-based user registration and login
- **File Upload**: OpenAPI specification upload (JSON/YAML)
- **SDK Generation**: Real SDK generation using OpenAPI Generator CLI
- **MCP Server Generation**: Generate Model-Compatible Protocol servers
- **Project Management**: Create and manage API projects
- **Notifications**: Real-time notifications system

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

3. **Server will run on:** `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /api/health` - Check if server is running

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### OpenAPI Specs
- `POST /api/specs/upload` - Upload OpenAPI specification
- `GET /api/specs` - Get user's uploaded specs

### SDK Generation
- `POST /api/generate/sdk` - Generate SDK for specific language
- `GET /api/download/:specId/:language` - Download generated SDK

### MCP Generation
- `POST /api/generate/mcp` - Generate MCP server
- `GET /api/download/mcp/:specId` - Download MCP server

### Projects
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project

### Notifications
- `GET /api/notifications` - Get user's notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark notification as read

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Supported SDK Languages

- Python
- JavaScript
- TypeScript
- Go
- Java
- C#
- PHP
- Ruby
- Rust
- Kotlin
- Swift
- Dart

## Development

The server uses:
- **Express.js** - Web framework
- **JWT** - Authentication
- **Multer** - File uploads
- **OpenAPI Generator CLI** - SDK generation
- **Nodemailer** - Email notifications

## Testing

Test the API connection:
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-10-13T10:01:53.644Z"
}
```
