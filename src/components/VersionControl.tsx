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
  GitBranch, 
  GitCommit, 
  GitMerge, 
  GitPullRequest, 
  GitPush, 
  GitCompare, 
  History, 
  Clock, 
  User, 
  MessageSquare, 
  Tag, 
  Download, 
  Upload, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  Play,
  Pause,
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
  Star,
  Settings
} from "lucide-react";

interface GitCommit {
  id: string;
  hash: string;
  message: string;
  author: string;
  email: string;
  timestamp: string;
  branch: string;
  filesChanged: number;
  insertions: number;
  deletions: number;
  tags: string[];
}

interface GitBranch {
  id: string;
  name: string;
  isCurrent: boolean;
  isRemote: boolean;
  lastCommit: string;
  ahead: number;
  behind: number;
  protected: boolean;
}

interface GitRepository {
  id: string;
  name: string;
  url: string;
  description: string;
  isPrivate: boolean;
  defaultBranch: string;
  lastActivity: string;
  size: number;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  pullRequests: number;
}

interface GitPullRequest {
  id: string;
  title: string;
  description: string;
  author: string;
  sourceBranch: string;
  targetBranch: string;
  status: "open" | "closed" | "merged" | "draft";
  createdAt: string;
  updatedAt: string;
  reviewers: string[];
  labels: string[];
  filesChanged: number;
  commits: number;
  additions: number;
  deletions: number;
}

interface GitTag {
  id: string;
  name: string;
  message: string;
  commit: string;
  author: string;
  createdAt: string;
  isAnnotated: boolean;
}

interface GitConflict {
  id: string;
  file: string;
  status: "unmerged" | "both_added" | "both_modified" | "deleted_by_us" | "deleted_by_them";
  description: string;
  resolution: string;
}

interface GitHook {
  id: string;
  name: string;
  type: "pre-commit" | "pre-push" | "post-commit" | "pre-receive" | "post-receive";
  enabled: boolean;
  script: string;
  description: string;
}

