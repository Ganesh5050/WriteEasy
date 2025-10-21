import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const provider = window.location.pathname.split('/')[2]; // Extract provider from URL

        if (error) {
          setError(`OAuth error: ${error}`);
          setStatus('error');
          return;
        }

        if (!code) {
          setError('No authorization code received');
          setStatus('error');
          return;
        }

        // Send the code to backend
        const response = await fetch(`http://localhost:3001/api/auth/${provider}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code })
        });

        const data = await response.json();

        if (data.success) {
          // Store the token and user data
          localStorage.setItem('speakeasy_token', data.token);
          localStorage.setItem('speakeasy_user', JSON.stringify(data.user));
          
          setStatus('success');
          
          // Redirect to home page after a short delay
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setError(data.error || 'Authentication failed');
          setStatus('error');
        }
      } catch (err: any) {
        console.error('OAuth callback error:', err);
        setError(err.message || 'Authentication failed');
        setStatus('error');
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate]);

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-black rounded-lg shadow-xl border border-gray-700 p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
              <h2 className="text-xl font-serif font-normal text-white mb-2">
                Completing Authentication
              </h2>
              <p className="text-gray-400 text-sm">
                Please wait while we complete your login...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-serif font-normal text-white mb-2">
                Authentication Successful!
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                You have been successfully logged in. Redirecting to home page...
              </p>
              <Button
                onClick={() => navigate('/')}
                className="bg-white text-black hover:bg-gray-100"
              >
                Go to Home
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-serif font-normal text-white mb-2">
                Authentication Failed
              </h2>
              <p className="text-red-400 text-sm mb-4">
                {error || 'An error occurred during authentication'}
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full bg-white text-black hover:bg-gray-100"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Go to Home
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;
