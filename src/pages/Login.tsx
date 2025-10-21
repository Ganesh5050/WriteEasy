import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Loader2, Github, Chrome, Monitor, MessageCircle, UserPlus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (activeTab === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }
      if (!formData.name.trim()) {
        setError('Name is required');
        setIsLoading(false);
        return;
      }
    }

    try {
      if (activeTab === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name);
      }
      // Redirect to home page after successful login/register
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOAuthLogin = async (provider: 'google' | 'github' | 'microsoft' | 'discord') => {
    setIsLoading(true);
    setError(null);

    try {
      if (provider === 'google') {
        // Load Google Identity Services
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        script.onload = () => {
          // @ts-ignore
          if (window.google) {
            // @ts-ignore
            window.google.accounts.id.initialize({
              client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '872177698361-3lkqn96f8gduf87fp18lcqieulvttnqr.apps.googleusercontent.com',
              callback: handleGoogleCallback,
              auto_select: false,
              cancel_on_tap_outside: true,
              ux_mode: 'popup'
            });
            
            // @ts-ignore
            window.google.accounts.id.prompt();
          }
        };
        
        script.onerror = () => {
          console.error('Failed to load Google Identity Services');
          setError('Failed to load Google authentication');
          setIsLoading(false);
        };
      } else {
        // Handle GitHub, Microsoft, Discord OAuth
        const authUrl = getOAuthUrl(provider);
        window.location.href = authUrl;
      }
    } catch (error) {
      console.error(`${provider} OAuth Error:`, error);
      setError(`${provider} authentication failed`);
      setIsLoading(false);
    }
  };

  const getOAuthUrl = (provider: 'github' | 'microsoft' | 'discord') => {
    const baseUrl = window.location.origin;
    
    switch (provider) {
      case 'github':
        return `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${baseUrl}/auth/github/callback&scope=user:email`;
      case 'microsoft':
        return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${import.meta.env.VITE_MICROSOFT_CLIENT_ID}&response_type=code&redirect_uri=${baseUrl}/auth/microsoft/callback&scope=openid profile email`;
      case 'discord':
        return `https://discord.com/api/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&redirect_uri=${baseUrl}/auth/discord/callback&response_type=code&scope=identify email`;
      default:
        return '';
    }
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      const { credential } = response;
      console.log('Google callback received:', response);
      
      // Send the Google token to your backend
      const backendResponse = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential })
      });

      console.log('Backend response status:', backendResponse.status);
      const data = await backendResponse.json();
      console.log('Backend response data:', data);

      if (data.success) {
        // Store the token and user data
        localStorage.setItem('speakeasy_token', data.token);
        localStorage.setItem('speakeasy_user', JSON.stringify(data.user));
        
        // Redirect to home page
        window.location.href = '/';
      } else {
        throw new Error(data.error || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google callback error:', error);
      setError(`Google authentication failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center py-2">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-black rounded-lg shadow-xl border border-gray-700 animate-stagger-1">
          <div className="p-3">
            {/* Header */}
            <div className="text-center mb-3 animate-stagger-2">
              <h2 className="text-lg font-serif font-normal text-white mb-1">
                Welcome to writeasy
              </h2>
              <p className="text-gray-400 text-xs">
                Sign in to your account or create a new one
              </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="space-y-3">
              <TabsList className="grid w-full grid-cols-2 bg-gray-600 animate-stagger-3">
                <TabsTrigger 
                  value="login" 
                  className={`${activeTab === 'login' ? 'text-white' : 'text-gray-200'}`}
                  style={activeTab === 'login' ? { backgroundColor: 'black' } : { backgroundColor: 'transparent' }}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className={`${activeTab === 'register' ? 'text-white' : 'text-gray-200'}`}
                  style={activeTab === 'register' ? { backgroundColor: 'black' } : { backgroundColor: 'transparent' }}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-2">
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="animate-stagger-4">
                    <Label htmlFor="login-email" className="text-white text-xs font-medium mb-0.5 block">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-4 py-1 bg-black border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="animate-stagger-5">
                    <Label htmlFor="login-password" className="text-white text-xs font-medium mb-0.5 block">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-10 py-1 bg-black border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 animate-stagger-6">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="animate-stagger-6">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-white text-black hover:bg-gray-100 font-medium py-1 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center text-xs"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-center animate-stagger-7">
                    <Button variant="link" className="text-gray-400 hover:text-gray-300 text-sm p-0 h-auto">
                      Forgot your password?
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-2">
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="animate-stagger-4">
                    <Label htmlFor="register-name" className="text-white text-xs font-medium mb-0.5 block">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-4 py-1 bg-black border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="animate-stagger-5">
                    <Label htmlFor="register-email" className="text-white text-xs font-medium mb-0.5 block">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-4 py-1 bg-black border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="animate-stagger-6">
                    <Label htmlFor="register-password" className="text-white text-xs font-medium mb-0.5 block">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-10 py-1 bg-black border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="animate-stagger-7">
                    <Label htmlFor="register-confirm" className="text-white text-xs font-medium mb-0.5 block">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-10 py-1 bg-black border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 animate-stagger-8">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="animate-stagger-8">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-white text-black hover:bg-gray-100 font-medium py-1 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center text-xs"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-400 animate-stagger-9">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            {/* Social Login Section */}
            <div className="mt-3 animate-stagger-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black px-2 text-gray-400">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="w-full bg-black border-gray-600 text-white hover:bg-gray-700 animate-stagger-9 py-1 text-xs"
                  onClick={() => handleOAuthLogin("github")}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-black border-gray-600 text-white hover:bg-gray-700 animate-stagger-10 py-1 text-xs"
                  onClick={() => handleOAuthLogin("google")}
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="w-full bg-black border-gray-600 text-white hover:bg-gray-700 animate-stagger-11 py-1 text-xs"
                  onClick={() => handleOAuthLogin("microsoft")}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Microsoft
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-black border-gray-600 text-white hover:bg-gray-700 animate-stagger-12 py-1 text-xs"
                  onClick={() => handleOAuthLogin("discord")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord
                </Button>
              </div>
            </div>

            {/* Back to Home Link */}
            <div className="mt-3 text-center animate-stagger-13">
              <Link 
                to="/" 
                className="text-gray-400 hover:text-gray-300 text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
