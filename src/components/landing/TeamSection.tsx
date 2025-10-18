import { Github, Linkedin } from 'lucide-react';

const team = [
  {
    name: 'Siddharth Choudhury',
    role: 'Dev',
    description: 'Designs the self-healing logic, data pipelines, and orchestration layers powering SuperAI.',
    avatar: '🧑‍💻',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Shiney Zhang',
    role: 'Solution Architect',
    description: 'Crafts intuitive dashboards, motion design, and visualization systems.',
    avatar: '👩‍💻',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Maverick Cui',
    role: 'Product Manager',
    description: 'Builds the monitoring engines, API sync layer, and simulation backend.',
    avatar: '🧑‍🔬',
    linkedin: '#',
    github: '#',
  },
];

export const TeamSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Built by innovators <span className="gradient-text">redefining AI Operations</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="group glassmorphism rounded-2xl p-8 border border-accent/20 hover:border-accent/50 hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              <div className="text-center space-y-4">
                {/* Avatar */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>
                
                {/* Name & Role */}
                <div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-accent text-sm font-semibold">{member.role}</p>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.description}
                </p>
                
                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 pt-4">
                  <a
                    href={member.linkedin}
                    className="w-10 h-10 rounded-full glassmorphism border border-accent/30 flex items-center justify-center hover:border-accent hover:shadow-glow transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-accent" />
                  </a>
                  <a
                    href={member.github}
                    className="w-10 h-10 rounded-full glassmorphism border border-accent/30 flex items-center justify-center hover:border-accent hover:shadow-glow transition-all duration-300"
                  >
                    <Github className="w-5 h-5 text-accent" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
