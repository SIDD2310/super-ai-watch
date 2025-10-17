import { useState } from 'react';
import { allIncidents } from '@/data/extendedMockData';
import { Incident } from '@/types/agent';
import { IncidentModal } from '@/components/IncidentModal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const Incidents = () => {
  const [incidents] = useState(allIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  const getSeverityColor = (severity: Incident['severity']) => {
    switch (severity) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-accent/20 text-accent border-accent/30';
    }
  };

  const getSeverityIcon = (severity: Incident['severity']) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟠';
      case 'low': return '🟡';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Incident Management</h1>
        <p className="text-muted-foreground">Track and resolve agent incidents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-destructive/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Total Incidents</div>
              <div className="text-3xl font-bold text-foreground">{incidents.length}</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Avg Resolution Time</div>
              <div className="text-3xl font-bold text-foreground">7.8 min</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Auto-Resolved</div>
              <div className="text-3xl font-bold text-green-400">87%</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Incident List */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <Card
            key={incident.id}
            className={cn(
              "p-6 bg-gradient-card border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-glow",
              incident.severity === 'high' && "border-destructive/30",
              incident.severity === 'medium' && "border-warning/30"
            )}
            onClick={() => handleViewIncident(incident)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <span className="text-3xl">{getSeverityIcon(incident.severity)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{incident.title}</h3>
                    <Badge className={cn("text-xs border", getSeverityColor(incident.severity))}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Agent: {incident.agentName}</span>
                    <span>•</span>
                    <span>Detected: {incident.detectedAt.toLocaleString()}</span>
                    <span>•</span>
                    <span>Confidence: {incident.confidence}%</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-accent/30 text-accent hover:bg-accent/10"
              >
                View Details →
              </Button>
            </div>

            <div className="p-4 bg-muted/20 rounded-lg border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Root Cause</div>
                  <div className="text-sm text-foreground">{incident.rootCause}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Impact</div>
                  <div className="text-sm text-foreground">{incident.impact}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Fix proposed • {incident.proposedFix.estimatedTime}</span>
            </div>
          </Card>
        ))}
      </div>

      <IncidentModal
        incident={selectedIncident}
        open={showModal}
        onClose={() => setShowModal(false)}
        onApprove={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default Incidents;
