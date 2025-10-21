import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Settings, 
  Download, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Globe,
  Code2,
  Database,
  Zap,
  FileText,
  Users,
  Activity,
  TrendingUp,
  BarChart3,
  Calendar,
  GitBranch,
  Shield,
  Key,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  RefreshCw,
  MessageSquare,
  Bell,
  UserPlus,
  UserMinus,
  Share2,
  Lock,
  Unlock,
  Video,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MoreHorizontal,
  Send,
  Smile,
  Paperclip,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Archive,
  Star,
  StarOff,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Forward,
  Pin,
  PinOff,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  ScreenShare,
  ScreenShareOff,
  Hand,
  HandOff,
  Coffee,
  Heart,
  PartyPopper,
  Zap as Lightning,
  Target,
  CheckSquare,
  Square,
  Circle,
  CircleDot,
  Dot,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Check,
  AlertTriangle,
  Info,
  HelpCircle,
  ExternalLink,
  Link,
  Copy as CopyIcon,
  Download as DownloadIcon,
  Upload,
  Folder,
  FolderOpen,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileSpreadsheet,
  FileText as FileTextIcon,
  FileArchive,
  FileCheck,
  FileX,
  FilePlus,
  FileMinus,
  FileEdit,
  FileSearch,
  FileSlash,
  FileLock,
  FileUnlock,
  FileHeart,
  FileStar,
  FileBookmark,
  FileDownload,
  FileUpload,
  FileShare,
  FileCopy,
  FileMove,
  FileTrash,
  FileArchive as FileArchiveIcon,
  FolderPlus,
  FolderMinus,
  FolderEdit,
  FolderSearch,
  FolderSlash,
  FolderLock,
  FolderUnlock,
  FolderHeart,
  FolderStar,
  FolderBookmark,
  FolderDownload,
  FolderUpload,
  FolderShare,
  FolderCopy,
  FolderMove,
  FolderTrash,
  FolderArchive,
  FolderOpen as FolderOpenIcon,
  FolderCheck,
  FolderX,
  FolderPlus as FolderPlusIcon,
  FolderMinus as FolderMinusIcon,
  FolderEdit as FolderEditIcon,
  FolderSearch as FolderSearchIcon,
  FolderSlash as FolderSlashIcon,
  FolderLock as FolderLockIcon,
  FolderUnlock as FolderUnlockIcon,
  FolderHeart as FolderHeartIcon,
  FolderStar as FolderStarIcon,
  FolderBookmark as FolderBookmarkIcon,
  FolderDownload as FolderDownloadIcon,
  FolderUpload as FolderUploadIcon,
  FolderShare as FolderShareIcon,
  FolderCopy as FolderCopyIcon,
  FolderMove as FolderMoveIcon,
  FolderTrash as FolderTrashIcon,
  FolderArchive as FolderArchiveIcon2,
  ArrowLeft
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "archived";
  createdAt: string;
  lastUpdated: string;
  apiEndpoints: number;
  sdkLanguages: string[];
  documentation: boolean;
  mcpServer: boolean;
  terraformProvider: boolean;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed: string;
  createdAt: string;
}

interface Activity {
  id: string;
  type: "deployment" | "generation" | "update" | "error" | "collaboration" | "comment" | "mention";
  message: string;
  timestamp: string;
  status: "success" | "warning" | "error";
  userId?: string;
  userName?: string;
  userAvatar?: string;
}

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "admin" | "developer" | "viewer";
  status: "online" | "away" | "offline";
  lastSeen: string;
  permissions: {
    canEdit: boolean;
    canDeploy: boolean;
    canManageUsers: boolean;
    canViewAnalytics: boolean;
  };
  isTyping?: boolean;
  currentFile?: string;
  cursorPosition?: { line: number; column: number };
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: string;
  type: "text" | "file" | "code" | "mention" | "system";
  replyTo?: string;
  reactions: { emoji: string; users: string[] }[];
  isEdited?: boolean;
  isPinned?: boolean;
}

