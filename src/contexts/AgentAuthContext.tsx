import React, { createContext, useContext, useState, useEffect } from 'react';

interface AgentAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AgentAuthContext = createContext<AgentAuthContextType | undefined>(undefined);

export const AgentAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('agentAuth') === 'true';
  });

  const login = (username: string, password: string): boolean => {
    if (username === 'SXSW2025' && password === 'SuperAI') {
      setIsAuthenticated(true);
      sessionStorage.setItem('agentAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('agentAuth');
  };

  return (
    <AgentAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AgentAuthContext.Provider>
  );
};

export const useAgentAuth = () => {
  const context = useContext(AgentAuthContext);
  if (context === undefined) {
    throw new Error('useAgentAuth must be used within an AgentAuthProvider');
  }
  return context;
};
