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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Bell, 
  BellOff, 
  BellRing, 
  MessageSquare, 
  MessageCircle, 
  Mail, 
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
  FileText, 
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
  FileVersionCue, 
  FileWeb, 
  FileWebPremium, 
  FileWebStandard, 
  FileWebStarter, 
  FileWebUltimate, 
  FileWebElements, 
  FileWebExtended, 
  FileWebProfessional, 
  FileWebStudent, 
  FileWebTeacher, 
  FileWebTrial, 
  FileWebUpgrade, 
  FileWebCrossgrade, 
  FileWebAcademic, 
  FileWebCommercial, 
  FileWebEducational, 
  FileWebGovernment, 
  FileWebNonProfit, 
  FileWebPersonal, 
  FileWebBusiness, 
  FileWebEnterprise, 
  FileWebCorporate, 
  FileWebProfessionalPlus, 
  FileWebUltimatePlus, 
  FileWebElementsPlus, 
  FileWebExtendedPlus, 
  FileWebProfessionalPlusIcon, 
  FileWebStudentPlus, 
  FileWebTeacherPlus, 
  FileWebTrialPlus, 
  FileWebUpgradePlus, 
  FileWebCrossgradePlus, 
  FileWebAcademicPlus, 
  FileWebCommercialPlus, 
  FileWebEducationalPlus, 
  FileWebGovernmentPlus, 
  FileWebNonProfitPlus, 
  FileWebPersonalPlus, 
  FileWebBusinessPlus, 
  FileWebEnterprisePlus, 
  FileWebCorporatePlus, 
  FileWebProfessionalPlusIcon2, 
  FileWebUltimatePlusIcon, 
  FileWebElementsPlusIcon, 
  FileWebExtendedPlusIcon, 
  FileWebProfessionalPlusIcon3, 
  FileWebStudentPlusIcon, 
  FileWebTeacherPlusIcon, 
  FileWebTrialPlusIcon, 
  FileWebUpgradePlusIcon, 
  FileWebCrossgradePlusIcon, 
  FileWebAcademicPlusIcon, 
  FileWebCommercialPlusIcon, 
  FileWebEducationalPlusIcon, 
  FileWebGovernmentPlusIcon, 
  FileWebNonProfitPlusIcon, 
  FileWebPersonalPlusIcon, 
  FileWebBusinessPlusIcon, 
  FileWebEnterprisePlusIcon, 
  FileWebCorporatePlusIcon,
  Activity,
  TrendingUp,
  TrendingDown,
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
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Shield,
  Key,
  Database,
  Cloud,
  Server,
  Monitor,
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
  SendOff,
  InboxOff,
  ArchiveOff,
  TrashOff,
  FolderOff,
  FileOff,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  Play,
  Pause,
  Settings,
  User,
  Users,
  Clock,
  Calendar,
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
  CheckCircle,
  AlertCircle,
  X,
  Copy,
  Download,
  Upload,
  GitPullRequest
} from "lucide-react";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error" | "system" | "user" | "project" | "security";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;
  priority: "low" | "medium" | "high" | "critical";
  category: string;
  source: string;
  actionRequired: boolean;
  actionUrl?: string;
  metadata?: any;
}

interface ActivityFeed {
  id: string;
  type: "commit" | "pull_request" | "deployment" | "user_action" | "system_event" | "collaboration";
  title: string;
  description: string;
  timestamp: string;
  user: string;
  userAvatar: string;
  project: string;
  metadata?: any;
}

interface NotificationSettings {
  id: string;
  category: string;
  enabled: boolean;
  channels: {
    email: boolean;
    push: boolean;
    inApp: boolean;
    sms: boolean;
  };
  frequency: "immediate" | "hourly" | "daily" | "weekly";
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: string;
  subject: string;
  body: string;
  variables: string[];
  enabled: boolean;
}

