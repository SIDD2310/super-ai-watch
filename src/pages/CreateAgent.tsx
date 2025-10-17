import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const CreateAgent = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form state
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [dataSource, setDataSource] = useState('');
  const [responseStyle, setResponseStyle] = useState('');
  const [goalMetric, setGoalMetric] = useState('');
  const [selfMonitoring, setSelfMonitoring] = useState(true);
  const [alertSensitivity, setAlertSensitivity] = useState('medium');
  const [owner, setOwner] = useState('');
  const [fixPermissions, setFixPermissions] = useState('');

  const steps = [
    { number: 1, title: 'Basic Info', icon: '📝' },
    { number: 2, title: 'Configuration', icon: '⚙️' },
    { number: 3, title: 'Supervisor Integration', icon: '🤖' },
    { number: 4, title: 'Review & Launch', icon: '🚀' }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleDeploy = () => {
    toast({
      title: '🚀 Agent Deployed Successfully!',
      description: `${agentName} is now live and being monitored by SuperAI Supervisor.`
    });
    setTimeout(() => navigate('/agents'), 1500);
  };

  return (
    <div className="container max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Create New Agent</h1>
        <p className="text-muted-foreground">Design and deploy a new AI agent with supervisor oversight</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all",
                  step >= s.number
                    ? "bg-accent text-accent-foreground shadow-glow"
                    : "bg-muted/20 text-muted-foreground"
                )}>
                  {step > s.number ? <Check className="w-6 h-6" /> : s.icon}
                </div>
                <span className={cn(
                  "text-xs mt-2 text-center",
                  step >= s.number ? "text-foreground font-semibold" : "text-muted-foreground"
                )}>
                  {s.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-1 mx-2 rounded transition-all",
                  step > s.number ? "bg-accent" : "bg-muted/20"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-8 bg-gradient-card border-border">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Step 1: Basic Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="agentName">Agent Name *</Label>
              <Input
                id="agentName"
                placeholder="e.g., Customer Support Bot"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe what this agent does..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background border-border min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="research">Research & Analysis</SelectItem>
                  <SelectItem value="content">Content Generation</SelectItem>
                  <SelectItem value="code">Code Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Step 2: Configuration</h2>
            
            <div className="space-y-2">
              <Label htmlFor="model">Base Model *</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Choose base model" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  <SelectItem value="custom">Custom Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataSource">Data Source *</Label>
              <Input
                id="dataSource"
                placeholder="Upload URL or document name (e.g., knowledge_base_v3.pdf)"
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responseStyle">Response Style *</Label>
              <Select value={responseStyle} onValueChange={setResponseStyle}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select response style" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="analytical">Analytical</SelectItem>
                  <SelectItem value="empathetic">Empathetic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalMetric">Goal Metric *</Label>
              <Select value={goalMetric} onValueChange={setGoalMetric}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Define success metric" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="accuracy">Accuracy</SelectItem>
                  <SelectItem value="engagement">User Engagement</SelectItem>
                  <SelectItem value="revenue">Revenue Impact</SelectItem>
                  <SelectItem value="satisfaction">Customer Satisfaction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Step 3: Supervisor Integration</h2>
            
            <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent/30">
              <div>
                <Label htmlFor="selfMonitoring" className="text-base font-semibold">Enable Self-Monitoring</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Allow SuperAI Supervisor to monitor this agent's performance
                </p>
              </div>
              <Switch
                id="selfMonitoring"
                checked={selfMonitoring}
                onCheckedChange={setSelfMonitoring}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alertSensitivity">Alert Sensitivity</Label>
              <Select value={alertSensitivity} onValueChange={setAlertSensitivity}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="low">Low - Only critical failures</SelectItem>
                  <SelectItem value="medium">Medium - Standard monitoring</SelectItem>
                  <SelectItem value="high">High - Proactive detection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Assign Owner *</Label>
              <Select value={owner} onValueChange={setOwner}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="alex">Alex (AI Ops Manager)</SelectItem>
                  <SelectItem value="team">Operations Team</SelectItem>
                  <SelectItem value="engineering">Engineering Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fixPermissions">Fix Permissions *</Label>
              <Select value={fixPermissions} onValueChange={setFixPermissions}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select approval level" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="auto">Auto-Approve All Fixes</SelectItem>
                  <SelectItem value="review">Request Approval for Fixes</SelectItem>
                  <SelectItem value="manual">Manual Fix Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-4">Step 4: Review & Launch</h2>
            
            <Card className="p-6 bg-muted/20 border-border">
              <h3 className="font-semibold text-foreground mb-4">Agent Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground font-medium">{agentName || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="text-foreground font-medium">{category || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model:</span>
                  <span className="text-foreground font-medium">{model || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Source:</span>
                  <span className="text-foreground font-medium">{dataSource || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner:</span>
                  <span className="text-foreground font-medium">{owner || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Self-Monitoring:</span>
                  <span className="text-foreground font-medium">{selfMonitoring ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </Card>

            <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
              <p className="text-sm text-foreground">
                <span className="font-semibold text-accent">SuperAI Supervisor:</span> "Agent configuration looks good! 
                I'll monitor performance metrics, detect anomalies, and propose fixes automatically. Ready to deploy?"
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="border-border"
          >
            Back
          </Button>
          
          {step < 4 ? (
            <Button
              onClick={handleNext}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleDeploy}
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow"
            >
              🚀 Deploy Agent
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreateAgent;
