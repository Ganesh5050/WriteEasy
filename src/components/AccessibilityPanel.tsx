import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Accessibility, 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Contrast, 
  Type, 
  MousePointer, 
  Keyboard, 
  Focus,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  fontSize: number;
  volume: number;
}

export const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
    fontSize: 16,
    volume: 0.5
  });

  const [announcements, setAnnouncements] = useState<string[]>([]);

  // Apply accessibility settings to the document
  useEffect(() => {
    const root = document.documentElement;
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Font size
    root.style.fontSize = `${settings.fontSize}px`;

    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('focus-indicators');
    } else {
      root.classList.remove('focus-indicators');
    }

  }, [settings]);

  // Announce changes to screen readers
  const announce = (message: string) => {
    setAnnouncements(prev => [...prev, message]);
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 3000);
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Announce changes
    const settingNames: Record<string, string> = {
      highContrast: 'High contrast mode',
      largeText: 'Large text mode',
      reducedMotion: 'Reduced motion',
      screenReader: 'Screen reader support',
      keyboardNavigation: 'Keyboard navigation',
      focusIndicators: 'Focus indicators',
      fontSize: 'Font size',
      volume: 'Volume'
    };
    
    announce(`${settingNames[key]} ${typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : `set to ${value}`}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!settings.keyboardNavigation) return;

      // Alt + A to toggle accessibility panel
      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }

      // Escape to close panel
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, settings.keyboardNavigation]);

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 bg-background shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open accessibility settings"
      >
        <Accessibility className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <>
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>

      {/* Accessibility Panel */}
      <div className="fixed bottom-4 right-4 z-50 w-80 bg-background border rounded-lg shadow-lg">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Accessibility className="w-5 h-5" />
                Accessibility
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close accessibility settings"
              >
                ×
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Customize your experience for better accessibility
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visual Settings */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Visual Settings
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="text-sm">
                    High Contrast
                  </Label>
                  <Switch
                    id="high-contrast"
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="large-text" className="text-sm">
                    Large Text
                  </Label>
                  <Switch
                    id="large-text"
                    checked={settings.largeText}
                    onCheckedChange={(checked) => updateSetting('largeText', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-size" className="text-sm">
                    Font Size: {settings.fontSize}px
                  </Label>
                  <Slider
                    id="font-size"
                    min={12}
                    max={24}
                    step={1}
                    value={[settings.fontSize]}
                    onValueChange={([value]) => updateSetting('fontSize', value)}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="focus-indicators" className="text-sm">
                    Focus Indicators
                  </Label>
                  <Switch
                    id="focus-indicators"
                    checked={settings.focusIndicators}
                    onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Motion Settings */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Contrast className="w-4 h-4" />
                Motion Settings
              </h3>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion" className="text-sm">
                  Reduced Motion
                </Label>
                <Switch
                  id="reduced-motion"
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                />
              </div>
            </div>

            {/* Navigation Settings */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Keyboard className="w-4 h-4" />
                Navigation
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="keyboard-nav" className="text-sm">
                    Keyboard Navigation
                  </Label>
                  <Switch
                    id="keyboard-nav"
                    checked={settings.keyboardNavigation}
                    onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="screen-reader" className="text-sm">
                    Screen Reader Support
                  </Label>
                  <Switch
                    id="screen-reader"
                    checked={settings.screenReader}
                    onCheckedChange={(checked) => updateSetting('screenReader', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Audio Settings */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Audio
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="volume" className="text-sm">
                  Volume: {Math.round(settings.volume * 100)}%
                </Label>
                <Slider
                  id="volume"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[settings.volume]}
                  onValueChange={([value]) => updateSetting('volume', value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Keyboard Shortcuts
              </h3>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Open accessibility panel:</span>
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Alt + A</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Close panel:</span>
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Navigate:</span>
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Tab</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Activate:</span>
                  <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd>
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Status
              </h3>
              
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${settings.highContrast ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span>High Contrast: {settings.highContrast ? 'On' : 'Off'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${settings.largeText ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span>Large Text: {settings.largeText ? 'On' : 'Off'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${settings.keyboardNavigation ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span>Keyboard Nav: {settings.keyboardNavigation ? 'On' : 'Off'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
