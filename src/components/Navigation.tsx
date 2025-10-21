import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Download, BookOpen, Square, FileText, Hexagon, Server, PenTool, Code, Bot, MessageSquare, List, Calendar, User, AtSign, BarChart3, GitBranch, Bell, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle3D from "./ThemeToggle3D";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogoClick = () => {
    // Close any open dropdowns
    setActiveDropdown(null);
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-8 py-5">
        <div className="flex items-center">
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="flex items-center gap-2 hover:opacity-80 cursor-pointer"
          >
            <img 
              src="/logo.png" 
              alt="writeasy logo" 
              className="w-8 h-8" 
            />
            <span className="font-sans font-semibold text-lg text-white">
              writeasy
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 ml-[280px]">
            {/* Products Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => handleDropdownToggle('products')}
                className="text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none flex items-center gap-1"
              >
                Products
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Developer Experience */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">DEVELOPER EXPERIENCE</h3>
                        <div className="space-y-4">
                          <Link to="/sdk-generator" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <Download className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">SDKs</div>
                              <div className="text-sm text-gray-400">Build faster. Ship smarter</div>
                            </div>
                          </Link>
                          <Link to="/docs-generator" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">API Docs</div>
                              <div className="text-sm text-gray-400">Generate beautiful API docs</div>
                            </div>
                          </Link>
                          <Link to="/terraform-generator" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <Square className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">Terraform</div>
                              <div className="text-sm text-gray-400">Provision. Scale. Repeat.</div>
                            </div>
                          </Link>
                          <Link to="/docs" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">Documentation</div>
                              <div className="text-sm text-gray-400">Complete API reference</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Agentic Experience */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">AGENTIC EXPERIENCE</h3>
                        <div className="space-y-4">
                          <Link to="/gram" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <Hexagon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">Gram (Hosted MCP)</div>
                              <div className="text-sm text-gray-400">Build MCP faster with Gram</div>
                            </div>
                          </Link>
                          <Link to="/mcp-generator" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <Server className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">Self-hosted MCP</div>
                              <div className="text-sm text-gray-400">Generate your MCP server code</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customers Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => handleDropdownToggle('customers')}
                className="text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none flex items-center gap-1"
              >
                Customers
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'customers' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-6">
                    <div className="space-y-4">
                      <Link to="/dashboard" className="flex items-start gap-3 group">
                        <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Dashboard</div>
                          <div className="text-sm text-gray-400">Project overview and analytics</div>
                        </div>
                      </Link>
                      <Link to="/version-control" className="flex items-start gap-3 group">
                        <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <GitBranch className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Version Control</div>
                          <div className="text-sm text-gray-400">Git integration and management</div>
                        </div>
                      </Link>
                      <Link to="/notifications" className="flex items-start gap-3 group">
                        <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <Bell className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Notifications</div>
                          <div className="text-sm text-gray-400">Real-time alerts and updates</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => handleDropdownToggle('resources')}
                className="text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none flex items-center gap-1"
              >
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-8">
                    <div className="grid grid-cols-3 gap-12">
                      {/* Get Started */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">GET STARTED</h3>
                        <div className="space-y-8">
                          <Link to="/docs" className="flex items-start gap-4 group">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-base mb-1">Docs</div>
                              <div className="text-sm text-gray-400 leading-relaxed">Clear docs, fast answers</div>
                            </div>
                          </Link>
                          <Link to="/guides" className="flex items-start gap-4 group">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-base mb-1">Guides & examples</div>
                              <div className="text-sm text-gray-400 leading-relaxed">Build faster, ship smarter</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Design & Build */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">DESIGN & BUILD</h3>
                        <div className="space-y-8">
                          <Link to="/api-design-guide" className="flex items-start gap-4 group">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <PenTool className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-base mb-1">API Design Guide</div>
                              <div className="text-sm text-gray-400 leading-relaxed">Craft scalable APIs</div>
                            </div>
                          </Link>
                          <Link to="/openapi-hub" className="flex items-start gap-4 group">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <Code className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-base mb-1">OpenAPI Hub</div>
                              <div className="text-sm text-gray-400 leading-relaxed">OpenAPI demystified</div>
                            </div>
                          </Link>
                          <Link to="/mcp-hub" className="flex items-start gap-4 group">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-base mb-1">MCP Hub</div>
                              <div className="text-sm text-gray-400 leading-relaxed">Connect agents to tools</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Keep Updated */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">KEEP UPDATED</h3>
                        <div className="space-y-8">
                          <Link to="/resources" className="flex items-start gap-4 group">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-base mb-1">Resources</div>
                              <div className="text-sm text-gray-400 leading-relaxed">Guides and tutorials</div>
                            </div>
                          </Link>
                          <Link to="/docs" className="flex items-start gap-4 group">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <List className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-base mb-1">Documentation</div>
                              <div className="text-sm text-gray-400 leading-relaxed">API docs and guides</div>
                            </div>
                          </Link>
                          <Link to="/company" className="flex items-start gap-4 group">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <List className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-base mb-1">About Us</div>
                              <div className="text-sm text-gray-400 leading-relaxed">Our mission and values</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => handleDropdownToggle('company')}
                className="text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none flex items-center gap-1"
              >
                Company
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'company' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Team */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">TEAM</h3>
                        <div className="space-y-4">
                          <Link to="/about" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">About us</div>
                              <div className="text-sm text-gray-400">Our story, mission, and vision</div>
                            </div>
                          </Link>
                          <Link to="/careers" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">Careers</div>
                              <div className="text-sm text-gray-400">Join our team</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Get in Touch */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">GET IN TOUCH</h3>
                        <div className="space-y-4">
                          <Link to="/contact" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <AtSign className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">Contact Us</div>
                              <div className="text-sm text-gray-400">Let's chat</div>
                            </div>
                          </Link>
                          <Link to="/demo" className="flex items-start gap-3 group">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                              <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">Book a demo</div>
                              <div className="text-sm text-gray-400">Let's chat about your API needs</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/docs" 
              className="text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
            >
              Docs
            </Link>
            <Link 
              to="/pricing" 
              className="text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
            >
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4 ml-[100px]">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-sm font-medium text-white hover:text-accent hover:bg-gray-800/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" 
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  LOG OUT
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  className="text-sm font-medium text-white hover:text-accent hover:bg-gray-800/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" 
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  LOG IN
                </Button>
              </Link>
            )}
            <Link to="/login">
              <Button 
                className="text-sm font-medium bg-white text-black hover:bg-accent hover:text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                GET STARTED
              </Button>
            </Link>
            <div className="ml-2 transition-transform duration-300 hover:scale-110">
              <ThemeToggle3D />
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-800/50"
            >
              <div className="transition-transform duration-300 ease-in-out">
                {isMobileMenuOpen ? <X className="h-6 w-6 rotate-180" /> : <Menu className="h-6 w-6" />}
              </div>
          </Button>
            <div className="ml-3 transition-transform duration-300 hover:scale-110">
              <ThemeToggle3D />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="container mx-auto px-8 py-6 space-y-4">
            <div className="space-y-4">
              <Link 
                to="/products" 
                className="block text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-400">Customers</div>
                <div className="ml-4 space-y-3">
                  <Link 
                    to="/dashboard" 
                    className="block text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/version-control" 
                    className="block text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Version Control
                  </Link>
                  <Link 
                    to="/notifications" 
                    className="block text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Notifications
                  </Link>
                </div>
              </div>
              <Link 
                to="/resources" 
                className="block text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                to="/company" 
                className="block text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Company
              </Link>
              <Link 
                to="/docs" 
                className="block text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Docs
              </Link>
              <Link 
                to="/pricing" 
                className="block text-sm font-medium text-gray-400 hover:text-blue-500 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
            </div>
            
            <div className="pt-6 border-t border-gray-800 space-y-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <User className="w-4 h-4" />
                    <span>{user?.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full text-sm font-medium text-white hover:text-accent hover:bg-gray-800/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    LOG OUT
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm font-medium text-white hover:text-accent hover:bg-gray-800/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg" 
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      LOG IN
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      className="w-full text-sm font-medium bg-white text-black hover:bg-accent hover:text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      GET STARTED
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
