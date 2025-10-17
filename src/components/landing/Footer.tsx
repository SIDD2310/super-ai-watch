import { Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-accent/20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="text-2xl font-bold gradient-text">SuperAI</span>
          </div>
          
          {/* Copyright */}
          <p className="text-muted-foreground">
            © 2025 SuperAI — built by Siddharth Choudhury, Shiney Zhang, and Maverick Cui
          </p>
          
          {/* Hackathon Badge */}
          <div className="inline-block glassmorphism rounded-full px-6 py-3 border border-accent/30">
            <p className="text-sm text-muted-foreground">
              Made for the <span className="text-accent font-semibold">SXSW Sydney Hackathon × Build Club</span>
              <br />
              <span className="text-xs">Supercharging Work with AI 2025</span>
            </p>
          </div>
          
          {/* Tech Stack */}
          <div className="pt-6">
            <p className="text-xs text-muted-foreground">
              Built with ❤️ using{' '}
              <span className="text-accent">Relevance AI</span>
              {' · '}
              <span className="text-accent">GPT-5</span>
              {' · '}
              <span className="text-accent">React</span>
              {' · '}
              <span className="text-accent">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
