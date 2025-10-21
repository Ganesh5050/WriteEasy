import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Bot, 
  Download, 
  Copy, 
  CheckCircle, 
  Play,
  Settings,
  Code2,
  Zap,
  FileText,
  Server,
  MessageSquare,
  Brain,
  Cpu,
  Database,
  Cloud,
  Shield,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  TestTube,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Angry,
  Surprised,
  Confused,
  Wink,
  Kiss,
  Hug,
  Clap,
  Wave,
  Point,
  Stop,
  Skip,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Phone,
  PhoneOff,
  Mail,
  Bell,
  BellOff,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Clock,
  MapPin,
  Wifi,
  WifiOff,
  Signal,
  SignalOff,
  Battery,
  BatteryLow,
  Volume1,
  Headphones,
  HeadphonesOff,
  Speaker,
  SpeakerOff,
  Radio,
  RadioOff,
  Tv,
  TvOff,
  Computer,
  Laptop,
  Tablet,
  Smartphone,
  Watch,
  Gamepad2,
  Gamepad2Off,
  Controller,
  ControllerOff,
  Joystick,
  JoystickOff,
  Mouse,
  MouseOff,
  Keyboard,
  KeyboardOff,
  Printer,
  PrinterOff,
  Scanner,
  ScannerOff,
  Fax,
  FaxOff,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Voicemail,
  MessageCircleOff,
  MessageSquareOff,
  MailOpen,
  MailCheck,
  MailX,
  Send,
  SendOff,
  Inbox,
  InboxOff,
  Archive,
  ArchiveOff,
  Trash,
  TrashOff,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderX,
  FolderCheck,
  FolderOff,
  File,
  FilePlus,
  FileMinus,
  FileX,
  FileCheck,
  FileOff,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileSpreadsheet,
  FileArchive,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileZip,
  FileRar,
  File7z,
  FileTar,
  FileGz,
  FileBz2,
  FileXz,
  FileLz4,
  FileZstd,
  FileCab,
  FileIso,
  FileDmg,
  FileApp,
  FileExe,
  FileMsi,
  FileDeb,
  FileRpm,
  FileApk,
  FileIpa,
  FileAab,
  FileSnap,
  FileFlatpak,
  FileAppimage,
  FileDocker,
  FileKubernetes,
  FileTerraform,
  FileAnsible,
  FileChef,
  FilePuppet,
  FileSalt,
  FileVagrant,
  FileDockerCompose,
  FileKubernetesManifest,
  FileTerraformPlan,
  FileAnsiblePlaybook,
  FileChefRecipe,
  FilePuppetManifest,
  FileSaltState,
  FileVagrantfile,
  FileDockerfile,
  FileMakefile,
  FileCMake,
  FileGradle,
  FileMaven,
  FileNpm,
  FileYarn,
  FilePnpm,
  FileBun,
  FileDeno,
  FileNode,
  FileReact,
  FileVue,
  FileAngular,
  FileSvelte,
  FileNext,
  FileNuxt,
  FileGatsby,
  FileAstro,
  FileRemix,
  FileSolid,
  FileLit,
  FileStencil,
  FilePreact,
  FileAlpine,
  FileStimulus,
  FileTurbo,
  FileHotwire,
  FilePhoenix,
  FileRails,
  FileDjango,
  FileFlask,
  FileFastapi,
  FileExpress,
  FileKoa,
  FileHapi,
  FileNest,
  FileAdonis,
  FileSails,
  FileLoopback,
  FileFeathers,
  FileStrapi,
  FileGhost,
  FileWordpress,
  FileDrupal,
  FileJoomla,
  FileMagento,
  FileShopify,
  FileWooCommerce,
  FilePrestaShop,
  FileOpenCart,
  FileBigCommerce,
  FileSquarespace,
  FileWix,
  FileWebflow,
  FileFramer,
  FileFigma,
  FileSketch,
  FileAdobe,
  FilePhotoshop,
  FileIllustrator,
  FileIndesign,
  FileAfterEffects,
  FilePremiere,
  FileAudition,
  FileLightroom,
  FileBridge,
  FileMediaEncoder,
  FileCharacterAnimator,
  FileDimension,
  FileDreamweaver,
  FileFireworks,
  FileFlash,
  FileFreehand,
  FileGoLive,
  FileImageReady,
  FileLiveMotion,
  FilePageMaker,
  FileStreamline,
  FileType,
  ArrowLeft
} from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: string[];
  pricing: string;
  icon: string;
  color: string;
}

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  inputSchema: any;
  outputSchema: any;
  aiModel: string;
  enabled: boolean;
}

interface AICapability {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  models: string[];
}

