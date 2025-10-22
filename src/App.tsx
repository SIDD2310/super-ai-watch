import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { AgentAuthProvider } from "@/contexts/AgentAuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Agents from "./pages/Agents";
import CreateAgent from "./pages/CreateAgent";
import AgentLogin from "./pages/AgentLogin";
import Incidents from "./pages/Incidents";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AgentAuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<><Navigation /><Index /></>} />
            <Route path="/agents" element={<><Navigation /><Agents /></>} />
            <Route path="/agent-login" element={<AgentLogin />} />
            <Route path="/create" element={
              <ProtectedRoute>
                <><Navigation /><CreateAgent /></>
              </ProtectedRoute>
            } />
            <Route path="/incidents" element={<><Navigation /><Incidents /></>} />
            <Route path="/analytics" element={<><Navigation /><Analytics /></>} />
            <Route path="/settings" element={<><Navigation /><Settings /></>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AgentAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
