import { useState } from 'react';
import { Incident } from '@/types/agent';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { LogTerminal } from './LogTerminal';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface IncidentModalProps {
  incident: Incident | null;
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
}

export const IncidentModal = ({ incident, open, onClose, onApprove }: IncidentModalProps) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!incident) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-card border-accent/30 text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <AlertCircle className="text-destructive w-6 h-6 animate-pulse-glow" />
            Incident Detected: {incident.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Agent: {incident.agentName} • Detected: {incident.detectedAt.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Diagnosis Summary */}
          <div className="p-4 bg-muted/20 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-warning">⚠</span>
              Diagnosis Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Root Cause:</span>
                <p className="text-foreground mt-1">{incident.rootCause}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Impact:</span>
                <p className="text-foreground mt-1">{incident.impact}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Confidence:</span>
                <p className="text-accent font-bold mt-1">{incident.confidence}%</p>
              </div>
            </div>
          </div>

          {/* Proposed Fix */}
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="text-accent w-5 h-5" />
              Proposed Fix
            </h3>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground mb-2">
                Estimated Time: {incident.proposedFix.estimatedTime}
              </div>
              <ol className="space-y-2 text-sm">
                {incident.proposedFix.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent font-bold">{index + 1}.</span>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Diagnostic Logs */}
          {showDetails && (
            <div className="animate-slide-up">
              <h3 className="text-lg font-semibold mb-3">Diagnostic Logs</h3>
              <LogTerminal logs={incident.logs} />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="text-accent border-accent/30 hover:bg-accent/10"
            >
              {showDetails ? 'Hide Details' : '🔍 View Details'}
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-border hover:bg-muted/20"
              >
                ❌ Reject
              </Button>
              <Button
                onClick={onApprove}
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow"
              >
                ✅ Approve Fix
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
