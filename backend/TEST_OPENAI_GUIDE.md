# OpenAI API Key Test Guide

## 🧪 How to Test Your OpenAI API Key

### Method 1: Using the Web Interface (Easiest)

1. **Start the servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend  
   cd ..
   npm run dev
   ```

2. **Access the test page:**
   - Go to: `http://localhost:8081/openai-test`
   - Click "Test OpenAI API Key" button
   - See the results instantly!

### Method 2: Using curl (Command Line)

1. **First, register/login to get a token:**
   ```bash
   # Register a test user
   curl -X POST http://localhost:3001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpass123"}'
   
   # Login to get token
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpass123"}'
   ```

2. **Use the token to test OpenAI:**
   ```bash
   curl -X GET http://localhost:3001/api/openai/test \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

### Method 3: Direct API Test (Without Authentication)

If you want to test without authentication, you can temporarily modify the server:

1. **Edit `backend/server.js`**
2. **Find the test endpoint and remove `authenticateToken`:**
   ```javascript
   // Change this:
   app.get('/api/openai/test', authenticateToken, async (req, res) => {
   
   // To this:
   app.get('/api/openai/test', async (req, res) => {
   ```

3. **Test directly:**
   ```bash
   curl http://localhost:3001/api/openai/test
   ```

## 📊 Expected Results

### ✅ **Working API Key:**
```json
{
  "success": true,
  "status": "WORKING",
  "message": "OpenAI API key is working perfectly!",
  "testResponse": "Hello, OpenAI API is working!",
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 8,
    "total_tokens": 23
  },
  "model": "gpt-3.5-turbo",
  "timestamp": "2024-01-18T18:30:00.000Z"
}
```

### ❌ **Invalid API Key:**
```json
{
  "success": false,
  "status": "ERROR",
  "errorType": "INVALID_API_KEY",
  "error": "Invalid or expired API key",
  "details": "Incorrect API key provided..."
}
```

### ⚠️ **No API Key Set:**
```json
{
  "success": false,
  "error": "OpenAI integration not available",
  "message": "Please set OPENAI_API_KEY environment variable",
  "status": "DISABLED"
}
```

## 🔧 **Setting Up Your API Key**

1. **Create `.env` file in backend directory:**
   ```bash
   cd backend
   echo "OPENAI_API_KEY=your_actual_api_key_here" > .env
   ```

2. **Restart the backend server:**
   ```bash
   npm run dev
   ```

3. **Test again using any method above**

## 🎯 **Quick Test Commands**

```bash
# Test if server is running
curl http://localhost:3001/api/health

# Test OpenAI without auth (if you modify the endpoint)
curl http://localhost:3001/api/openai/test

# Test with auth (after getting token)
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3001/api/openai/test
```

## 🚨 **Common Issues**

- **"Access token required"** → You need to login first
- **"OpenAI integration not available"** → No API key set in .env
- **"Invalid API key"** → Wrong or expired API key
- **"Rate limit exceeded"** → Too many requests, wait a bit
- **"Quota exceeded"** → You've used up your OpenAI credits
