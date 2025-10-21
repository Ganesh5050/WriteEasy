import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, Loader2, Github, Chrome, Monitor, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onModeChange: (mode: 'login' | 'register') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // For demo purposes, we'll use a default email
      await login('demo@writeasy.com', password);
      onClose();
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Invalid password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    console.log(`OAuth login with ${provider}`);
    // In a real app, this would redirect to OAuth provider
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-xl">
          <div className="p-6">
            {/* Header - Just "Password" */}
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium text-white">
                Password
              </h2>
            </div>

            {/* Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-gray-400 hover:text-gray-300 text-sm p-0 h-auto">
                  Forgot your password?
                </Button>
              </div>
            </form>

            {/* Social Login Section */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => handleOAuthLogin("github")}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => handleOAuthLogin("google")}
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => handleOAuthLogin("microsoft")}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Microsoft
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => handleOAuthLogin("discord")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};