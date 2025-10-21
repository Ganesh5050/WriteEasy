import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, CheckCircle, AlertCircle, X, ArrowLeft } from "lucide-react";

export const NotificationSystemSimple = () => {
  // Notification settings state
  const [enableRealTime, setEnableRealTime] = useState(true);
  const [enableSound, setEnableSound] = useState(true);
  const [enableDesktop, setEnableDesktop] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Handle saving notification settings
  const saveNotificationSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would save to localStorage or send to backend
    localStorage.setItem('notificationSettings', JSON.stringify({
      realTime: enableRealTime,
      sound: enableSound,
      desktop: enableDesktop
    }));
    
    // Show a brief success message (you could add a toast notification here)
    console.log('Notification settings saved:', {
      realTime: enableRealTime,
      sound: enableSound,
      desktop: enableDesktop
    });
    
    setIsSaving(false);
  };

  // Load saved settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setEnableRealTime(settings.realTime ?? true);
        setEnableSound(settings.sound ?? true);
        setEnableDesktop(settings.desktop ?? true);
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    }
  }, []);

  const notifications = [
    {
      id: "notif-1",
      type: "success",
      title: "API Generation Complete",
      message: "Your Python SDK has been successfully generated and is ready for download.",
      timestamp: "2024-01-17T10:30:00Z",
      isRead: false,
      priority: "medium"
    },
    {
      id: "notif-2",
      type: "warning",
      title: "High API Usage",
      message: "Your API requests are at 85% of monthly limit. Consider upgrading your plan.",
      timestamp: "2024-01-17T09:15:00Z",
      isRead: false,
      priority: "high"
    },
    {
      id: "notif-3",
      type: "info",
      title: "New Team Member Added",
      message: "Alice Brown has been added to your project team and can now collaborate.",
      timestamp: "2024-01-17T08:45:00Z",
      isRead: true,
      priority: "low"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning": return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "error": return <X className="w-4 h-4 text-red-500" />;
      case "info": return <Bell className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
            <h1 className="text-4xl font-serif font-normal mb-2 animate-stagger-1">Notifications & Activity</h1>
            <p className="text-muted-foreground animate-stagger-2">Stay updated with real-time notifications and activity feeds</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Notification Settings Sidebar */}
            <div className="space-y-6">
              <Card className="animate-stagger-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Quick Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="real-time" className="text-sm">Real-time Updates</Label>
                      <p className="text-xs text-muted-foreground">Enable real-time notifications</p>
                    </div>
                    <Switch 
                      id="real-time"
                      checked={enableRealTime}
                      onCheckedChange={setEnableRealTime}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sound" className="text-sm">Sound Notifications</Label>
                      <p className="text-xs text-muted-foreground">Play sound for new notifications</p>
                    </div>
                    <Switch 
                      id="sound"
                      checked={enableSound}
                      onCheckedChange={setEnableSound}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="desktop" className="text-sm">Desktop Notifications</Label>
                      <p className="text-xs text-muted-foreground">Show browser notifications</p>
                    </div>
                    <Switch 
                      id="desktop"
                      checked={enableDesktop}
                      onCheckedChange={setEnableDesktop}
                    />
                  </div>
                  
                  {/* Settings Summary */}
                  <div className="pt-4 border-t">
                    <div className="text-xs text-muted-foreground mb-2">Current Settings:</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${enableRealTime ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        Real-time: {enableRealTime ? 'On' : 'Off'}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${enableSound ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        Sound: {enableSound ? 'On' : 'Off'}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${enableDesktop ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        Desktop: {enableDesktop ? 'On' : 'Off'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <div className="pt-4">
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={saveNotificationSettings}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Settings'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-stagger-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
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
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="animate-stagger-5">
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
                              <div className="text-xs text-muted-foreground">
                                {formatDate(notification.timestamp)}
                              </div>
                              <div className="flex gap-2">
                                {!notification.isRead && (
                                  <Badge variant="outline" className="text-xs">
                                    Mark as Read
                                  </Badge>
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
          </div>
        </div>
      </div>
    </div>
  );
};