export const VersionControl = () => {
  const [activeTab, setActiveTab] = useState("commits");
  const [selectedRepository, setSelectedRepository] = useState("main-repo");
  const [commitMessage, setCommitMessage] = useState("");
  const [branchName, setBranchName] = useState("");
  const [pullRequestTitle, setPullRequestTitle] = useState("");
  const [pullRequestDescription, setPullRequestDescription] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagMessage, setTagMessage] = useState("");
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [enableAutoCommit, setEnableAutoCommit] = useState(false);
  const [enableBranchProtection, setEnableBranchProtection] = useState(true);
  const [enableHooks, setEnableHooks] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Mock Data
  const repositories: GitRepository[] = [
    {
      id: "main-repo",
      name: "writeasy-platform",
      url: "https://github.com/writeasy/writeasy-platform",
      description: "AI-native API platform for developers",
      isPrivate: false,
      defaultBranch: "main",
      lastActivity: "2024-01-17T10:30:00Z",
      size: 125000,
      language: "TypeScript",
      stars: 1250,
      forks: 89,
      issues: 12,
      pullRequests: 5
    },
    {
      id: "docs-repo",
      name: "writeasy-docs",
      url: "https://github.com/writeasy/writeasy-docs",
      description: "Documentation and guides",
      isPrivate: false,
      defaultBranch: "main",
      lastActivity: "2024-01-16T15:45:00Z",
      size: 45000,
      language: "Markdown",
      stars: 89,
      forks: 23,
      issues: 3,
      pullRequests: 2
    },
    {
      id: "examples-repo",
      name: "writeasy-examples",
      url: "https://github.com/writeasy/writeasy-examples",
      description: "Code examples and tutorials",
      isPrivate: false,
      defaultBranch: "main",
      lastActivity: "2024-01-15T09:20:00Z",
      size: 78000,
      language: "Python",
      stars: 234,
      forks: 45,
      issues: 7,
      pullRequests: 3
    }
  ];

  const branches: GitBranch[] = [
    {
      id: "main",
      name: "main",
      isCurrent: true,
      isRemote: false,
      lastCommit: "feat: add AI model integration",
      ahead: 0,
      behind: 0,
      protected: true
    },
    {
      id: "develop",
      name: "develop",
      isCurrent: false,
      isRemote: false,
      lastCommit: "fix: resolve authentication issues",
      ahead: 2,
      behind: 1,
      protected: false
    },
    {
      id: "feature/auth",
      name: "feature/auth-enhancement",
      isCurrent: false,
      isRemote: false,
      lastCommit: "feat: add OAuth providers",
      ahead: 5,
      behind: 0,
      protected: false
    },
    {
      id: "hotfix/bug",
      name: "hotfix/critical-bug",
      isCurrent: false,
      isRemote: false,
      lastCommit: "fix: critical security vulnerability",
      ahead: 1,
      behind: 0,
      protected: false
    }
  ];

  const commits: GitCommit[] = [
    {
      id: "commit-1",
      hash: "a1b2c3d4",
      message: "feat: add AI model integration to MCP server",
      author: "John Doe",
      email: "john@writeasy.com",
      timestamp: "2024-01-17T10:30:00Z",
      branch: "main",
      filesChanged: 12,
      insertions: 450,
      deletions: 23,
      tags: ["v1.2.0"]
    },
    {
      id: "commit-2",
      hash: "e5f6g7h8",
      message: "fix: resolve authentication issues with OAuth",
      author: "Jane Smith",
      email: "jane@writeasy.com",
      timestamp: "2024-01-17T09:15:00Z",
      branch: "develop",
      filesChanged: 8,
      insertions: 120,
      deletions: 45,
      tags: []
    },
    {
      id: "commit-3",
      hash: "i9j0k1l2",
      message: "docs: update API documentation",
      author: "Bob Johnson",
      email: "bob@writeasy.com",
      timestamp: "2024-01-16T16:20:00Z",
      branch: "main",
      filesChanged: 5,
      insertions: 200,
      deletions: 12,
      tags: []
    },
    {
      id: "commit-4",
      hash: "m3n4o5p6",
      message: "feat: add real-time collaboration features",
      author: "Alice Brown",
      email: "alice@writeasy.com",
      timestamp: "2024-01-16T14:45:00Z",
      branch: "feature/collaboration",
      filesChanged: 15,
      insertions: 680,
      deletions: 89,
      tags: []
    },
    {
      id: "commit-5",
      hash: "q7r8s9t0",
      message: "fix: critical security vulnerability in auth system",
      author: "Charlie Wilson",
      email: "charlie@writeasy.com",
      timestamp: "2024-01-15T11:30:00Z",
      branch: "hotfix/security",
      filesChanged: 3,
      insertions: 45,
      deletions: 12,
      tags: ["v1.1.1"]
    }
  ];

  const pullRequests: GitPullRequest[] = [
    {
      id: "pr-1",
      title: "Add AI model integration to MCP server",
      description: "This PR adds comprehensive AI model integration to the MCP server generator, including support for OpenAI, Anthropic, Google, and other major AI providers.",
      author: "John Doe",
      sourceBranch: "feature/ai-integration",
      targetBranch: "main",
      status: "open",
      createdAt: "2024-01-17T10:30:00Z",
      updatedAt: "2024-01-17T10:30:00Z",
      reviewers: ["Jane Smith", "Bob Johnson"],
      labels: ["enhancement", "ai", "mcp"],
      filesChanged: 12,
      commits: 3,
      additions: 450,
      deletions: 23
    },
    {
      id: "pr-2",
      title: "Fix authentication issues with OAuth providers",
      description: "Resolves several authentication issues with OAuth providers including GitHub, Google, and Microsoft.",
      author: "Jane Smith",
      sourceBranch: "fix/oauth-auth",
      targetBranch: "develop",
      status: "merged",
      createdAt: "2024-01-16T15:45:00Z",
      updatedAt: "2024-01-17T09:15:00Z",
      reviewers: ["John Doe", "Alice Brown"],
      labels: ["bug", "auth", "oauth"],
      filesChanged: 8,
      commits: 2,
      additions: 120,
      deletions: 45
    },
    {
      id: "pr-3",
      title: "Add real-time collaboration features",
      description: "Implements real-time collaboration features including live editing, presence indicators, and team chat.",
      author: "Alice Brown",
      sourceBranch: "feature/collaboration",
      targetBranch: "develop",
      status: "open",
      createdAt: "2024-01-16T14:45:00Z",
      updatedAt: "2024-01-16T14:45:00Z",
      reviewers: ["John Doe", "Bob Johnson", "Charlie Wilson"],
      labels: ["enhancement", "collaboration", "real-time"],
      filesChanged: 15,
      commits: 5,
      additions: 680,
      deletions: 89
    }
  ];

  const tags: GitTag[] = [
    {
      id: "tag-1",
      name: "v1.2.0",
      message: "Release version 1.2.0 with AI model integration",
      commit: "a1b2c3d4",
      author: "John Doe",
      createdAt: "2024-01-17T10:30:00Z",
      isAnnotated: true
    },
    {
      id: "tag-2",
      name: "v1.1.1",
      message: "Hotfix release for security vulnerability",
      commit: "q7r8s9t0",
      author: "Charlie Wilson",
      createdAt: "2024-01-15T11:30:00Z",
      isAnnotated: true
    },
    {
      id: "tag-3",
      name: "v1.1.0",
      message: "Release version 1.1.0 with enhanced authentication",
      commit: "m3n4o5p6",
      author: "Alice Brown",
      createdAt: "2024-01-10T14:20:00Z",
      isAnnotated: true
    }
  ];

  const conflicts: GitConflict[] = [
    {
      id: "conflict-1",
      file: "src/components/AuthSystem.tsx",
      status: "both_modified",
      description: "Both branches modified the same lines in the authentication system",
      resolution: "Manual resolution required"
    },
    {
      id: "conflict-2",
      file: "src/lib/utils.ts",
      status: "both_added",
      description: "Both branches added the same utility function",
      resolution: "Keep both versions with different names"
    }
  ];

  const hooks: GitHook[] = [
    {
      id: "hook-1",
      name: "Pre-commit Linting",
      type: "pre-commit",
      enabled: true,
      script: "npm run lint",
      description: "Run ESLint before committing"
    },
    {
      id: "hook-2",
      name: "Pre-commit Tests",
      type: "pre-commit",
      enabled: true,
      script: "npm run test",
      description: "Run tests before committing"
    },
    {
      id: "hook-3",
      name: "Pre-push Security Scan",
      type: "pre-push",
      enabled: true,
      script: "npm run security-scan",
      description: "Run security scan before pushing"
    },
    {
      id: "hook-4",
      name: "Post-commit Notification",
      type: "post-commit",
      enabled: false,
      script: "npm run notify-team",
      description: "Notify team about new commits"
    }
  ];

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-800";
      case "closed": return "bg-red-100 text-red-800";
      case "merged": return "bg-purple-100 text-purple-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getConflictStatusColor = (status: string) => {
    switch (status) {
      case "unmerged": return "bg-red-100 text-red-800";
      case "both_added": return "bg-yellow-100 text-yellow-800";
      case "both_modified": return "bg-orange-100 text-orange-800";
      case "deleted_by_us": return "bg-blue-100 text-blue-800";
      case "deleted_by_them": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const generateGitCommands = () => {
    return `# Git Commands for writeasy Platform

## Repository Management
git clone https://github.com/writeasy/writeasy-platform.git
git remote add origin https://github.com/writeasy/writeasy-platform.git
git remote -v

## Branch Management
git branch -a                    # List all branches
git checkout -b feature/new-feature  # Create and switch to new branch
git branch -d feature/old-feature    # Delete local branch
git push origin --delete feature/old-feature  # Delete remote branch

## Commit Management
git add .                        # Stage all changes
git commit -m "feat: add new feature"  # Commit with message
git commit --amend -m "fix: updated commit message"  # Amend last commit
git log --oneline               # View commit history
git log --graph --oneline --all # Visual commit history

## Pull Request Workflow
git checkout main               # Switch to main branch
git pull origin main            # Pull latest changes
git checkout -b feature/my-feature  # Create feature branch
# Make changes...
git add .                       # Stage changes
git commit -m "feat: implement new feature"  # Commit changes
git push origin feature/my-feature  # Push feature branch
# Create pull request on GitHub

## Tag Management
git tag -a v1.2.0 -m "Release version 1.2.0"  # Create annotated tag
git push origin v1.2.0          # Push tag to remote
git tag -l                      # List all tags
git show v1.2.0                 # Show tag details

## Conflict Resolution
git status                       # Check for conflicts
git diff                         # View differences
git mergetool                    # Use merge tool
git add resolved-file.txt       # Mark conflict as resolved
git commit -m "fix: resolve merge conflict"  # Complete merge

## Advanced Git
git stash                       # Stash current changes
git stash pop                   # Apply stashed changes
git rebase -i HEAD~3            # Interactive rebase
git cherry-pick <commit-hash>   # Cherry-pick commit
git bisect start                # Start bisect for bug finding
git bisect good <commit-hash>   # Mark commit as good
git bisect bad <commit-hash>    # Mark commit as bad`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-normal mb-2">Version Control</h1>
            <p className="text-muted-foreground">Manage your Git repositories, branches, commits, and pull requests</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Repository Sidebar */}
            <div className="space-y-6">
              {/* Repository Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Repositories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {repositories.map((repo) => (
                    <div 
                      key={repo.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedRepository === repo.id 
                          ? 'border-accent bg-accent/5' 
                          : 'border-border hover:border-accent/50'
                      }`}
                      onClick={() => setSelectedRepository(repo.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{repo.name}</h4>
                        <Badge variant={repo.isPrivate ? "destructive" : "secondary"}>
                          {repo.isPrivate ? "Private" : "Public"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          {repo.defaultBranch}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileCode className="w-3 h-3" />
                          {repo.language}
                        </span>
                        <span className="flex items-center gap-1">
                          <Database className="w-3 h-3" />
                          {formatFileSize(repo.size)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          {repo.forks}
                        </span>
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {repo.issues}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitPullRequest className="w-3 h-3" />
                          {repo.pullRequests}
                        </span>
                      </div>
                    </div>
                  ))}
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
                    <GitCommit className="w-4 h-4 mr-2" />
                    New Commit
                  </Button>
                  <Button className="w-full" variant="outline">
                    <GitBranch className="w-4 h-4 mr-2" />
                    Create Branch
                  </Button>
                  <Button className="w-full" variant="outline">
                    <GitPullRequest className="w-4 h-4 mr-2" />
                    New Pull Request
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Tag className="w-4 h-4 mr-2" />
                    Create Tag
                  </Button>
                </CardContent>
              </Card>

              {/* Git Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Git Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-commit">Auto Commit</Label>
                      <p className="text-sm text-muted-foreground">Automatically commit changes</p>
                    </div>
                    <Switch 
                      id="auto-commit"
                      checked={enableAutoCommit}
                      onCheckedChange={setEnableAutoCommit}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="branch-protection">Branch Protection</Label>
                      <p className="text-sm text-muted-foreground">Protect main branches</p>
                    </div>
                    <Switch 
                      id="branch-protection"
                      checked={enableBranchProtection}
                      onCheckedChange={setEnableBranchProtection}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="hooks">Git Hooks</Label>
                      <p className="text-sm text-muted-foreground">Enable Git hooks</p>
                    </div>
                    <Switch 
                      id="hooks"
                      checked={enableHooks}
                      onCheckedChange={setEnableHooks}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="commits">Commits</TabsTrigger>
                  <TabsTrigger value="branches">Branches</TabsTrigger>
                  <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
                  <TabsTrigger value="tags">Tags</TabsTrigger>
                  <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
                </TabsList>

                <TabsContent value="commits" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GitCommit className="w-5 h-5" />
                        Recent Commits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {commits.map((commit) => (
                          <div key={commit.id} className="p-4 border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                <User className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{commit.message}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {commit.hash.substring(0, 7)}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                  <span>{commit.author}</span>
                                  <span>•</span>
                                  <span>{formatDate(commit.timestamp)}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <GitBranch className="w-3 h-3" />
                                    {commit.branch}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <FileCode className="w-3 h-3" />
                                    {commit.filesChanged} files
                                  </span>
                                  <span className="text-green-600">+{commit.insertions}</span>
                                  <span className="text-red-600">-{commit.deletions}</span>
                                  {commit.tags.length > 0 && (
                                    <div className="flex gap-1">
                                      {commit.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                          <Tag className="w-3 h-3 mr-1" />
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="branches" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GitBranch className="w-5 h-5" />
                        Branches
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {branches.map((branch) => (
                          <div key={branch.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <GitBranch className="w-4 h-4" />
                                <span className="font-medium">{branch.name}</span>
                                {branch.isCurrent && (
                                  <Badge variant="default" className="text-xs">Current</Badge>
                                )}
                                {branch.protected && (
                                  <Badge variant="destructive" className="text-xs">Protected</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{branch.lastCommit}</span>
                              {branch.ahead > 0 && (
                                <span className="text-green-600">↑{branch.ahead}</span>
                              )}
                              {branch.behind > 0 && (
                                <span className="text-red-600">↓{branch.behind}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pull-requests" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GitPullRequest className="w-5 h-5" />
                        Pull Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pullRequests.map((pr) => (
                          <div key={pr.id} className="p-4 border rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                                <User className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{pr.title}</h4>
                                  <Badge className={getStatusColor(pr.status)}>
                                    {pr.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{pr.description}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                  <span>{pr.author}</span>
                                  <span>•</span>
                                  <span>{formatDate(pr.createdAt)}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <GitBranch className="w-3 h-3" />
                                    {pr.sourceBranch} → {pr.targetBranch}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <FileCode className="w-3 h-3" />
                                    {pr.filesChanged} files
                                  </span>
                                  <span className="text-green-600">+{pr.additions}</span>
                                  <span className="text-red-600">-{pr.deletions}</span>
                                  <span className="flex items-center gap-1">
                                    <GitCommit className="w-3 h-3" />
                                    {pr.commits} commits
                                  </span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                  {pr.labels.map((label) => (
                                    <Badge key={label} variant="secondary" className="text-xs">
                                      {label}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tags" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {tags.map((tag) => (
                          <div key={tag.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Tag className="w-4 h-4" />
                              <div>
                                <h4 className="font-medium">{tag.name}</h4>
                                <p className="text-sm text-muted-foreground">{tag.message}</p>
                              </div>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <div>{tag.author}</div>
                              <div>{formatDate(tag.createdAt)}</div>
                              <div className="text-xs">{tag.commit.substring(0, 7)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="conflicts" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Merge Conflicts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {conflicts.map((conflict) => (
                          <div key={conflict.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{conflict.file}</h4>
                              <Badge className={getConflictStatusColor(conflict.status)}>
                                {conflict.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{conflict.description}</p>
                            <p className="text-sm text-muted-foreground">{conflict.resolution}</p>
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
