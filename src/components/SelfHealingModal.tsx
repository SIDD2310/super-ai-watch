import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { LogEntry } from '@/types/agent';
import { LogTerminal } from './LogTerminal';
import { CheckCircle2 } from 'lucide-react';

interface SelfHealingModalProps {
  open: boolean;
  onClose: () => void;
  agentName: string;
}

const healingLogs: LogEntry[] = [
  {
    timestamp: new Date(),
    message: 'Refreshing Chat Agent knowledge source...',
    type: 'info'
  },
  {
    timestamp: new Date(),
    message: 'Downloading refund_policy_v2.pdf from knowledge base...',
    type: 'info'
  },
  {
    timestamp: new Date(),
    message: 'Regenerating logic patch for refund policy...',
    type: 'info'
  },
  {
    timestamp: new Date(),
    message: 'Running validation tests (10 queries)...',
    type: 'info'
  },
  {
    timestamp: new Date(),
    message: 'Test 1/10: "What is your refund policy?" - ✓ PASS',
    type: 'success'
  },
  {
    timestamp: new Date(),
    message: 'Test 2/10: "Can I get a refund after 30 days?" - ✓ PASS',
    type: 'success'
  },
  {
    timestamp: new Date(),
    message: 'Test 10/10: "How do I request a refund?" - ✓ PASS',
    type: 'success'
  },
  {
    timestamp: new Date(),
    message: '✅ All tests passed (100% success rate)',
    type: 'success'
  },
  {
    timestamp: new Date(),
    message: '✅ System restored to stable state',
    type: 'success'
  }
];

export const SelfHealingModal = ({ open, onClose, agentName }: SelfHealingModalProps) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (open) {
      setIsComplete(false);
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, healingLogs.length * 500 + 1000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-card border-accent/30 text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            Self-Healing in Progress
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <p className="text-sm text-foreground">
              <span className="font-semibold text-accent">Supervisor AI:</span> "Alex, I'm now 
              executing the approved fix for {agentName}. This will take approximately 8 minutes. 
              I'll keep you updated on progress."
            </p>
          </div>

          <LogTerminal logs={healingLogs} />

          {isComplete && (
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 animate-slide-up">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-400 mb-2">Healing Complete</h3>
                  <p className="text-sm text-foreground">
                    {agentName} was using outdated policy information. I refreshed the source, 
                    revalidated responses, and confirmed full recovery. The agent is now operating 
                    at optimal performance with 100% test pass rate.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xs text-muted-foreground">MTTD</div>
                      <div className="text-lg font-bold text-accent">3.2 min</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">MTTR</div>
                      <div className="text-lg font-bold text-accent">7.8 min</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                      <div className="text-lg font-bold text-green-400">100%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              onClick={onClose}
              disabled={!isComplete}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isComplete ? 'Close' : 'Processing...'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
