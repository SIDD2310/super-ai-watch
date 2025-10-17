import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Bell, Users, Palette, Save } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [monitoringFrequency, setMonitoringFrequency] = useState('5');
  const [dataRetention, setDataRetention] = useState('90');
  const [autonomyMode, setAutonomyMode] = useState('semi');
  const [notificationChannel, setNotificationChannel] = useState('email');
  const [darkMode, setDarkMode] = useState(true);
  const [compactLayout, setCompactLayout] = useState(false);

  const handleSave = () => {
    toast({
      title: '✅ Settings Saved',
      description: 'Your preferences have been updated successfully.'
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and controls</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="general" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <SettingsIcon className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Bell className="w-4 h-4 mr-2" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="access" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Users className="w-4 h-4 mr-2" />
            Access Control
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Palette className="w-4 h-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">General Settings</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="monitoring">Default Monitoring Frequency</Label>
                <Select value={monitoringFrequency} onValueChange={setMonitoringFrequency}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="1">Every 1 minute</SelectItem>
                    <SelectItem value="5">Every 5 minutes</SelectItem>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  How often SuperAI checks agent performance
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention">Data Retention Policy</Label>
                <Select value={dataRetention} onValueChange={setDataRetention}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  How long to keep logs and metrics
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="autonomy">Supervisor Autonomy Mode</Label>
                <Select value={autonomyMode} onValueChange={setAutonomyMode}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="full">Full Autonomous - Auto-fix everything</SelectItem>
                    <SelectItem value="semi">Semi-Autonomous - Require approval</SelectItem>
                    <SelectItem value="manual">Manual Only - No auto-fixes</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Level of automation for incident resolution
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notifications">Notification Channel</Label>
                <Select value={notificationChannel} onValueChange={setNotificationChannel}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="all">All Channels</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Alert Thresholds</h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <Label>Success Rate Alert</Label>
                  <span className="text-sm text-muted-foreground">Threshold: &lt; 85%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Trigger alert when agent success rate drops below threshold
                </p>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <Label>Response Time Alert</Label>
                  <span className="text-sm text-muted-foreground">Threshold: &gt; 500ms</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Notify when average response time exceeds threshold
                </p>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <Label>Error Rate Alert</Label>
                  <span className="text-sm text-muted-foreground">Threshold: &gt; 5%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Alert when error rate increases significantly
                </p>
              </div>

              <div className="space-y-4 mt-6">
                <h4 className="font-semibold text-foreground">Escalation Chain</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg border border-accent/30">
                    <span className="text-accent font-bold">1.</span>
                    <span className="text-foreground">SuperAI Supervisor (Auto-diagnose)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border">
                    <span className="text-muted-foreground font-bold">2.</span>
                    <span className="text-foreground">Alex (AI Ops Manager)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border">
                    <span className="text-muted-foreground font-bold">3.</span>
                    <span className="text-foreground">Operations Team Lead</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Team Members</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">AJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Alex Johnson</div>
                    <div className="text-xs text-muted-foreground">alex@company.com</div>
                  </div>
                </div>
                <span className="text-sm px-3 py-1 bg-accent/20 text-accent rounded-full border border-accent/30">
                  Admin
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted/30 rounded-full flex items-center justify-center">
                    <span className="text-foreground font-bold">SM</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Sarah Martinez</div>
                    <div className="text-xs text-muted-foreground">sarah@company.com</div>
                  </div>
                </div>
                <span className="text-sm px-3 py-1 bg-muted/30 text-foreground rounded-full border border-border">
                  Operator
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted/30 rounded-full flex items-center justify-center">
                    <span className="text-foreground font-bold">DK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">David Kim</div>
                    <div className="text-xs text-muted-foreground">david@company.com</div>
                  </div>
                </div>
                <span className="text-sm px-3 py-1 bg-muted/30 text-muted-foreground rounded-full border border-border">
                  Viewer
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10">
              + Add Team Member
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Appearance Settings</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
                <div>
                  <Label htmlFor="darkMode" className="text-base font-semibold">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use dark theme for better visibility
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
                <div>
                  <Label htmlFor="compact" className="text-base font-semibold">Compact Layout</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reduce spacing for more information density
                  </p>
                </div>
                <Switch
                  id="compact"
                  checked={compactLayout}
                  onCheckedChange={setCompactLayout}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleSave}
          className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
