import { NavLink } from 'react-router-dom';
import { Activity, Bot, Plus, AlertTriangle, BarChart3, Settings, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const navItems = [
    { to: '/landing', icon: Home, label: 'Home', emoji: '🏡' },
    { to: '/dashboard', icon: Activity, label: 'Dashboard', emoji: '🏠' },
    { to: '/agents', icon: Bot, label: 'Agents', emoji: '🤖' },
    { to: '/create', icon: Plus, label: 'Create Agent', emoji: '➕' },
    { to: '/incidents', icon: AlertTriangle, label: 'Incidents', emoji: '⚠️' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics', emoji: '📈' },
    { to: '/settings', icon: Settings, label: 'Settings', emoji: '⚙️' },
  ];

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-accent animate-pulse-glow" />
            <div>
              <h1 className="text-xl font-bold text-foreground">SuperAI</h1>
              <p className="text-xs text-muted-foreground">Supervisor Control Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                    'hover:bg-accent/10 hover:text-accent',
                    isActive
                      ? 'bg-accent text-accent-foreground font-semibold'
                      : 'text-muted-foreground'
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.emoji}</span>
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow" />
            <span className="text-sm font-medium text-green-400 hidden lg:inline">Operational</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
