import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, AlertCircle, Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { config } from '@/config';

interface TestResult {
  success: boolean;
  status: string;
  message: string;
  testResponse?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model?: string;
  timestamp?: string;
  errorType?: string;
  error?: string;
  details?: string;
}

export const OpenAITest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const { token } = useAuth();

  const testOpenAI = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/openai/test', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({
        success: false,
        status: 'ERROR',
        message: 'Failed to connect to server',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'WORKING':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'DISABLED':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'ERROR':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'WORKING':
        return <Badge className="bg-green-500">Working</Badge>;
      case 'DISABLED':
        return <Badge variant="secondary">Disabled</Badge>;
      case 'ERROR':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            OpenAI API Key Test
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Test if your OpenAI API key is working correctly
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button 
            onClick={testOpenAI} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing API Key...
              </>
            ) : (
              'Test OpenAI API Key'
            )}
          </Button>

          {testResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(testResult.status)}
                  <span className="font-medium">{testResult.message}</span>
                </div>
                {getStatusBadge(testResult.status)}
              </div>

              {testResult.success && testResult.testResponse && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Test Response:</h4>
                  <p className="text-green-700">"{testResult.testResponse}"</p>
                </div>
              )}

              {testResult.usage && (
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium">{testResult.usage.prompt_tokens}</div>
                    <div className="text-muted-foreground">Prompt Tokens</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium">{testResult.usage.completion_tokens}</div>
                    <div className="text-muted-foreground">Completion Tokens</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium">{testResult.usage.total_tokens}</div>
                    <div className="text-muted-foreground">Total Tokens</div>
                  </div>
                </div>
              )}

              {testResult.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Error Details:</h4>
                  <p className="text-red-700 mb-2">{testResult.error}</p>
                  {testResult.errorType && (
                    <Badge variant="destructive" className="mr-2">
                      {testResult.errorType}
                    </Badge>
                  )}
                  {testResult.details && (
                    <p className="text-sm text-red-600 mt-2">{testResult.details}</p>
                  )}
                </div>
              )}

              {testResult.status === 'DISABLED' && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Setup Required:</h4>
                  <p className="text-yellow-700 mb-2">
                    To enable OpenAI features, create a <code>.env</code> file in the backend directory with:
                  </p>
                  <code className="block p-2 bg-yellow-100 rounded text-sm">
                    OPENAI_API_KEY=your_api_key_here
                  </code>
                </div>
              )}

              {testResult.timestamp && (
                <p className="text-xs text-muted-foreground">
                  Tested at: {new Date(testResult.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
