import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Check, 
  X, 
  Star, 
  CreditCard, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Download,
  Copy,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Trash2,
  Activity,
  PieChart,
  LineChart,
  AreaChart,
  ScatterChart,
  RadarChart,
  Gauge,
  Thermometer,
  Target,
  Award,
  TrendingDown,
  Minus,
  Plus,
  Eye,
  EyeOff,
  Filter,
  Search,
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
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Phone,
  PhoneOff,
  Mail,
  MessageCircle,
  MessageSquare,
  Bell,
  BellOff,
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
  FileWebCorporatePlusIcon
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "yearly";
  description: string;
  features: string[];
  limits: {
    apiEndpoints: number;
    sdkLanguages: number;
    mcpServers: number;
    terraformProviders: number;
    requestsPerMonth: number;
    teamMembers: number;
  };
  popular?: boolean;
}

interface Subscription {
  id: string;
  planId: string;
  status: "active" | "cancelled" | "past_due" | "trialing";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd?: string;
}

interface Invoice {
  id: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
  description: string;
  downloadUrl: string;
}

interface Usage {
  apiEndpoints: number;
  sdkLanguages: number;
  mcpServers: number;
  terraformProviders: number;
  requestsThisMonth: number;
  teamMembers: number;
}

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
  period: string;
  icon: string;
  color: string;
}

interface RevenueData {
  date: string;
  revenue: number;
  subscriptions: number;
  churn: number;
  mrr: number;
  arr: number;
}

interface CustomerSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  avgRevenue: number;
  churnRate: number;
  color: string;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: "excellent" | "good" | "warning" | "critical";
  trend: "up" | "down" | "stable";
}

interface Alert {
  id: string;
  type: "usage" | "billing" | "performance" | "security";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
}

interface CohortAnalysis {
  cohort: string;
  period: string;
  customers: number;
  retention: number[];
  revenue: number[];
}

interface GeographicData {
  country: string;
  customers: number;
  revenue: number;
  growth: number;
}

