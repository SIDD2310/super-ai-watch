import { useState, useEffect } from 'react';
import { allAgents } from '@/data/extendedMockData';
import { Agent } from '@/types/agent';
import { AgentDetailsModal } from '@/components/AgentDetailsModal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Search, Eye, Loader2, Pencil, Trash2 } from 'lucide-react';
import { useAgents } from '@/hooks/useAgents';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Agents = () => {
  const { agents: dbAgents, isLoading, deleteAgent } = useAgents();
  const { toast } = useToast();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);

  // Merge database agents with mock agents
  useEffect(() => {
    const mergedAgents: Agent[] = [];
    const seenIds = new Set<string>();

    // Add database agents first (they already have performance history from useAgents)
    dbAgents.forEach(agent => {
      mergedAgents.push(agent);
      seenIds.add(agent.id);
    });

    // Add mock agents (they already have performanceHistory in extendedMockData)
    allAgents.forEach(agent => {
      if (!seenIds.has(agent.id)) {
        mergedAgents.push(agent);
      }
    });

    setAgents(mergedAgents);
  }, [dbAgents]);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowDetailsModal(true);
  };

  const getCostPerDay = (totalRequests: number) => {
    return `$${(totalRequests * 0.0003).toFixed(2)}`;
  };

  const getIncidentCount = (status: Agent['status']) => {
    if (status === 'failed') return 2;
    if (status === 'warning') return 1;
    return 0;
  };

  const handleDelete = async () => {
    if (!agentToDelete) return;
    
    await deleteAgent(agentToDelete.id);
    setAgentToDelete(null);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Agents</h1>
        <p className="text-muted-foreground">Manage and monitor all deployed agents</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 bg-card border-border">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="healthy">Healthy</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="failed">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/20">
              <TableHead className="text-foreground">Agent Name</TableHead>
              <TableHead className="text-foreground">Function</TableHead>
              <TableHead className="text-foreground">Health</TableHead>
              <TableHead className="text-foreground">Success Rate</TableHead>
              <TableHead className="text-foreground">Cost/Day</TableHead>
              <TableHead className="text-foreground">Incidents</TableHead>
              <TableHead className="text-foreground">Last Update</TableHead>
              <TableHead className="text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id} className="border-border hover:bg-muted/10 cursor-pointer">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <span className="text-foreground">{agent.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{agent.description}</TableCell>
                <TableCell>
                  <StatusBadge status={agent.status} />
                </TableCell>
                <TableCell>
                  {agent.successRate === null || agent.successRate === undefined ? (
                    <span className="text-muted-foreground italic">Unknown</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className={agent.successRate >= 90 ? "text-green-400" : "text-warning"}>
                        {agent.successRate}%
                      </span>
                      <div className="w-16 h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div 
                          className={agent.successRate >= 90 ? "h-full bg-green-400" : "h-full bg-warning"}
                          style={{ width: `${agent.successRate}%` }}
                        />
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-foreground">{getCostPerDay(agent.totalRequests)}</TableCell>
                <TableCell>
                  <span className={getIncidentCount(agent.status) > 0 ? "text-destructive" : "text-muted-foreground"}>
                    {getIncidentCount(agent.status)}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(agent.lastUpdated).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewAgent(agent)}
                      className="border-accent/30 text-accent hover:bg-accent/10"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAgentToDelete(agent)}
                      className="border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      )}

      {!isLoading && filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No agents found matching your criteria.</p>
        </div>
      )}

      <AgentDetailsModal
        agent={selectedAgent}
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      />

      <AlertDialog open={!!agentToDelete} onOpenChange={() => setAgentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Agent</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{agentToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Agents;
