import { Link } from "react-router-dom";
import { Monitor, Sun, Moon, Shield, ExternalLink, PenTool } from "lucide-react";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Gradient bar at top */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-purple-500"></div>
      
      {/* Background text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-8xl font-bold text-gray-900/20 select-none">
          Design.Develop.Distribute.
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Section - Company Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="writeasy logo" className="w-6 h-6" />
              <span className="font-semibold text-lg">writeasy</span>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Follow us on:</p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-sm font-bold">X</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-sm font-bold">in</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-sm font-bold">GH</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-sm font-bold">J</span>
                </a>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex bg-gray-700 rounded-lg p-2 border border-gray-600 w-[240px]" style={{marginLeft: '-40px'}}>
              <button
                onClick={() => setTheme("system")}
                className={`flex items-center justify-center gap-1 px-3 py-2 rounded text-xs transition-all duration-200 ${
                  theme === "system" 
                    ? "bg-white text-black shadow-sm" 
                    : "text-gray-300 hover:text-white hover:bg-gray-600"
                }`}
                style={{width: '80px'}}
              >
                <Monitor className="w-3 h-3" />
                System
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center gap-1 px-3 py-2 rounded text-xs transition-all duration-200 ${
                  theme === "light" 
                    ? "bg-white text-black shadow-sm" 
                    : "text-gray-300 hover:text-white hover:bg-gray-600"
                }`}
                style={{width: '80px'}}
              >
                <Sun className="w-3 h-3" />
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center gap-1 px-3 py-2 rounded text-xs transition-all duration-200 ${
                  theme === "dark" 
                    ? "bg-white text-black shadow-sm" 
                    : "text-gray-300 hover:text-white hover:bg-gray-600"
                }`}
                style={{width: '80px'}}
              >
                <Moon className="w-3 h-3" />
                Dark
              </button>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">SOC2 TYPEI</span>
            </div>

            {/* System Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-400">All Systems Normal</span>
            </div>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Products Column */}
            <div>
              <h3 className="font-semibold text-white mb-4">Products</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/products" className="hover:text-white transition-colors">Generate SDKs</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">API Docs</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Terraform Providers</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">MCP Servers</Link></li>
                <li>
                  <Link to="/products" className="hover:text-white transition-colors flex items-center gap-1">
                    Agent Tools
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/docs" className="hover:text-white transition-colors">Docs</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">Guides & examples</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">API Design Guide</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">OpenAPI Hub</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">MCP Hub</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">Our Blog</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/company" className="hover:text-white transition-colors">About writeasy</Link></li>
                <li><Link to="/customers" className="hover:text-white transition-colors">Customers</Link></li>
                <li><Link to="/company" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/company" className="hover:text-white transition-colors">Book A Demo</Link></li>
                <li><Link to="/company" className="hover:text-white transition-colors">We Are Hiring</Link></li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                    Roadmap
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                    Trust Center
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vulnerability Disclosure</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex justify-end">
          <p className="text-sm text-gray-400">Copyright © writeasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
