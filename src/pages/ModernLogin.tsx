import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Loader2, Github, Chrome, ArrowRight, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { config } from '../config';

const ModernLogin = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [step, setStep] = useState<'login' | 'register'>('login');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    console.log('Attempting login with:', { email, password: '***' });

    try {
      await login(email, password);
      console.log('Login successful!');
      setSuccess('Successfully signed in! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and last name are required');
      setIsLoading(false);
      return;
    }

    console.log('Attempting registration with:', { email, firstName, lastName, password: '***' });

    try {
      const fullName = `${firstName} ${lastName}`;
      await register(email, password, fullName);
      console.log('Registration successful!');
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
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
          setError('Failed to load Google authentication');
          setIsLoading(false);
        };
      } else {
        // Handle other OAuth providers
        const authUrl = getOAuthUrl(provider);
        window.location.href = authUrl;
      }
    } catch (error) {
      setError(`${provider} authentication failed`);
      setIsLoading(false);
    }
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      const { credential } = response;
      
      const backendResponse = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credential })
      });

      const data = await backendResponse.json();

      if (data.success) {
        localStorage.setItem('speakeasy_token', data.token);
        localStorage.setItem('speakeasy_user', JSON.stringify(data.user));
        window.location.href = '/';
      } else {
        throw new Error(data.error || 'Google authentication failed');
      }
    } catch (error) {
      setError(`Google authentication failed: ${error.message}`);
    } finally {
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

  const resetFlow = () => {
    setStep('login');
    setIsSignUp(false);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-black">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 font-serif">
            {step === 'register' ? 'Sign up' : 'Sign in'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 'register' ? 'Create your account to get started' : 'Sign in to your account'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          {step === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 selection:bg-blue-100 selection:text-gray-900"
                  placeholder="Your email address"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-md py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 mt-4">
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              )}

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('register')}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>
          )}

          {step === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 selection:bg-blue-100 selection:text-gray-900"
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 selection:bg-blue-100 selection:text-gray-900"
                    placeholder="Your last name"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 selection:bg-blue-100 selection:text-gray-900"
                  placeholder="Your email address"
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 selection:bg-blue-100 selection:text-gray-900"
                  placeholder="Create your password (min 6 chars)"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-md py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 mt-4">
                  <p className="text-sm text-green-600">{success}</p>
                </div>
              )}

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          )}

          {/* Social Login for Sign In */}
          {step === 'login' && (
            <>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 rounded-md text-gray-900 hover:text-gray-900 font-medium transition-all duration-200"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={isLoading}
                  >
                    <Chrome className="w-4 h-4 mr-2 text-gray-700" />
                    Continue with Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 rounded-md text-gray-900 hover:text-gray-900 font-medium transition-all duration-200"
                    onClick={() => handleOAuthLogin('github')}
                    disabled={isLoading}
                  >
                    <Github className="w-4 h-4 mr-2 text-gray-700" />
                    Continue with GitHub
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Social Login for Sign Up */}
          {step === 'register' && (
            <>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 rounded-md text-gray-900 hover:text-gray-900 font-medium transition-all duration-200"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={isLoading}
                  >
                    <Chrome className="w-4 h-4 mr-2 text-gray-700" />
                    Continue with Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 rounded-md text-gray-900 hover:text-gray-900 font-medium transition-all duration-200"
                    onClick={() => handleOAuthLogin('github')}
                    disabled={isLoading}
                  >
                    <Github className="w-4 h-4 mr-2 text-gray-700" />
                    Continue with GitHub
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Sign Up/Sign In Links */}
          <div className="mt-6 text-center">
            {step === 'register' ? (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setStep('login');
                    setIsSignUp(false);
                    resetFlow();
                  }}
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setStep('register');
                    setIsSignUp(true);
                  }}
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-left">
          <p className="text-sm text-gray-600">
            {step === 'register' 
              ? 'By creating an account, you agree to the Terms of Service and Privacy Policy'
              : 'Terms of Service and Privacy Policy'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModernLogin;