export const McpServerGenerator = () => {
  const [serverName, setServerName] = useState("my-api-server");
  const [serverVersion, setServerVersion] = useState("1.0.0");
  const [serverDescription, setServerDescription] = useState("AI-native API server");
  const [baseUrl, setBaseUrl] = useState("https://api.example.com/v1");
  const [authType, setAuthType] = useState("bearer");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedAIModels, setSelectedAIModels] = useState<string[]>(["openai-gpt4", "anthropic-claude"]);
  const [aiCapabilities, setAiCapabilities] = useState<string[]>(["text-generation", "code-generation", "data-analysis"]);
  const [enableStreaming, setEnableStreaming] = useState(true);
  const [enableCaching, setEnableCaching] = useState(true);
  const [enableRateLimiting, setEnableRateLimiting] = useState(true);
  const [enableMonitoring, setEnableMonitoring] = useState(true);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const languages = [
    { value: "python", label: "Python", extension: "py" },
    { value: "javascript", label: "JavaScript", extension: "js" },
    { value: "typescript", label: "TypeScript", extension: "ts" }
  ];

  // Comprehensive AI Models Data
  const aiModels: AIModel[] = [
    {
      id: "openai-gpt4",
      name: "GPT-4",
      provider: "OpenAI",
      description: "Most capable model for complex reasoning and creative tasks",
      capabilities: ["text-generation", "code-generation", "reasoning", "analysis"],
      pricing: "$0.03/1K tokens",
      icon: "brain",
      color: "bg-green-500"
    },
    {
      id: "openai-gpt4-turbo",
      name: "GPT-4 Turbo",
      provider: "OpenAI",
      description: "Faster and more cost-effective version of GPT-4",
      capabilities: ["text-generation", "code-generation", "reasoning"],
      pricing: "$0.01/1K tokens",
      icon: "zap",
      color: "bg-blue-500"
    },
    {
      id: "openai-gpt3.5",
      name: "GPT-3.5 Turbo",
      provider: "OpenAI",
      description: "Fast and efficient model for most tasks",
      capabilities: ["text-generation", "code-generation"],
      pricing: "$0.002/1K tokens",
      icon: "cpu",
      color: "bg-purple-500"
    },
    {
      id: "anthropic-claude",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      description: "Advanced reasoning and analysis capabilities",
      capabilities: ["text-generation", "reasoning", "analysis", "safety"],
      pricing: "$0.015/1K tokens",
      icon: "shield",
      color: "bg-orange-500"
    },
    {
      id: "anthropic-claude-sonnet",
      name: "Claude 3 Sonnet",
      provider: "Anthropic",
      description: "Balanced performance and cost for most tasks",
      capabilities: ["text-generation", "reasoning", "analysis"],
      pricing: "$0.003/1K tokens",
      icon: "target",
      color: "bg-indigo-500"
    },
    {
      id: "google-gemini-pro",
      name: "Gemini Pro",
      provider: "Google",
      description: "Multimodal AI with strong reasoning capabilities",
      capabilities: ["text-generation", "multimodal", "reasoning"],
      pricing: "$0.001/1K tokens",
      icon: "database",
      color: "bg-red-500"
    },
    {
      id: "cohere-command",
      name: "Command",
      provider: "Cohere",
      description: "Specialized for business applications and enterprise use",
      capabilities: ["text-generation", "classification", "summarization"],
      pricing: "$0.0015/1K tokens",
      icon: "award",
      color: "bg-teal-500"
    },
    {
      id: "mistral-mistral-large",
      name: "Mistral Large",
      provider: "Mistral AI",
      description: "High-performance model with multilingual support",
      capabilities: ["text-generation", "multilingual", "reasoning"],
      pricing: "$0.002/1K tokens",
      icon: "cloud",
      color: "bg-cyan-500"
    },
    {
      id: "meta-llama2",
      name: "Llama 2",
      provider: "Meta",
      description: "Open-source model with strong performance",
      capabilities: ["text-generation", "code-generation", "reasoning"],
      pricing: "Free (self-hosted)",
      icon: "star",
      color: "bg-yellow-500"
    },
    {
      id: "huggingface-zephyr",
      name: "Zephyr",
      provider: "Hugging Face",
      description: "Lightweight model optimized for chat applications",
      capabilities: ["text-generation", "chat", "reasoning"],
      pricing: "Free (self-hosted)",
      icon: "heart",
      color: "bg-pink-500"
    }
  ];

  const aiCapabilitiesData: AICapability[] = [
    {
      id: "text-generation",
      name: "Text Generation",
      description: "Generate human-like text for various purposes",
      icon: "file-text",
      enabled: true,
      models: ["openai-gpt4", "anthropic-claude", "google-gemini-pro"]
    },
    {
      id: "code-generation",
      name: "Code Generation",
      description: "Generate code in multiple programming languages",
      icon: "code2",
      enabled: true,
      models: ["openai-gpt4", "openai-gpt3.5", "meta-llama2"]
    },
    {
      id: "data-analysis",
      name: "Data Analysis",
      description: "Analyze and interpret complex datasets",
      icon: "bar-chart3",
      enabled: true,
      models: ["openai-gpt4", "anthropic-claude", "google-gemini-pro"]
    },
    {
      id: "reasoning",
      name: "Logical Reasoning",
      description: "Perform complex logical reasoning and problem-solving",
      icon: "brain",
      enabled: true,
      models: ["openai-gpt4", "anthropic-claude", "mistral-mistral-large"]
    },
    {
      id: "multimodal",
      name: "Multimodal Processing",
      description: "Process text, images, and other media types",
      icon: "camera",
      enabled: false,
      models: ["google-gemini-pro", "openai-gpt4-turbo"]
    },
    {
      id: "summarization",
      name: "Text Summarization",
      description: "Summarize long documents and conversations",
      icon: "file-text",
      enabled: true,
      models: ["cohere-command", "openai-gpt3.5", "anthropic-claude-sonnet"]
    },
    {
      id: "classification",
      name: "Text Classification",
      description: "Classify and categorize text content",
      icon: "target",
      enabled: true,
      models: ["cohere-command", "openai-gpt3.5", "huggingface-zephyr"]
    },
    {
      id: "translation",
      name: "Language Translation",
      description: "Translate text between different languages",
      icon: "globe",
      enabled: false,
      models: ["google-gemini-pro", "mistral-mistral-large"]
    }
  ];

  const aiTools: AITool[] = [
    {
      id: "text-generator",
      name: "Text Generator",
      description: "Generate creative and informative text content",
      category: "content",
      inputSchema: {
        type: "object",
        properties: {
          prompt: { type: "string", description: "The text prompt" },
          maxLength: { type: "integer", description: "Maximum length of generated text" },
          temperature: { type: "number", description: "Creativity level (0-1)" }
        },
        required: ["prompt"]
      },
      outputSchema: {
        type: "object",
        properties: {
          text: { type: "string" },
          tokens: { type: "integer" },
          model: { type: "string" }
        }
      },
      aiModel: "openai-gpt4",
      enabled: true
    },
    {
      id: "code-generator",
      name: "Code Generator",
      description: "Generate code in various programming languages",
      category: "development",
      inputSchema: {
        type: "object",
        properties: {
          description: { type: "string", description: "Code description" },
          language: { type: "string", description: "Programming language" },
          framework: { type: "string", description: "Framework or library" }
        },
        required: ["description", "language"]
      },
      outputSchema: {
        type: "object",
        properties: {
          code: { type: "string" },
          explanation: { type: "string" },
          language: { type: "string" }
        }
      },
      aiModel: "openai-gpt4",
      enabled: true
    },
    {
      id: "data-analyzer",
      name: "Data Analyzer",
      description: "Analyze and interpret data patterns",
      category: "analytics",
      inputSchema: {
        type: "object",
        properties: {
          data: { type: "array", description: "Data to analyze" },
          analysisType: { type: "string", description: "Type of analysis" },
          format: { type: "string", description: "Output format" }
        },
        required: ["data", "analysisType"]
      },
      outputSchema: {
        type: "object",
        properties: {
          insights: { type: "array" },
          summary: { type: "string" },
          recommendations: { type: "array" }
        }
      },
      aiModel: "anthropic-claude",
      enabled: true
    },
    {
      id: "reasoning-engine",
      name: "Reasoning Engine",
      description: "Perform complex logical reasoning tasks",
      category: "reasoning",
      inputSchema: {
        type: "object",
        properties: {
          problem: { type: "string", description: "Problem to solve" },
          context: { type: "string", description: "Additional context" },
          approach: { type: "string", description: "Reasoning approach" }
        },
        required: ["problem"]
      },
      outputSchema: {
        type: "object",
        properties: {
          solution: { type: "string" },
          reasoning: { type: "array" },
          confidence: { type: "number" }
        }
      },
      aiModel: "anthropic-claude",
      enabled: true
    }
  ];

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Enhanced AI Model Management Functions
  const getModelIcon = (iconName: string) => {
    switch (iconName) {
      case "brain": return <Brain className="w-5 h-5" />;
      case "zap": return <Zap className="w-5 h-5" />;
      case "cpu": return <Cpu className="w-5 h-5" />;
      case "shield": return <Shield className="w-5 h-5" />;
      case "target": return <Target className="w-5 h-5" />;
      case "database": return <Database className="w-5 h-5" />;
      case "award": return <Award className="w-5 h-5" />;
      case "cloud": return <Cloud className="w-5 h-5" />;
      case "star": return <Star className="w-5 h-5" />;
      case "heart": return <Heart className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  const getCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case "file-text": return <FileText className="w-4 h-4" />;
      case "code2": return <Code2 className="w-4 h-4" />;
      case "bar-chart3": return <BarChart3 className="w-4 h-4" />;
      case "brain": return <Brain className="w-4 h-4" />;
      case "camera": return <Camera className="w-4 h-4" />;
      case "target": return <Target className="w-4 h-4" />;
      case "globe": return <Globe className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const toggleAIModel = (modelId: string) => {
    setSelectedAIModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const toggleAICapability = (capabilityId: string) => {
    setAiCapabilities(prev => 
      prev.includes(capabilityId) 
        ? prev.filter(id => id !== capabilityId)
        : [...prev, capabilityId]
    );
  };

  const getSelectedModels = () => {
    return aiModels.filter(model => selectedAIModels.includes(model.id));
  };

  const getSelectedCapabilities = () => {
    return aiCapabilitiesData.filter(cap => aiCapabilities.includes(cap.id));
  };

  const generateEnhancedMcpConfig = () => {
    const selectedModels = getSelectedModels();
    const selectedCaps = getSelectedCapabilities();
    
    return `{
  "name": "${serverName}",
  "version": "${serverVersion}",
  "description": "${serverDescription}",
  "baseUrl": "${baseUrl}",
  "auth": {
    "type": "${authType}",
    "header": "Authorization",
    "prefix": "Bearer"
  },
  "ai": {
    "models": ${JSON.stringify(selectedModels.map(m => ({
      id: m.id,
      name: m.name,
      provider: m.provider,
      capabilities: m.capabilities
    })), null, 4)},
    "capabilities": ${JSON.stringify(selectedCaps.map(c => ({
      id: c.id,
      name: c.name,
      enabled: c.enabled
    })), null, 4)},
    "features": {
      "streaming": ${enableStreaming},
      "caching": ${enableCaching},
      "rateLimiting": ${enableRateLimiting},
      "monitoring": ${enableMonitoring}
    }
  },
  "tools": [
    {
      "name": "ai_text_generate",
      "description": "Generate text using AI models",
      "endpoint": "/ai/text/generate",
      "method": "POST",
      "aiModel": "openai-gpt4",
      "inputSchema": {
        "type": "object",
        "properties": {
          "prompt": {"type": "string", "description": "Text prompt"},
          "maxLength": {"type": "integer", "description": "Maximum length"},
          "temperature": {"type": "number", "description": "Creativity level"}
        },
        "required": ["prompt"]
      },
      "outputSchema": {
        "type": "object",
        "properties": {
          "text": {"type": "string"},
          "tokens": {"type": "integer"},
          "model": {"type": "string"}
        }
      }
    },
    {
      "name": "ai_code_generate",
      "description": "Generate code using AI models",
      "endpoint": "/ai/code/generate",
      "method": "POST",
      "aiModel": "openai-gpt4",
      "inputSchema": {
        "type": "object",
        "properties": {
          "description": {"type": "string", "description": "Code description"},
          "language": {"type": "string", "description": "Programming language"},
          "framework": {"type": "string", "description": "Framework"}
        },
        "required": ["description", "language"]
      },
      "outputSchema": {
        "type": "object",
        "properties": {
          "code": {"type": "string"},
          "explanation": {"type": "string"},
          "language": {"type": "string"}
        }
      }
    },
    {
      "name": "ai_data_analyze",
      "description": "Analyze data using AI models",
      "endpoint": "/ai/data/analyze",
      "method": "POST",
      "aiModel": "anthropic-claude",
      "inputSchema": {
        "type": "object",
        "properties": {
          "data": {"type": "array", "description": "Data to analyze"},
          "analysisType": {"type": "string", "description": "Analysis type"},
          "format": {"type": "string", "description": "Output format"}
        },
        "required": ["data", "analysisType"]
      },
      "outputSchema": {
        "type": "object",
        "properties": {
          "insights": {"type": "array"},
          "summary": {"type": "string"},
          "recommendations": {"type": "array"}
        }
      }
    }
  ]
}`;
  };

  const generateMcpConfig = () => {
    return `{
  "name": "${serverName}",
  "version": "${serverVersion}",
  "description": "${serverDescription}",
  "baseUrl": "${baseUrl}",
  "auth": {
    "type": "${authType}",
    "header": "Authorization",
    "prefix": "Bearer"
  },
  "tools": [
    {
      "name": "get_users",
      "description": "Get all users from the API",
      "endpoint": "/users",
      "method": "GET",
      "inputSchema": {
        "type": "object",
        "properties": {},
        "required": []
      },
      "outputSchema": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": {"type": "integer"},
            "name": {"type": "string"},
            "email": {"type": "string"}
          }
        }
      }
    },
    {
      "name": "create_user",
      "description": "Create a new user",
      "endpoint": "/users",
      "method": "POST",
      "inputSchema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "User's full name"
          },
          "email": {
            "type": "string",
            "description": "User's email address"
          }
        },
        "required": ["name", "email"]
      },
      "outputSchema": {
        "type": "object",
        "properties": {
          "id": {"type": "integer"},
          "name": {"type": "string"},
          "email": {"type": "string"}
        }
      }
    },
    {
      "name": "get_user_by_id",
      "description": "Get a specific user by their ID",
      "endpoint": "/users/{id}",
      "method": "GET",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "description": "The user ID to retrieve"
          }
        },
        "required": ["id"]
      },
      "outputSchema": {
        "type": "object",
        "properties": {
          "id": {"type": "integer"},
          "name": {"type": "string"},
          "email": {"type": "string"}
        }
      }
    }
  ]
}`;
  };

  const generatePythonServer = () => {
    return `"""
${serverName} - MCP Server Implementation
Generated by writeasy
Version: ${serverVersion}
"""

import asyncio
import json
import logging
from typing import Any, Dict, List, Optional
import httpx
from mcp.server import Server
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server
from mcp.types import (
    CallToolRequest,
    CallToolResult,
    ListToolsRequest,
    ListToolsResult,
    Tool,
    TextContent,
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ${String(serverName).replace('-', '_').replace(' ', '_').replace(/\b\w/g, l => l.toUpperCase())}Server:
    def __init__(self, api_key: str, base_url: str = "${baseUrl}"):
        self.api_key = api_key
        self.base_url = base_url
        self.client = httpx.AsyncClient(
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
        )
    
    async def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        """Make HTTP request to the API"""
        url = f"{self.base_url}{endpoint}"
        try:
            response = await self.client.request(method, url, json=data)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            logger.error(f"HTTP error: {e}")
            raise Exception(f"API request failed: {e}")
    
    async def get_users(self) -> List[Dict[str, Any]]:
        """Get all users"""
        return await self.make_request("GET", "/users")
    
    async def create_user(self, name: str, email: str) -> Dict[str, Any]:
        """Create a new user"""
        return await self.make_request("POST", "/users", {
            "name": name,
            "email": email
        })
    
    async def get_user_by_id(self, user_id: int) -> Dict[str, Any]:
        """Get user by ID"""
        return await self.make_request("GET", f"/users/{user_id}")

# Initialize MCP server
server = Server("${serverName}")
api_server = None

@server.list_tools()
async def handle_list_tools() -> List[Tool]:
    """List available tools"""
    return [
        Tool(
            name="get_users",
            description="Get all users from the API",
            inputSchema={
                "type": "object",
                "properties": {},
                "required": []
            }
        ),
        Tool(
            name="create_user",
            description="Create a new user",
            inputSchema={
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "User's full name"
                    },
                    "email": {
                        "type": "string",
                        "description": "User's email address"
                    }
                },
                "required": ["name", "email"]
            }
        ),
        Tool(
            name="get_user_by_id",
            description="Get a specific user by their ID",
            inputSchema={
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer",
                        "description": "The user ID to retrieve"
                    }
                },
                "required": ["id"]
            }
        )
    ]

@server.call_tool()
async def handle_call_tool(name: str, arguments: Dict[str, Any]) -> List[TextContent]:
    """Handle tool calls"""
    try:
        if name == "get_users":
            result = await api_server.get_users()
            return [TextContent(type="text", text=json.dumps(result, indent=2))]
        
        elif name == "create_user":
            result = await api_server.create_user(
                arguments["name"],
                arguments["email"]
            )
            return [TextContent(type="text", text=json.dumps(result, indent=2))]
        
        elif name == "get_user_by_id":
            result = await api_server.get_user_by_id(arguments["id"])
            return [TextContent(type="text", text=json.dumps(result, indent=2))]
        
        else:
            raise ValueError(f"Unknown tool: {name}")
    
    except Exception as e:
        logger.error(f"Tool call error: {e}")
        return [TextContent(type="text", text=f"Error: {str(e)}")]

async def main():
    """Main server function"""
    global api_server
    
    # Initialize API server (you'll need to provide your API key)
    api_server = ${String(serverName).replace('-', '_').replace(' ', '_').replace(/\b\w/g, l => l.toUpperCase())}Server(
        api_key="your-api-key-here"
    )
    
    # Run the MCP server
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="${serverName}",
                server_version="${serverVersion}",
                capabilities=server.get_capabilities(
                    notification_options=None,
                    experimental_capabilities={}
                )
            )
        )

if __name__ == "__main__":
    asyncio.run(main())`;
  };

  const generateJavaScriptServer = () => {
    return `/**
 * ${serverName} - MCP Server Implementation
 * Generated by writeasy
 * Version: ${serverVersion}
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';

class ${serverName.replace('-', '_').replace(' ', '_').replace(/([A-Z])/g, '_$1').toUpperCase()}Server {
  constructor(apiKey, baseUrl = '${baseUrl}') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': \`Bearer \${apiKey}\`,
      'Content-Type': 'application/json'
    };
  }

  async makeRequest(method, endpoint, data = null) {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const options = {
      method,
      headers: this.headers
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getUsers() {
    return this.makeRequest('GET', '/users');
  }

  async createUser(name, email) {
    return this.makeRequest('POST', '/users', { name, email });
  }

  async getUserById(userId) {
    return this.makeRequest('GET', \`/users/\${userId}\`);
  }
}

// Initialize MCP server
const server = new Server(
  {
    name: '${serverName}',
    version: '${serverVersion}',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize API server
const apiServer = new ${serverName.replace('-', '_').replace(' ', '_').replace(/([A-Z])/g, '_$1').toUpperCase()}Server('your-api-key-here');

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_users',
        description: 'Get all users from the API',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      {
        name: 'create_user',
        description: 'Create a new user',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'User\'s full name'
            },
            email: {
              type: 'string',
              description: 'User\'s email address'
            }
          },
          required: ['name', 'email']
        }
      },
      {
        name: 'get_user_by_id',
        description: 'Get a specific user by their ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The user ID to retrieve'
            }
          },
          required: ['id']
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case 'get_users':
        result = await apiServer.getUsers();
        break;
      
      case 'create_user':
        result = await apiServer.createUser(args.name, args.email);
        break;
      
      case 'get_user_by_id':
        result = await apiServer.getUserById(args.id);
        break;
      
      default:
        throw new Error(\`Unknown tool: \${name}\`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: \`Error: \${error.message}\`
        }
      ],
      isError: true
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('${serverName} MCP server running on stdio');
}

main().catch(console.error);`;
  };

  const generateTypeScriptServer = () => {
    return `/**
 * ${serverName} - MCP Server Implementation
 * Generated by writeasy
 * Version: ${serverVersion}
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

class ${serverName.replace('-', '_').replace(' ', '_').replace(/([A-Z])/g, '_$1').toUpperCase()}Server {
  private apiKey: string;
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(apiKey: string, baseUrl: string = '${baseUrl}') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'Authorization': \`Bearer \${apiKey}\`,
      'Content-Type': 'application/json'
    };
  }

  private async makeRequest<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const options: RequestInit = {
      method,
      headers: this.headers
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    return this.makeRequest<User[]>('GET', '/users');
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    return this.makeRequest<User>('POST', '/users', userData);
  }

  async getUserById(userId: number): Promise<User> {
    return this.makeRequest<User>('GET', \`/users/\${userId}\`);
  }
}

// Initialize MCP server
const server = new Server(
  {
    name: '${serverName}',
    version: '${serverVersion}',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Initialize API server
const apiServer = new ${serverName.replace('-', '_').replace(' ', '_').replace(/([A-Z])/g, '_$1').toUpperCase()}Server('your-api-key-here');

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async (): Promise<{ tools: Tool[] }> => {
  return {
    tools: [
      {
        name: 'get_users',
        description: 'Get all users from the API',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      {
        name: 'create_user',
        description: 'Create a new user',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'User\'s full name'
            },
            email: {
              type: 'string',
              description: 'User\'s email address'
            }
          },
          required: ['name', 'email']
        }
      },
      {
        name: 'get_user_by_id',
        description: 'Get a specific user by their ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The user ID to retrieve'
            }
          },
          required: ['id']
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: any;

    switch (name) {
      case 'get_users':
        result = await apiServer.getUsers();
        break;
      
      case 'create_user':
        result = await apiServer.createUser({
          name: args.name,
          email: args.email
        });
        break;
      
      case 'get_user_by_id':
        result = await apiServer.getUserById(args.id);
        break;
      
      default:
        throw new Error(\`Unknown tool: \${name}\`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: \`Error: \${error instanceof Error ? error.message : 'Unknown error'}\`
        }
      ],
      isError: true
    };
  }
});

// Start the server
async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('${serverName} MCP server running on stdio');
}

main().catch(console.error);`;
  };

  const getGeneratedCode = () => {
    switch (selectedLanguage) {
      case "python":
        return generatePythonServer();
      case "javascript":
        return generateJavaScriptServer();
      case "typescript":
        return generateTypeScriptServer();
      default:
        return generatePythonServer();
    }
  };

  const downloadServer = () => {
    const config = generateMcpConfig();
    const serverCode = getGeneratedCode();
    const language = languages.find(l => l.value === selectedLanguage);
    
    // Create a zip-like structure with multiple files
    const files = [
      { name: 'mcp-config.json', content: config },
      { name: `server.${language?.extension || 'py'}`, content: serverCode },
      { name: 'README.md', content: generateReadme() }
    ];
    
    // For now, download the main server file
    const blob = new Blob([serverCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${serverName}-server.${language?.extension || 'py'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReadme = () => {
    return `# ${serverName}

${serverDescription}

## Installation

\`\`\`bash
${selectedLanguage === "python" ? "pip install mcp" : "npm install @modelcontextprotocol/sdk"}
\`\`\`

## Configuration

1. Update the API key in the server file:
   \`\`\`
   api_key="your-actual-api-key"
   \`\`\`

2. Update the base URL if needed:
   \`\`\`
   base_url="${baseUrl}"
   \`\`\`

## Usage

### Running the Server

\`\`\`bash
${selectedLanguage === "python" ? "python server.py" : "node server.js"}
\`\`\`

### Available Tools

- **get_users**: Get all users from the API
- **create_user**: Create a new user
- **get_user_by_id**: Get a specific user by ID

## Integration with AI Tools

This MCP server can be used with:
- Claude Desktop
- Cursor
- Other MCP-compatible AI tools

Add to your MCP configuration:
\`\`\`json
{
  "mcpServers": {
    "${serverName}": {
      "command": "${selectedLanguage === "python" ? "python" : "node"}",
      "args": ["server.${languages.find(l => l.value === selectedLanguage)?.extension || 'py'}"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
\`\`\`
`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
            <h1 className="text-4xl font-serif font-normal mb-2">MCP Server Generator</h1>
            <p className="text-muted-foreground">Create AI-native MCP servers that work with Claude, Cursor, and other AI tools</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Server Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="server-name">Server Name</Label>
                    <Input
                      id="server-name"
                      value={serverName}
                      onChange={(e) => setServerName(String(e.target.value || ""))}
                      placeholder="my-api-server"
                    />
                  </div>

                  <div>
                    <Label htmlFor="server-version">Version</Label>
                    <Input
                      id="server-version"
                      value={serverVersion}
                      onChange={(e) => setServerVersion(e.target.value)}
                      placeholder="1.0.0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="server-description">Description</Label>
                    <Textarea
                      id="server-description"
                      value={serverDescription}
                      onChange={(e) => setServerDescription(e.target.value)}
                      placeholder="AI-native API server"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="base-url">Base URL</Label>
                    <Input
                      id="base-url"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="https://api.example.com/v1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="auth-type">Authentication Type</Label>
                    <Select value={authType} onValueChange={setAuthType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bearer">Bearer Token</SelectItem>
                        <SelectItem value="api-key">API Key</SelectItem>
                        <SelectItem value="basic">Basic Auth</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Implementation Language</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button onClick={downloadServer} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download MCP Server
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Models Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Models
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select AI models to integrate with your MCP server
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {aiModels.slice(0, 6).map((model) => (
                      <div 
                        key={model.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedAIModels.includes(model.id) 
                            ? 'border-accent bg-accent/5' 
                            : 'border-border hover:border-accent/50'
                        }`}
                        onClick={() => toggleAIModel(model.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${model.color} text-white`}>
                            {getModelIcon(model.icon)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{model.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {model.pricing}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{model.provider}</p>
                            <p className="text-xs text-muted-foreground mt-1">{model.description}</p>
                            <div className="flex gap-1 mt-2">
                              {model.capabilities.slice(0, 2).map((cap) => (
                                <Badge key={cap} variant="secondary" className="text-xs">
                                  {cap.replace('-', ' ')}
                                </Badge>
                              ))}
                              {model.capabilities.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{model.capabilities.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {selectedAIModels.includes(model.id) ? (
                              <CheckCircle className="w-5 h-5 text-accent" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      View All Models ({aiModels.length})
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Capabilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    AI Capabilities
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Enable specific AI capabilities for your server
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {aiCapabilitiesData.slice(0, 4).map((capability) => (
                    <div 
                      key={capability.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        aiCapabilities.includes(capability.id) 
                          ? 'border-accent bg-accent/5' 
                          : 'border-border hover:border-accent/50'
                      }`}
                      onClick={() => toggleAICapability(capability.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          {getCapabilityIcon(capability.icon)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{capability.name}</h4>
                          <p className="text-sm text-muted-foreground">{capability.description}</p>
                        </div>
                        <div className="flex items-center">
                          {aiCapabilities.includes(capability.id) ? (
                            <CheckCircle className="w-5 h-5 text-accent" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Advanced Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Advanced Settings
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                    >
                      {showAdvancedSettings ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                {showAdvancedSettings && (
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="streaming">Enable Streaming</Label>
                        <p className="text-sm text-muted-foreground">Real-time response streaming</p>
                      </div>
                      <Switch 
                        id="streaming"
                        checked={enableStreaming}
                        onCheckedChange={setEnableStreaming}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="caching">Enable Caching</Label>
                        <p className="text-sm text-muted-foreground">Cache responses for better performance</p>
                      </div>
                      <Switch 
                        id="caching"
                        checked={enableCaching}
                        onCheckedChange={setEnableCaching}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="rate-limiting">Enable Rate Limiting</Label>
                        <p className="text-sm text-muted-foreground">Control request frequency</p>
                      </div>
                      <Switch 
                        id="rate-limiting"
                        checked={enableRateLimiting}
                        onCheckedChange={setEnableRateLimiting}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="monitoring">Enable Monitoring</Label>
                        <p className="text-sm text-muted-foreground">Track usage and performance</p>
                      </div>
                      <Switch 
                        id="monitoring"
                        checked={enableMonitoring}
                        onCheckedChange={setEnableMonitoring}
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Generated Code */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="config" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="config">MCP Config</TabsTrigger>
                  <TabsTrigger value="ai-models">AI Models</TabsTrigger>
                  <TabsTrigger value="server">Server Code</TabsTrigger>
                  <TabsTrigger value="usage">Usage Guide</TabsTrigger>
                </TabsList>

                <TabsContent value="config" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          MCP Server Configuration
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generateEnhancedMcpConfig(), "config")}
                        >
                          {copiedCode === "config" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black rounded-lg p-4 overflow-x-auto">
                        <pre className="text-purple-400 text-sm font-mono">
                          <code>{generateEnhancedMcpConfig()}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ai-models" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Selected AI Models
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {getSelectedModels().length} models selected
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {getSelectedModels().map((model) => (
                          <div key={model.id} className="p-4 border rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`p-2 rounded-lg ${model.color} text-white`}>
                                {getModelIcon(model.icon)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{model.name}</h4>
                                <p className="text-sm text-muted-foreground">{model.provider}</p>
                              </div>
                              <Badge variant="outline">{model.pricing}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                            <div className="flex gap-2">
                              {model.capabilities.map((cap) => (
                                <Badge key={cap} variant="secondary" className="text-xs">
                                  {cap.replace('-', ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Enabled Capabilities
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {getSelectedCapabilities().length} capabilities enabled
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {getSelectedCapabilities().map((capability) => (
                          <div key={capability.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="p-2 rounded-lg bg-muted">
                              {getCapabilityIcon(capability.icon)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{capability.name}</h4>
                              <p className="text-sm text-muted-foreground">{capability.description}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {capability.models.length} models
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Advanced Features
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${enableStreaming ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm">Streaming</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${enableCaching ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm">Caching</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${enableRateLimiting ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm">Rate Limiting</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${enableMonitoring ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm">Monitoring</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="server" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-5 h-5" />
                          {languages.find(l => l.value === selectedLanguage)?.label} Server Implementation
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(getGeneratedCode(), "server")}
                        >
                          {copiedCode === "server" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black rounded-lg p-4 overflow-x-auto">
                        <pre className="text-blue-400 text-sm font-mono">
                          <code>{getGeneratedCode()}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="usage" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Integration Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">1. Install Dependencies</h4>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <code className="text-sm">
                              {selectedLanguage === "python" && "pip install mcp httpx"}
                              {selectedLanguage === "javascript" && "npm install @modelcontextprotocol/sdk node-fetch"}
                              {selectedLanguage === "typescript" && "npm install @modelcontextprotocol/sdk"}
                            </code>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">2. Configure AI Tool</h4>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <pre className="text-sm">
                              <code>{`{
  "mcpServers": {
    "${serverName}": {
      "command": "${selectedLanguage === "python" ? "python" : "node"}",
      "args": ["server.${languages.find(l => l.value === selectedLanguage)?.extension || 'py'}"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}`}</code>
                            </pre>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">3. Test with AI</h4>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-sm text-muted-foreground">
                              Ask your AI tool: "Can you get all users from my API?" or "Create a new user named John Doe with email john@example.com"
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