export const SubscriptionSystem = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [activeTab, setActiveTab] = useState("plans");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [analyticsPeriod, setAnalyticsPeriod] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [showAlerts, setShowAlerts] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const plans: PricingPlan[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      period: "monthly",
      description: "Perfect for getting started with AI-native APIs",
      features: [
        "Up to 5 API endpoints",
        "2 SDK languages (Python, JavaScript)",
        "Basic documentation",
        "Community support",
        "1 MCP server",
        "Standard response times"
      ],
      limits: {
        apiEndpoints: 5,
        sdkLanguages: 2,
        mcpServers: 1,
        terraformProviders: 0,
        requestsPerMonth: 10000,
        teamMembers: 1
      }
    },
    {
      id: "pro",
      name: "Pro",
      price: billingPeriod === "monthly" ? 29 : 290,
      period: billingPeriod,
      description: "For growing teams building production APIs",
      features: [
        "Unlimited API endpoints",
        "8 SDK languages",
        "Advanced documentation",
        "Priority support",
        "Unlimited MCP servers",
        "Terraform providers",
        "Custom domains",
        "Analytics dashboard",
        "Team collaboration"
      ],
      limits: {
        apiEndpoints: -1, // unlimited
        sdkLanguages: 8,
        mcpServers: -1, // unlimited
        terraformProviders: -1, // unlimited
        requestsPerMonth: 100000,
        teamMembers: 5
      },
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: billingPeriod === "monthly" ? 99 : 990,
      period: billingPeriod,
      description: "For large organizations with advanced needs",
      features: [
        "Everything in Pro",
        "Unlimited requests",
        "Unlimited team members",
        "SSO integration",
        "Advanced security",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "On-premise deployment"
      ],
      limits: {
        apiEndpoints: -1, // unlimited
        sdkLanguages: -1, // unlimited
        mcpServers: -1, // unlimited
        terraformProviders: -1, // unlimited
        requestsPerMonth: -1, // unlimited
        teamMembers: -1 // unlimited
      }
    }
  ];

  const currentSubscription: Subscription = {
    id: "sub-1",
    planId: "pro",
    status: "active",
    currentPeriodStart: "2024-01-15",
    currentPeriodEnd: "2024-02-15",
    cancelAtPeriodEnd: false,
    trialEnd: "2024-01-22"
  };

  const invoices: Invoice[] = [
    {
      id: "inv-001",
      amount: 29,
      status: "paid",
      date: "2024-01-15",
      description: "Pro Plan - Monthly",
      downloadUrl: "#"
    },
    {
      id: "inv-002",
      amount: 29,
      status: "pending",
      date: "2024-02-15",
      description: "Pro Plan - Monthly",
      downloadUrl: "#"
    }
  ];

  const usage: Usage = {
    apiEndpoints: 12,
    sdkLanguages: 3,
    mcpServers: 2,
    terraformProviders: 1,
    requestsThisMonth: 45000,
    teamMembers: 3
  };

  // Advanced Analytics Data
  const analyticsMetrics: AnalyticsMetric[] = [
    {
      id: "mrr",
      name: "Monthly Recurring Revenue",
      value: 125000,
      change: 12.5,
      changeType: "increase",
      period: "vs last month",
      icon: "dollar-sign",
      color: "text-green-600"
    },
    {
      id: "customers",
      name: "Active Customers",
      value: 2847,
      change: 8.2,
      changeType: "increase",
      period: "vs last month",
      icon: "users",
      color: "text-blue-600"
    },
    {
      id: "churn",
      name: "Churn Rate",
      value: 2.1,
      change: -0.3,
      changeType: "decrease",
      period: "vs last month",
      icon: "trending-down",
      color: "text-green-600"
    },
    {
      id: "ltv",
      name: "Customer LTV",
      value: 1250,
      change: 15.8,
      changeType: "increase",
      period: "vs last month",
      icon: "target",
      color: "text-purple-600"
    },
    {
      id: "cac",
      name: "Customer Acquisition Cost",
      value: 85,
      change: -5.2,
      changeType: "decrease",
      period: "vs last month",
      icon: "trending-down",
      color: "text-green-600"
    },
    {
      id: "arpu",
      name: "Average Revenue Per User",
      value: 44,
      change: 3.1,
      changeType: "increase",
      period: "vs last month",
      icon: "trending-up",
      color: "text-blue-600"
    }
  ];

  const revenueData: RevenueData[] = [
    { date: "2024-01-01", revenue: 120000, subscriptions: 2800, churn: 2.4, mrr: 120000, arr: 1440000 },
    { date: "2024-01-08", revenue: 122500, subscriptions: 2850, churn: 2.2, mrr: 122500, arr: 1470000 },
    { date: "2024-01-15", revenue: 125000, subscriptions: 2847, churn: 2.1, mrr: 125000, arr: 1500000 },
    { date: "2024-01-22", revenue: 127800, subscriptions: 2890, churn: 1.9, mrr: 127800, arr: 1533600 },
    { date: "2024-01-29", revenue: 130500, subscriptions: 2920, churn: 1.8, mrr: 130500, arr: 1566000 }
  ];

  const customerSegments: CustomerSegment[] = [
    {
      id: "startup",
      name: "Startups",
      count: 1200,
      percentage: 42.1,
      avgRevenue: 25,
      churnRate: 3.2,
      color: "bg-blue-500"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      count: 850,
      percentage: 29.8,
      avgRevenue: 150,
      churnRate: 1.2,
      color: "bg-green-500"
    },
    {
      id: "smb",
      name: "SMB",
      count: 650,
      percentage: 22.8,
      avgRevenue: 75,
      churnRate: 2.8,
      color: "bg-purple-500"
    },
    {
      id: "individual",
      name: "Individual",
      count: 147,
      percentage: 5.3,
      avgRevenue: 15,
      churnRate: 4.5,
      color: "bg-orange-500"
    }
  ];

  const performanceMetrics: PerformanceMetric[] = [
    {
      id: "uptime",
      name: "API Uptime",
      value: 99.9,
      target: 99.5,
      unit: "%",
      status: "excellent",
      trend: "stable"
    },
    {
      id: "response_time",
      name: "Avg Response Time",
      value: 120,
      target: 200,
      unit: "ms",
      status: "excellent",
      trend: "down"
    },
    {
      id: "error_rate",
      name: "Error Rate",
      value: 0.1,
      target: 1.0,
      unit: "%",
      status: "excellent",
      trend: "down"
    },
    {
      id: "throughput",
      name: "Requests/Second",
      value: 2500,
      target: 2000,
      unit: "req/s",
      status: "excellent",
      trend: "up"
    }
  ];

  const alerts: Alert[] = [
    {
      id: "alert-1",
      type: "usage",
      severity: "medium",
      title: "High API Usage",
      message: "API requests are at 85% of monthly limit",
      timestamp: "2024-01-17T10:30:00Z",
      isRead: false,
      actionRequired: true
    },
    {
      id: "alert-2",
      type: "billing",
      severity: "low",
      title: "Payment Successful",
      message: "Monthly subscription payment processed",
      timestamp: "2024-01-15T09:00:00Z",
      isRead: true,
      actionRequired: false
    },
    {
      id: "alert-3",
      type: "performance",
      severity: "high",
      title: "Response Time Spike",
      message: "Average response time increased to 350ms",
      timestamp: "2024-01-16T14:20:00Z",
      isRead: false,
      actionRequired: true
    },
    {
      id: "alert-4",
      type: "security",
      severity: "critical",
      title: "Suspicious Activity",
      message: "Unusual API access patterns detected",
      timestamp: "2024-01-17T08:45:00Z",
      isRead: false,
      actionRequired: true
    }
  ];

  const geographicData: GeographicData[] = [
    { country: "United States", customers: 1200, revenue: 45000, growth: 12.5 },
    { country: "United Kingdom", customers: 450, revenue: 18000, growth: 8.2 },
    { country: "Germany", customers: 380, revenue: 15000, growth: 15.8 },
    { country: "Canada", customers: 320, revenue: 12000, growth: 6.5 },
    { country: "Australia", customers: 280, revenue: 11000, growth: 9.1 },
    { country: "France", customers: 250, revenue: 9500, growth: 7.3 },
    { country: "Japan", customers: 200, revenue: 8000, growth: 11.2 },
    { country: "Netherlands", customers: 180, revenue: 7200, growth: 13.7 }
  ];

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const generateWebhookCode = () => {
    return `// Webhook handler for subscription events
app.post('/webhook/subscription', (req, res) => {
  const { type, data } = req.body;
  
  switch (type) {
    case 'subscription.created':
      console.log('New subscription:', data.id);
      break;
    case 'subscription.updated':
      console.log('Subscription updated:', data.id);
      break;
    case 'subscription.cancelled':
      console.log('Subscription cancelled:', data.id);
      break;
    case 'invoice.paid':
      console.log('Invoice paid:', data.id);
      break;
    case 'invoice.payment_failed':
      console.log('Payment failed:', data.id);
      break;
  }
  
  res.status(200).send('OK');
});`;
  };

  const generateStripeCode = () => {
    return `// Stripe integration example
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create subscription
const subscription = await stripe.subscriptions.create({
  customer: 'cus_customer_id',
  items: [
    {
      price: 'price_pro_monthly', // Your Stripe price ID
    },
  ],
  payment_behavior: 'default_incomplete',
  payment_settings: { save_default_payment_method: 'on_subscription' },
  expand: ['latest_invoice.payment_intent'],
});

// Handle webhook events
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook signature verification failed.\`);
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      const subscription = event.data.object;
      // Handle subscription creation
      break;
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      // Handle successful payment
      break;
    default:
      console.log(\`Unhandled event type \${event.type}\`);
  }

  res.json({received: true});
});`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "past_due": return "bg-yellow-100 text-yellow-800";
      case "trialing": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Free";
    return `$${price}`;
  };

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  // Enhanced Analytics Functions
  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case "dollar-sign": return <DollarSign className="w-5 h-5" />;
      case "users": return <Users className="w-5 h-5" />;
      case "trending-down": return <TrendingDown className="w-5 h-5" />;
      case "trending-up": return <TrendingUp className="w-5 h-5" />;
      case "target": return <Target className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "usage": return <BarChart3 className="w-4 h-4" />;
      case "billing": return <CreditCard className="w-4 h-4" />;
      case "performance": return <Activity className="w-4 h-4" />;
      case "security": return <Shield className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-blue-100 text-blue-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPerformanceStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "warning": return "text-yellow-600";
      case "critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />;
      case "stable": return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Simulate real-time data updates
      console.log("Refreshing analytics data...");
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-normal mb-2">Subscription Management</h1>
            <p className="text-muted-foreground">Manage your plan, billing, and usage across all projects</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Current Plan */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Pro Plan</h3>
                    <p className="text-3xl font-bold text-accent">$29/month</p>
                    <Badge className={getStatusColor(currentSubscription.status)}>
                      {currentSubscription.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Billing period:</span>
                      <span>{currentSubscription.currentPeriodStart} - {currentSubscription.currentPeriodEnd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next billing:</span>
                      <span>{currentSubscription.currentPeriodEnd}</span>
                    </div>
                    {currentSubscription.trialEnd && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trial ends:</span>
                        <span>{currentSubscription.trialEnd}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Usage This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Requests</span>
                        <span className={getUsageColor(getUsagePercentage(usage.requestsThisMonth, 100000))}>
                          {usage.requestsThisMonth.toLocaleString()} / 100,000
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full" 
                          style={{ width: `${getUsagePercentage(usage.requestsThisMonth, 100000)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>API Endpoints</span>
                        <span className={getUsageColor(getUsagePercentage(usage.apiEndpoints, -1))}>
                          {usage.apiEndpoints} / Unlimited
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Team Members</span>
                        <span className={getUsageColor(getUsagePercentage(usage.teamMembers, 5))}>
                          {usage.teamMembers} / 5
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full" 
                          style={{ width: `${getUsagePercentage(usage.teamMembers, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="plans">Plans</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="integration">Integration</TabsTrigger>
                </TabsList>

                <TabsContent value="plans" className="space-y-6">
                  {/* Billing Period Toggle */}
                  <div className="flex justify-center">
                    <div className="bg-muted p-1 rounded-lg">
                      <Button
                        variant={billingPeriod === "monthly" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setBillingPeriod("monthly")}
                      >
                        Monthly
                      </Button>
                      <Button
                        variant={billingPeriod === "yearly" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setBillingPeriod("yearly")}
                      >
                        Yearly (Save 17%)
                      </Button>
                    </div>
                  </div>

                  {/* Pricing Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                      <Card 
                        key={plan.id} 
                        className={`relative ${plan.popular ? "border-accent shadow-lg" : ""}`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-accent text-white">Most Popular</Badge>
                          </div>
                        )}
                        <CardHeader className="text-center">
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <div className="text-3xl font-bold">
                            {formatPrice(plan.price)}
                            {plan.price > 0 && (
                              <span className="text-sm text-muted-foreground">
                                /{billingPeriod === "monthly" ? "month" : "year"}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button 
                            className="w-full"
                            variant={plan.popular ? "default" : "outline"}
                            onClick={() => setSelectedPlan(plan.id)}
                          >
                            {plan.id === "free" ? "Get Started" : "Choose Plan"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  {/* Analytics Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                      <p className="text-muted-foreground">Real-time insights into your subscription business</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={analyticsPeriod} onValueChange={(value: any) => setAnalyticsPeriod(value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="1y">Last year</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" onClick={() => setAutoRefresh(!autoRefresh)}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                        {autoRefresh ? 'Auto' : 'Manual'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowAlerts(!showAlerts)}>
                        <Bell className="w-4 h-4 mr-2" />
                        Alerts ({alerts.filter(a => !a.isRead).length})
                      </Button>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {analyticsMetrics.map((metric) => (
                      <Card key={metric.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-muted ${metric.color}`}>
                                {getMetricIcon(metric.icon)}
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">{metric.name}</p>
                                <p className="text-2xl font-bold">{formatCurrency(metric.value)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`flex items-center gap-1 text-sm ${
                                metric.changeType === 'increase' ? 'text-green-600' : 
                                metric.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {metric.changeType === 'increase' ? <TrendingUp className="w-4 h-4" /> : 
                                 metric.changeType === 'decrease' ? <TrendingDown className="w-4 h-4" /> : 
                                 <Minus className="w-4 h-4" />}
                                {Math.abs(metric.change)}%
                              </div>
                              <p className="text-xs text-muted-foreground">{metric.period}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Charts and Visualizations */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Revenue Trend */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <LineChart className="w-5 h-5" />
                          Revenue Trend
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                          <div className="text-center">
                            <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">Revenue chart visualization</p>
                            <p className="text-sm text-muted-foreground">MRR: {formatCurrency(revenueData[revenueData.length - 1].mrr)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Customer Segments */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PieChart className="w-5 h-5" />
                          Customer Segments
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {customerSegments.map((segment) => (
                            <div key={segment.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                                <div>
                                  <p className="font-medium">{segment.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatNumber(segment.count)} customers ({formatPercentage(segment.percentage)})
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatCurrency(segment.avgRevenue)}</p>
                                <p className="text-sm text-muted-foreground">ARPU</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Performance Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gauge className="w-5 h-5" />
                        Performance Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {performanceMetrics.map((metric) => (
                          <div key={metric.id} className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              {getTrendIcon(metric.trend)}
                              <span className={`text-2xl font-bold ${getPerformanceStatusColor(metric.status)}`}>
                                {metric.value}{metric.unit}
                              </span>
                            </div>
                            <p className="text-sm font-medium">{metric.name}</p>
                            <p className="text-xs text-muted-foreground">Target: {metric.target}{metric.unit}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Geographic Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Geographic Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {geographicData.map((geo) => (
                          <div key={geo.country} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{geo.country}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatNumber(geo.customers)} customers
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(geo.revenue)}</p>
                              <p className={`text-sm ${geo.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {geo.growth > 0 ? '+' : ''}{formatPercentage(geo.growth)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Billing History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {invoices.map((invoice) => (
                          <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div>
                                <h4 className="font-medium">{invoice.description}</h4>
                                <p className="text-sm text-muted-foreground">{invoice.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-medium">${invoice.amount}</span>
                              <Badge className={getInvoiceStatusColor(invoice.status)}>
                                {invoice.status}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5" />
                          <div>
                            <h4 className="font-medium">•••• •••• •••• 4242</h4>
                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="usage" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Detailed Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">API Usage</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Endpoints</span>
                              <span className="text-sm font-medium">{usage.apiEndpoints}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">SDK Languages</span>
                              <span className="text-sm font-medium">{usage.sdkLanguages}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">MCP Servers</span>
                              <span className="text-sm font-medium">{usage.mcpServers}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Terraform Providers</span>
                              <span className="text-sm font-medium">{usage.terraformProviders}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Team Usage</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Team Members</span>
                              <span className="text-sm font-medium">{usage.teamMembers}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Requests This Month</span>
                              <span className="text-sm font-medium">{usage.requestsThisMonth.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Average Response Time</span>
                              <span className="text-sm font-medium">120ms</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Uptime</span>
                              <span className="text-sm font-medium text-green-600">99.9%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="integration" className="space-y-6">
                  <Tabs defaultValue="webhook" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="webhook">Webhook</TabsTrigger>
                      <TabsTrigger value="stripe">Stripe</TabsTrigger>
                    </TabsList>

                    <TabsContent value="webhook">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Globe className="w-5 h-5" />
                              Webhook Integration
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(generateWebhookCode(), "webhook")}
                            >
                              {copiedCode === "webhook" ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-black rounded-lg p-4 overflow-x-auto">
                            <pre className="text-green-400 text-sm font-mono">
                              <code>{generateWebhookCode()}</code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="stripe">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-5 h-5" />
                              Stripe Integration
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(generateStripeCode(), "stripe")}
                            >
                              {copiedCode === "stripe" ? (
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
                              <code>{generateStripeCode()}</code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Panel */}
      {showAlerts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  System Alerts
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAlerts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border rounded-lg ${
                    alert.isRead ? 'bg-muted/50' : 'bg-background'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        alert.severity === 'critical' ? 'bg-red-100 text-red-600' :
                        alert.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={getAlertSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            {alert.actionRequired && (
                              <Badge variant="outline" className="text-orange-600 border-orange-600">
                                Action Required
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                          <div className="flex gap-2">
                            {!alert.isRead && (
                              <Button variant="outline" size="sm">
                                Mark as Read
                              </Button>
                            )}
                            {alert.actionRequired && (
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
        </div>
      )}
    </div>
  );
};
