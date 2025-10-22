import { Agent } from '@/types/agent';
import { StatusBadge } from './StatusBadge';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
  hasAlert?: boolean;
}

export const AgentCard = ({ agent, onClick, hasAlert }: AgentCardProps) => {
  return null;
};