interface Notification {
  id: string;
  type: "mention" | "deployment" | "error" | "collaboration" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  userId?: string;
  userName?: string;
  actionUrl?: string;
}

interface LiveSession {
  id: string;
  name: string;
  participants: string[];
  isActive: boolean;
  startedAt: string;
  type: "video" | "audio" | "screen-share";
}

interface FileCollaboration {
  fileId: string;
  fileName: string;
  collaborators: {
    userId: string;
    userName: string;
    userAvatar?: string;
    cursorPosition: { line: number; column: number };
    selection?: { start: { line: number; column: number }; end: { line: number; column: number } };
    isTyping: boolean;
  }[];
  lastModified: string;
  lastModifiedBy: string;
}

export const ProjectDashboard = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLiveSession, setShowLiveSession] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentUser] = useState({
    id: "user-1",
    name: "John Doe",
    email: "john@writeasy.com",
    avatar: "https://api.writeasy.com/avatars/john.jpg",
    role: "owner" as const
  });

  // Collaboration data
  const collaborators: Collaborator[] = [
    {
      id: "user-1",
      name: "John Doe",
      email: "john@writeasy.com",
      avatar: "https://api.writeasy.com/avatars/john.jpg",
      role: "owner",
      status: "online",
      lastSeen: "2024-01-17T10:30:00Z",
      permissions: {
        canEdit: true,
        canDeploy: true,
        canManageUsers: true,
        canViewAnalytics: true
      },
      isTyping: false,
      currentFile: "api-spec.yaml"
    },
    {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@writeasy.com",
      avatar: "https://api.writeasy.com/avatars/jane.jpg",
      role: "admin",
      status: "online",
      lastSeen: "2024-01-17T10:25:00Z",
      permissions: {
        canEdit: true,
        canDeploy: true,
        canManageUsers: true,
        canViewAnalytics: true
      },
      isTyping: true,
      currentFile: "sdk-generator.tsx"
    },
    {
      id: "user-3",
      name: "Mike Johnson",
      email: "mike@writeasy.com",
      avatar: "https://api.writeasy.com/avatars/mike.jpg",
      role: "developer",
      status: "away",
      lastSeen: "2024-01-17T09:45:00Z",
      permissions: {
        canEdit: true,
        canDeploy: false,
        canManageUsers: false,
        canViewAnalytics: true
      },
      isTyping: false,
      currentFile: "test-suite.json"
    },
    {
      id: "user-4",
      name: "Sarah Wilson",
      email: "sarah@writeasy.com",
      avatar: "https://api.writeasy.com/avatars/sarah.jpg",
      role: "viewer",
      status: "offline",
      lastSeen: "2024-01-16T18:20:00Z",
      permissions: {
        canEdit: false,
        canDeploy: false,
        canManageUsers: false,
        canViewAnalytics: false
      },
      isTyping: false
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: "msg-1",
      userId: "user-2",
      userName: "Jane Smith",
      userAvatar: "https://api.writeasy.com/avatars/jane.jpg",
      message: "Hey team! I've updated the API spec with the new user endpoints. Can someone review it?",
      timestamp: "2024-01-17T10:30:00Z",
      type: "text",
      reactions: [
        { emoji: "👍", users: ["user-1", "user-3"] },
        { emoji: "🚀", users: ["user-1"] }
      ],
      isPinned: false
    },
    {
      id: "msg-2",
      userId: "user-1",
      userName: "John Doe",
      userAvatar: "https://api.writeasy.com/avatars/john.jpg",
      message: "Looks good! @mike can you generate the Python SDK for testing?",
      timestamp: "2024-01-17T10:32:00Z",
      type: "mention",
      reactions: [
        { emoji: "✅", users: ["user-3"] }
      ],
      isPinned: false
    },
    {
      id: "msg-3",
      userId: "user-3",
      userName: "Mike Johnson",
      userAvatar: "https://api.writeasy.com/avatars/mike.jpg",
      message: "```python\n# Generated SDK example\nfrom writeasy import Client\n\nclient = Client(api_key='your-key')\nusers = client.users.list()\n```",
      timestamp: "2024-01-17T10:35:00Z",
      type: "code",
      reactions: [
        { emoji: "🔥", users: ["user-1", "user-2"] }
      ],
      isPinned: true
    },
    {
      id: "msg-4",
      userId: "user-2",
      userName: "Jane Smith",
      userAvatar: "https://api.writeasy.com/avatars/jane.jpg",
      message: "Perfect! The SDK looks great. Should we deploy this to staging?",
      timestamp: "2024-01-17T10:37:00Z",
      type: "text",
      reactions: [],
      isPinned: false
    }
  ];

  const notifications: Notification[] = [
    {
      id: "notif-1",
      type: "mention",
      title: "You were mentioned",
      message: "John Doe mentioned you in a chat message",
      timestamp: "2024-01-17T10:32:00Z",
      isRead: false,
      userId: "user-1",
      userName: "John Doe",
      actionUrl: "/chat"
    },
    {
      id: "notif-2",
      type: "deployment",
      title: "Deployment Successful",
      message: "User Management API v2.1.0 deployed to production",
      timestamp: "2024-01-17T10:30:00Z",
      isRead: true,
      actionUrl: "/deployments"
    },
    {
      id: "notif-3",
      type: "collaboration",
      title: "New Collaborator",
      message: "Sarah Wilson joined the project as a viewer",
      timestamp: "2024-01-17T09:15:00Z",
      isRead: true,
      userId: "user-4",
      userName: "Sarah Wilson"
    },
    {
      id: "notif-4",
      type: "error",
      title: "Build Failed",
      message: "Python SDK generation failed due to syntax error",
      timestamp: "2024-01-17T08:45:00Z",
      isRead: false,
      actionUrl: "/logs"
    }
  ];

  const liveSessions: LiveSession[] = [
    {
      id: "session-1",
      name: "API Review Session",
      participants: ["user-1", "user-2", "user-3"],
      isActive: true,
      startedAt: "2024-01-17T10:00:00Z",
      type: "video"
    }
  ];

  const fileCollaborations: FileCollaboration[] = [
    {
      fileId: "file-1",
      fileName: "api-spec.yaml",
      collaborators: [
        {
          userId: "user-1",
          userName: "John Doe",
          userAvatar: "https://api.writeasy.com/avatars/john.jpg",
          cursorPosition: { line: 45, column: 12 },
          isTyping: false
        }
      ],
      lastModified: "2024-01-17T10:30:00Z",
      lastModifiedBy: "user-1"
    },
    {
      fileId: "file-2",
      fileName: "sdk-generator.tsx",
      collaborators: [
        {
          userId: "user-2",
          userName: "Jane Smith",
          userAvatar: "https://api.writeasy.com/avatars/jane.jpg",
          cursorPosition: { line: 23, column: 8 },
          selection: { start: { line: 20, column: 5 }, end: { line: 25, column: 15 } },
          isTyping: true
        }
      ],
      lastModified: "2024-01-17T10:25:00Z",
      lastModifiedBy: "user-2"
    }
  ];

  const projects: Project[] = [
    {
      id: "proj-1",
      name: "User Management API",
      description: "Complete user management system with authentication and authorization",
      status: "active",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-17",
      apiEndpoints: 12,
      sdkLanguages: ["Python", "JavaScript", "Go"],
      documentation: true,
      mcpServer: true,
      terraformProvider: false
    },
    {
      id: "proj-2",
      name: "E-commerce API",
      description: "Full e-commerce platform with products, orders, and payments",
      status: "active",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-16",
      apiEndpoints: 25,
      sdkLanguages: ["Python", "JavaScript", "TypeScript", "Java"],
      documentation: true,
      mcpServer: true,
      terraformProvider: true
    },
    {
      id: "proj-3",
      name: "Analytics API",
      description: "Real-time analytics and reporting system",
      status: "paused",
      createdAt: "2024-01-05",
      lastUpdated: "2024-01-12",
      apiEndpoints: 8,
      sdkLanguages: ["Python", "R"],
      documentation: true,
      mcpServer: false,
      terraformProvider: false
    }
  ];

  const apiKeys: ApiKey[] = [
    {
      id: "key-1",
      name: "Production API Key",
      key: "wsk_live_1234567890abcdef",
      permissions: ["read", "write", "admin"],
      lastUsed: "2024-01-17T10:30:00Z",
      createdAt: "2024-01-15"
    },
    {
      id: "key-2",
      name: "Development API Key",
      key: "wsk_test_abcdef1234567890",
      permissions: ["read", "write"],
      lastUsed: "2024-01-16T15:45:00Z",
      createdAt: "2024-01-10"
    }
  ];

  const activities: Activity[] = [
    {
      id: "act-1",
      type: "deployment",
      message: "SDK v2.1.0 deployed to npm",
      timestamp: "2024-01-17T10:30:00Z",
      status: "success",
      userId: "user-1",
      userName: "John Doe",
      userAvatar: "https://api.writeasy.com/avatars/john.jpg"
    },
    {
      id: "act-2",
      type: "generation",
      message: "Python SDK generated successfully",
      timestamp: "2024-01-17T09:15:00Z",
      status: "success",
      userId: "user-3",
      userName: "Mike Johnson",
      userAvatar: "https://api.writeasy.com/avatars/mike.jpg"
    },
    {
      id: "act-3",
      type: "collaboration",
      message: "Jane Smith joined the live session",
      timestamp: "2024-01-17T09:00:00Z",
      status: "success",
      userId: "user-2",
      userName: "Jane Smith",
      userAvatar: "https://api.writeasy.com/avatars/jane.jpg"
    },
    {
      id: "act-4",
      type: "comment",
      message: "Added comment to api-spec.yaml",
      timestamp: "2024-01-17T08:45:00Z",
      status: "success",
      userId: "user-2",
      userName: "Jane Smith",
      userAvatar: "https://api.writeasy.com/avatars/jane.jpg"
    },
    {
      id: "act-5",
      type: "mention",
      message: "Mentioned Mike Johnson in chat",
      timestamp: "2024-01-17T08:30:00Z",
      status: "success",
      userId: "user-1",
      userName: "John Doe",
      userAvatar: "https://api.writeasy.com/avatars/john.jpg"
    },
    {
      id: "act-6",
      type: "error",
      message: "MCP server generation failed",
      timestamp: "2024-01-16T14:10:00Z",
      status: "error",
      userId: "user-3",
      userName: "Mike Johnson",
      userAvatar: "https://api.writeasy.com/avatars/mike.jpg"
    },
    {
      id: "act-7",
      type: "deployment",
      message: "Terraform provider published",
      timestamp: "2024-01-15T11:45:00Z",
      status: "success",
      userId: "user-1",
      userName: "John Doe",
      userAvatar: "https://api.writeasy.com/avatars/john.jpg"
    }
  ];

  // Collaboration functions
  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      message: chatMessage,
      timestamp: new Date().toISOString(),
      type: "text",
      reactions: [],
      isPinned: false
    };
    
    // In a real app, this would send to a WebSocket or API
    console.log("Sending message:", newMessage);
    setChatMessage("");
  };

  const addReaction = (messageId: string, emoji: string) => {
    console.log("Adding reaction:", { messageId, emoji, userId: currentUser.id });
  };

  const toggleTyping = (isTyping: boolean) => {
    setIsTyping(isTyping);
    // In a real app, this would broadcast to other users
    console.log("Typing status:", isTyping);
  };

  const joinLiveSession = (sessionId: string) => {
    console.log("Joining live session:", sessionId);
    setShowLiveSession(true);
  };

  const inviteCollaborator = (email: string, role: string) => {
    console.log("Inviting collaborator:", { email, role });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner": return "bg-purple-100 text-purple-800";
      case "admin": return "bg-blue-100 text-blue-800";
      case "developer": return "bg-green-100 text-green-800";
      case "viewer": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "mention": return <MessageSquare className="w-4 h-4" />;
      case "deployment": return <Globe className="w-4 h-4" />;
      case "error": return <AlertCircle className="w-4 h-4" />;
      case "collaboration": return <Users className="w-4 h-4" />;
      case "system": return <Settings className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "deployment": return <Globe className="w-4 h-4" />;
      case "generation": return <Code2 className="w-4 h-4" />;
      case "update": return <Edit className="w-4 h-4" />;
      case "error": return <AlertCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "error": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const generateProjectStats = () => {
    const project = projects[selectedProject];
    return {
      totalRequests: Math.floor(Math.random() * 100000) + 50000,
      successRate: 99.2 + Math.random() * 0.8,
      avgResponseTime: 120 + Math.random() * 80,
      activeUsers: Math.floor(Math.random() * 1000) + 500
    };
  };

  const stats = generateProjectStats();

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
            <div className="flex items-center justify-between mb-4">
              <div className="animate-stagger-1">
                <h1 className="text-4xl font-serif font-normal mb-2">Project Dashboard</h1>
                <p className="text-muted-foreground">Manage your API projects, monitor performance, and collaborate in real-time</p>
              </div>
              <div className="flex items-center gap-2 animate-stagger-2">
                {/* Live Session Indicator */}
                {liveSessions.some(session => session.isActive) && (
                  <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
                    <CircleDot className="w-3 h-3 animate-pulse" />
                    Live Session
                  </Badge>
                )}
                
                {/* Online Collaborators */}
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {collaborators.filter(c => c.status === "online").length} online
                </Badge>
                
                {/* Notifications */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="w-4 h-4" />
                  {notifications.filter(n => !n.isRead).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  )}
                </Button>
                
                {/* Collaboration Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCollaboration(!showCollaboration)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                
                {/* Invite Collaborator */}
                <Button size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Project List */}
            <div className="space-y-6">
              <Card className="animate-stagger-3">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Projects
                    </div>
                    <Button size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedProject === index
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      }`}
                      onClick={() => setSelectedProject(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{project.name}</h3>
                        <Badge className={getProjectStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{project.apiEndpoints} endpoints</span>
                        <span>{project.sdkLanguages.length} SDKs</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="animate-stagger-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    API Keys
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{key.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(key.key, key.id)}
                        >
                          {copiedCode === key.id ? (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded block mb-2">
                        {key.key.substring(0, 12)}...
                      </code>
                      <div className="flex gap-1">
                        {key.permissions.map((perm) => (
                          <Badge key={perm} variant="secondary" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 animate-stagger-5">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="deployments">Deployments</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Project Stats */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm text-muted-foreground">Total Requests</p>
                            <p className="text-2xl font-bold">{stats.totalRequests.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-muted-foreground">Success Rate</p>
                            <p className="text-2xl font-bold">{stats.successRate.toFixed(1)}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-yellow-600" />
                          <div>
                            <p className="text-sm text-muted-foreground">Avg Response</p>
                            <p className="text-2xl font-bold">{stats.avgResponseTime.toFixed(0)}ms</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-sm text-muted-foreground">Active Users</p>
                            <p className="text-2xl font-bold">{stats.activeUsers}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Project Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Settings className="w-5 h-5" />
                          {projects[selectedProject].name}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </Button>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Deploy
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Project Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <Badge className={getProjectStatusColor(projects[selectedProject].status)}>
                                {projects[selectedProject].status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Created:</span>
                              <span>{projects[selectedProject].createdAt}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Updated:</span>
                              <span>{projects[selectedProject].lastUpdated}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">API Endpoints:</span>
                              <span>{projects[selectedProject].apiEndpoints}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Generated Assets</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">SDK Languages:</span>
                              <div className="flex gap-1">
                                {projects[selectedProject].sdkLanguages.map((lang) => (
                                  <Badge key={lang} variant="secondary" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Documentation:</span>
                              <Badge className={projects[selectedProject].documentation ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                {projects[selectedProject].documentation ? "Generated" : "Not Generated"}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">MCP Server:</span>
                              <Badge className={projects[selectedProject].mcpServer ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                {projects[selectedProject].mcpServer ? "Generated" : "Not Generated"}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Terraform Provider:</span>
                              <Badge className={projects[selectedProject].terraformProvider ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                {projects[selectedProject].terraformProvider ? "Generated" : "Not Generated"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {activities.slice(0, 5).map((activity) => (
                          <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              {activity.userAvatar && (
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={activity.userAvatar} />
                                  <AvatarFallback>{activity.userName?.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                              <div className={`${getActivityColor(activity.status)}`}>
                                {getActivityIcon(activity.type)}
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.message}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{activity.userName}</span>
                                <span>•</span>
                                <span>{formatTimestamp(activity.timestamp)}</span>
                              </div>
                            </div>
                            <Badge className={getActivityColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="collaboration" className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Team Members */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Team Members
                          </div>
                          <Button size="sm">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Invite
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {collaborators.map((collaborator) => (
                          <div key={collaborator.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={collaborator.avatar} />
                                <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(collaborator.status)}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm">{collaborator.name}</h4>
                                <Badge className={getRoleColor(collaborator.role)}>
                                  {collaborator.role}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{collaborator.email}</p>
                              {collaborator.isTyping && (
                                <p className="text-xs text-blue-600">Typing...</p>
                              )}
                              {collaborator.currentFile && (
                                <p className="text-xs text-muted-foreground">Editing {collaborator.currentFile}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Live Sessions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Video className="w-5 h-5" />
                            Live Sessions
                          </div>
                          <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Start Session
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {liveSessions.map((session) => (
                          <div key={session.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-sm">{session.name}</h4>
                              <Badge className="bg-red-100 text-red-800">
                                <CircleDot className="w-3 h-3 mr-1 animate-pulse" />
                                Live
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex -space-x-2">
                                {session.participants.slice(0, 3).map((participantId) => {
                                  const participant = collaborators.find(c => c.id === participantId);
                                  return participant ? (
                                    <Avatar key={participantId} className="w-6 h-6 border-2 border-white">
                                      <AvatarImage src={participant.avatar} />
                                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  ) : null;
                                })}
                                {session.participants.length > 3 && (
                                  <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                                    +{session.participants.length - 3}
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {session.participants.length} participants
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" onClick={() => joinLiveSession(session.id)}>
                                <Video className="w-4 h-4 mr-2" />
                                Join
                              </Button>
                              <Button variant="outline" size="sm">
                                <ScreenShare className="w-4 h-4 mr-2" />
                                Share Screen
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Chat */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Team Chat
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96 flex flex-col">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                          {chatMessages.map((message) => (
                            <div key={message.id} className={`flex gap-3 ${message.userId === currentUser.id ? 'flex-row-reverse' : ''}`}>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={message.userAvatar} />
                                <AvatarFallback>{message.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className={`flex-1 ${message.userId === currentUser.id ? 'text-right' : ''}`}>
                                <div className={`inline-block p-3 rounded-lg max-w-xs ${
                                  message.userId === currentUser.id 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-900'
                                }`}>
                                  {message.type === 'code' ? (
                                    <pre className="text-xs whitespace-pre-wrap">{message.message}</pre>
                                  ) : (
                                    <p className="text-sm">{message.message}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-muted-foreground">{message.userName}</span>
                                  <span className="text-xs text-muted-foreground">{formatTimestamp(message.timestamp)}</span>
                                  {message.isPinned && <Pin className="w-3 h-3 text-yellow-500" />}
                                </div>
                                {message.reactions.length > 0 && (
                                  <div className="flex gap-1 mt-1">
                                    {message.reactions.map((reaction, index) => (
                                      <Button
                                        key={index}
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs"
                                        onClick={() => addReaction(message.id, reaction.emoji)}
                                      >
                                        {reaction.emoji} {reaction.users.length}
                                      </Button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Message Input */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type a message..."
                            value={chatMessage}
                            onChange={(e) => {
                              setChatMessage(e.target.value);
                              toggleTyping(e.target.value.length > 0);
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                sendChatMessage();
                              }
                            }}
                          />
                          <Button onClick={sendChatMessage} disabled={!chatMessage.trim()}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Performance Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12 text-muted-foreground">
                        <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Analytics dashboard coming soon...</p>
                        <p className="text-sm">Track API usage, performance metrics, and user behavior</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="deployments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GitBranch className="w-5 h-5" />
                        Deployment History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {activities.filter(a => a.type === "deployment").map((deployment) => (
                          <div key={deployment.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="text-green-600">
                              <Globe className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{deployment.message}</p>
                              <p className="text-xs text-muted-foreground">{deployment.timestamp}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              {deployment.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="files" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          File Collaborations
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                          <Button size="sm">
                            <FilePlus className="w-4 h-4 mr-2" />
                            New File
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {fileCollaborations.map((file) => (
                          <div key={file.fileId} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <FileCode className="w-5 h-5 text-blue-600" />
                                <div>
                                  <h4 className="font-medium">{file.fileName}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Last modified by {file.lastModifiedBy} • {formatTimestamp(file.lastModified)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share
                                </Button>
                              </div>
                            </div>
                            
                            {/* Active Collaborators */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Active collaborators:</span>
                              <div className="flex -space-x-2">
                                {file.collaborators.map((collaborator) => (
                                  <div key={collaborator.userId} className="relative">
                                    <Avatar className="w-8 h-8 border-2 border-white">
                                      <AvatarImage src={collaborator.userAvatar} />
                                      <AvatarFallback>{collaborator.userName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {collaborator.isTyping && (
                                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                                    )}
                                  </div>
                                ))}
                              </div>
                              {file.collaborators.some(c => c.isTyping) && (
                                <span className="text-sm text-blue-600">Someone is typing...</span>
                              )}
                            </div>
                            
                            {/* Cursor Positions */}
                            {file.collaborators.length > 0 && (
                              <div className="mt-2 text-xs text-muted-foreground">
                                {file.collaborators.map((collaborator) => (
                                  <div key={collaborator.userId} className="flex items-center gap-2">
                                    <span>{collaborator.userName}:</span>
                                    <span>Line {collaborator.cursorPosition.line}, Column {collaborator.cursorPosition.column}</span>
                                    {collaborator.selection && (
                                      <span className="text-blue-600">
                                        (Selected: L{collaborator.selection.start.line}:{collaborator.selection.start.column} - L{collaborator.selection.end.line}:{collaborator.selection.end.column})
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Project Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="project-name">Project Name</Label>
                        <Input
                          id="project-name"
                          defaultValue={projects[selectedProject].name}
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-description">Description</Label>
                        <Textarea
                          id="project-description"
                          defaultValue={projects[selectedProject].description}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-status">Status</Label>
                        <Select defaultValue={projects[selectedProject].status}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="paused">Paused</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button>Save Changes</Button>
                        <Button variant="outline">Reset</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="fixed top-20 right-6 w-80 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`${getActivityColor(notification.isRead ? 'success' : 'warning')}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                          {notification.userName && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{notification.userName}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collaboration Sidebar */}
          {showCollaboration && (
            <div className="fixed top-20 right-6 w-80 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Quick Chat</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowCollaboration(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="h-96 flex flex-col">
                {/* Online Users */}
                <div className="p-3 border-b">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Online:</span>
                    <div className="flex -space-x-2">
                      {collaborators.filter(c => c.status === "online").map((collaborator) => (
                        <Avatar key={collaborator.id} className="w-6 h-6 border-2 border-white">
                          <AvatarImage src={collaborator.avatar} />
                          <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Quick Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {chatMessages.slice(-3).map((message) => (
                    <div key={message.id} className="text-sm">
                      <span className="font-medium">{message.userName}:</span>
                      <span className="text-muted-foreground ml-1">{message.message.substring(0, 50)}...</span>
                    </div>
                  ))}
                </div>
                
                {/* Quick Input */}
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Quick message..."
                      className="text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          sendChatMessage();
                        }
                      }}
                    />
                    <Button size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