export const NotificationSystem = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [enableRealTime, setEnableRealTime] = useState(true);
  const [enableSound, setEnableSound] = useState(true);
  const [enableDesktop, setEnableDesktop] = useState(true);
  const [enableEmail, setEnableEmail] = useState(true);
  const [enableSMS, setEnableSMS] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Mock Data
  const notifications: Notification[] = [
    {
      id: "notif-1",
      type: "success",
      title: "API Generation Complete",
      message: "Your Python SDK has been successfully generated and is ready for download.",
      timestamp: "2024-01-17T10:30:00Z",
      isRead: false,
      isArchived: false,
      priority: "medium",
      category: "generation",
      source: "SDK Generator",
      actionRequired: false,
      actionUrl: "/sdk-generator",
      metadata: { sdkType: "python", version: "1.0.0" }
    },
    {
      id: "notif-2",
      type: "warning",
      title: "High API Usage",
      message: "Your API requests are at 85% of monthly limit. Consider upgrading your plan.",
      timestamp: "2024-01-17T09:15:00Z",
      isRead: false,
      isArchived: false,
      priority: "high",
      category: "usage",
      source: "Subscription System",
      actionRequired: true,
      actionUrl: "/subscription",
      metadata: { usage: 85, limit: 100 }
    },
    {
      id: "notif-3",
      type: "info",
      title: "New Team Member Added",
      message: "Alice Brown has been added to your project team and can now collaborate.",
      timestamp: "2024-01-17T08:45:00Z",
      isRead: true,
      isArchived: false,
      priority: "low",
      category: "collaboration",
      source: "Project Dashboard",
      actionRequired: false,
      actionUrl: "/dashboard",
      metadata: { user: "Alice Brown", project: "writeasy-platform" }
    },
    {
      id: "notif-4",
      type: "error",
      title: "Authentication Failed",
      message: "Failed to authenticate with GitHub OAuth. Please check your credentials.",
      timestamp: "2024-01-17T08:20:00Z",
      isRead: false,
      isArchived: false,
      priority: "critical",
      category: "security",
      source: "Auth System",
      actionRequired: true,
      actionUrl: "/auth",
      metadata: { provider: "github", error: "invalid_credentials" }
    },
    {
      id: "notif-5",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM UTC.",
      timestamp: "2024-01-17T07:30:00Z",
      isRead: true,
      isArchived: false,
      priority: "medium",
      category: "system",
      source: "System",
      actionRequired: false,
      metadata: { startTime: "2024-01-18T02:00:00Z", endTime: "2024-01-18T04:00:00Z" }
    },
    {
      id: "notif-6",
      type: "user",
      title: "Pull Request Approved",
      message: "Your pull request 'Add AI model integration' has been approved by John Doe.",
      timestamp: "2024-01-17T06:15:00Z",
      isRead: true,
      isArchived: false,
      priority: "medium",
      category: "version_control",
      source: "Version Control",
      actionRequired: false,
      actionUrl: "/version-control",
      metadata: { prId: "pr-1", approver: "John Doe" }
    }
  ];

  const activityFeed: ActivityFeed[] = [
    {
      id: "activity-1",
      type: "commit",
      title: "New commit pushed",
      description: "feat: add AI model integration to MCP server",
      timestamp: "2024-01-17T10:30:00Z",
      user: "John Doe",
      userAvatar: "https://api.writeasy.com/avatars/john.jpg",
      project: "writeasy-platform",
      metadata: { commitHash: "a1b2c3d4", branch: "main" }
    },
    {
      id: "activity-2",
      type: "pull_request",
      title: "Pull request created",
      description: "Add real-time collaboration features",
      timestamp: "2024-01-17T09:45:00Z",
      user: "Alice Brown",
      userAvatar: "https://api.writeasy.com/avatars/alice.jpg",
      project: "writeasy-platform",
      metadata: { prId: "pr-3", status: "open" }
    },
    {
      id: "activity-3",
      type: "deployment",
      title: "Deployment successful",
      description: "Production deployment completed successfully",
      timestamp: "2024-01-17T09:20:00Z",
      user: "System",
      userAvatar: "https://api.writeasy.com/avatars/system.jpg",
      project: "writeasy-platform",
      metadata: { environment: "production", version: "v1.2.0" }
    },
    {
      id: "activity-4",
      type: "user_action",
      title: "User logged in",
      description: "Jane Smith logged in from San Francisco, CA",
      timestamp: "2024-01-17T09:15:00Z",
      user: "Jane Smith",
      userAvatar: "https://api.writeasy.com/avatars/jane.jpg",
      project: "writeasy-platform",
      metadata: { location: "San Francisco, CA", device: "Chrome 120.0" }
    },
    {
      id: "activity-5",
      type: "collaboration",
      title: "File edited",
      description: "Bob Johnson is editing src/components/AuthSystem.tsx",
      timestamp: "2024-01-17T09:00:00Z",
      user: "Bob Johnson",
      userAvatar: "https://api.writeasy.com/avatars/bob.jpg",
      project: "writeasy-platform",
      metadata: { file: "src/components/AuthSystem.tsx", action: "edit" }
    },
    {
      id: "activity-6",
      type: "system_event",
      title: "System alert",
      description: "High CPU usage detected on production server",
      timestamp: "2024-01-17T08:45:00Z",
      user: "System",
      userAvatar: "https://api.writeasy.com/avatars/system.jpg",
      project: "writeasy-platform",
      metadata: { alert: "high_cpu", server: "prod-01" }
    }
  ];

  const notificationSettingsData: NotificationSettings[] = [
    {
      id: "settings-1",
      category: "generation",
      enabled: true,
      channels: {
        email: true,
        push: true,
        inApp: true,
        sms: false
      },
      frequency: "immediate",
      quietHours: {
        enabled: true,
        start: "22:00",
        end: "08:00"
      }
    },
    {
      id: "settings-2",
      category: "usage",
      enabled: true,
      channels: {
        email: true,
        push: true,
        inApp: true,
        sms: true
      },
      frequency: "immediate",
      quietHours: {
        enabled: false,
        start: "22:00",
        end: "08:00"
      }
    },
    {
      id: "settings-3",
      category: "collaboration",
      enabled: true,
      channels: {
        email: false,
        push: true,
        inApp: true,
        sms: false
      },
      frequency: "immediate",
      quietHours: {
        enabled: true,
        start: "22:00",
        end: "08:00"
      }
    },
    {
      id: "settings-4",
      category: "security",
      enabled: true,
      channels: {
        email: true,
        push: true,
        inApp: true,
        sms: true
      },
      frequency: "immediate",
      quietHours: {
        enabled: false,
        start: "22:00",
        end: "08:00"
      }
    },
    {
      id: "settings-5",
      category: "system",
      enabled: true,
      channels: {
        email: true,
        push: false,
        inApp: true,
        sms: false
      },
      frequency: "daily",
      quietHours: {
        enabled: true,
        start: "22:00",
        end: "08:00"
      }
    }
  ];

  const notificationTemplates: NotificationTemplate[] = [
    {
      id: "template-1",
      name: "API Generation Complete",
      type: "success",
      subject: "Your {{sdkType}} SDK is ready!",
      body: "Your {{sdkType}} SDK version {{version}} has been successfully generated and is ready for download.",
      variables: ["sdkType", "version"],
      enabled: true
    },
    {
      id: "template-2",
      name: "High Usage Warning",
      type: "warning",
      subject: "API Usage Alert: {{usage}}% of limit reached",
      body: "Your API usage is at {{usage}}% of your monthly limit. Consider upgrading your plan to avoid service interruption.",
      variables: ["usage", "limit"],
      enabled: true
    },
    {
      id: "template-3",
      name: "Security Alert",
      type: "error",
      subject: "Security Alert: {{alertType}} detected",
      body: "A security alert has been triggered: {{alertType}}. Please review and take appropriate action.",
      variables: ["alertType", "severity"],
      enabled: true
    }
  ];

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning": return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "error": return <X className="w-4 h-4 text-red-500" />;
      case "info": return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "system": return <Server className="w-4 h-4 text-gray-500" />;
      case "user": return <User className="w-4 h-4 text-purple-500" />;
      case "project": return <Folder className="w-4 h-4 text-orange-500" />;
      case "security": return <Shield className="w-4 h-4 text-red-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "commit": return <FileCode className="w-4 h-4 text-green-500" />;
      case "pull_request": return <GitPullRequest className="w-4 h-4 text-blue-500" />;
      case "deployment": return <Cloud className="w-4 h-4 text-purple-500" />;
      case "user_action": return <User className="w-4 h-4 text-orange-500" />;
      case "system_event": return <Server className="w-4 h-4 text-gray-500" />;
      case "collaboration": return <Users className="w-4 h-4 text-indigo-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const generateNotificationCode = () => {
    return `// Real-time Notification System
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io('wss://api.writeasy.com/notifications', {
      auth: {
        token: localStorage.getItem('authToken')
      }
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      
      // Show browser notification if permission granted
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/logo.png'
        });
      }
    });

    socket.on('activity', (activity) => {
      // Handle real-time activity updates
      console.log('New activity:', activity);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const archiveNotification = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isArchived: true }
          : notif
      )
    );
  };

  return {
    notifications,
    isConnected,
    markAsRead,
    archiveNotification
  };
};

export default useNotifications;`;
  };

  // Simulate real-time updates
  useEffect(() => {
    if (!enableRealTime) return;

    const interval = setInterval(() => {
      // Simulate new notifications and activities
      console.log("Simulating real-time notification updates...");
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [enableRealTime]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-normal mb-2">Notifications & Activity</h1>
            <p className="text-muted-foreground">Stay updated with real-time notifications and activity feeds</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Notification Settings Sidebar */}
            <div className="space-y-6">
              {/* Quick Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Quick Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="real-time">Real-time Updates</Label>
                      <p className="text-sm text-muted-foreground">Enable real-time notifications</p>
                    </div>
                    <Switch 
                      id="real-time"
                      checked={enableRealTime}
                      onCheckedChange={setEnableRealTime}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sound">Sound Notifications</Label>
                      <p className="text-sm text-muted-foreground">Play sound for new notifications</p>
                    </div>
                    <Switch 
                      id="sound"
                      checked={enableSound}
                      onCheckedChange={setEnableSound}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="desktop">Desktop Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show browser notifications</p>
                    </div>
                    <Switch 
                      id="desktop"
                      checked={enableDesktop}
                      onCheckedChange={setEnableDesktop}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send email notifications</p>
                    </div>
                    <Switch 
                      id="email"
                      checked={enableEmail}
                      onCheckedChange={setEnableEmail}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send SMS for critical alerts</p>
                    </div>
                    <Switch 
                      id="sms"
                      checked={enableSMS}
                      onCheckedChange={setEnableSMS}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">All Notifications</span>
                    <Badge variant="outline">{notifications.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Unread</span>
                    <Badge variant="destructive">{notifications.filter(n => !n.isRead).length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Generation</span>
                    <Badge variant="outline">{notifications.filter(n => n.category === 'generation').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Usage</span>
                    <Badge variant="outline">{notifications.filter(n => n.category === 'usage').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security</span>
                    <Badge variant="outline">{notifications.filter(n => n.category === 'security').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Collaboration</span>
                    <Badge variant="outline">{notifications.filter(n => n.category === 'collaboration').length}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark All as Read
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Archive className="w-4 h-4 mr-2" />
                    Archive All
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Trash className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                  <Button className="w-full" variant="outline" onClick={() => setShowSettings(!showSettings)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Advanced Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="activity">Activity Feed</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Recent Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 border rounded-lg transition-all ${
                              notification.isRead ? 'bg-muted/50' : 'bg-background'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium">{notification.title}</h4>
                                  <div className="flex items-center gap-2">
                                    <Badge className={getPriorityColor(notification.priority)}>
                                      {notification.priority}
                                    </Badge>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{notification.source}</span>
                                    <span>•</span>
                                    <span>{getRelativeTime(notification.timestamp)}</span>
                                    <span>•</span>
                                    <span>{notification.category}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    {!notification.isRead && (
                                      <Button variant="ghost" size="sm">
                                        <CheckCircle className="w-4 h-4" />
                                      </Button>
                                    )}
                                    <Button variant="ghost" size="sm">
                                      <Archive className="w-4 h-4" />
                                    </Button>
                                    {notification.actionRequired && (
                                      <Button size="sm">
                                        Take Action
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Activity Feed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activityFeed.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                            <div className="flex-shrink-0 mt-1">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{activity.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {activity.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {activity.user}
                                </span>
                                <span>•</span>
                                <span>{getRelativeTime(activity.timestamp)}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Folder className="w-3 h-3" />
                                  {activity.project}
                                </span>
                              </div>
                            </div>
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
                        Notification Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {notificationSettingsData.map((setting) => (
                          <div key={setting.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium capitalize">{setting.category.replace('_', ' ')}</h4>
                              <Switch 
                                checked={setting.enabled}
                                onCheckedChange={(checked) => {
                                  setNotificationSettings(prev => 
                                    prev.map(s => s.id === setting.id ? { ...s, enabled: checked } : s)
                                  );
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>Email</span>
                                <Switch 
                                  size="sm"
                                  checked={setting.channels.email}
                                  disabled={!setting.enabled}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <Bell className="w-4 h-4" />
                                <span>Push</span>
                                <Switch 
                                  size="sm"
                                  checked={setting.channels.push}
                                  disabled={!setting.enabled}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                <span>In-App</span>
                                <Switch 
                                  size="sm"
                                  checked={setting.channels.inApp}
                                  disabled={!setting.enabled}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>SMS</span>
                                <Switch 
                                  size="sm"
                                  checked={setting.channels.sms}
                                  disabled={!setting.enabled}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Notification Templates
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generateNotificationCode(), "notification-code")}
                        >
                          {copiedCode === "notification-code" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {notificationTemplates.map((template) => (
                          <div key={template.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{template.name}</h4>
                              <Badge variant={template.enabled ? "default" : "secondary"}>
                                {template.enabled ? "Enabled" : "Disabled"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{template.subject}</p>
                            <p className="text-xs text-muted-foreground">{template.body}</p>
                          </div>
                        ))}
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
