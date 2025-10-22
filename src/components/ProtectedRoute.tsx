import { Navigate } from 'react-router-dom';
import { useAgentAuth } from '@/contexts/AgentAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAgentAuth();

  if (!isAuthenticated) {
    return <Navigate to="/agent-login" replace />;
  }

  return <>{children}</>;
};
