import React from 'react';
import { TOOLS } from '../constants';
import { ToolDefinition } from '../types';
import { Logo } from './Logo';
import { 
  Trophy, BarChart2, Briefcase, ClipboardCheck, AlertTriangle, Scale, TrendingDown, Hammer, Rocket, BookOpen, 
  Terminal, ChevronRight, User, Shield
} from 'lucide-react';

interface DashboardProps {
  onSelectTool: (tool: ToolDefinition) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectTool }) => {
   const getIcon = (iconName: string) => {
    // Icons are now strictly white or gold for high contrast
    const iconClass = "text-[#EFBF04]"; 
    switch (iconName) {
      case 'Trophy': return <Trophy strokeWidth={1.5} size={24} className={iconClass} />;
      case 'BarChart2': return <BarChart2 strokeWidth={1.5} size={24} className={iconClass} />;
      case 'Briefcase': return <Briefcase strokeWidth={1.5} size={24} className={iconClass} />;
      case 'ClipboardCheck': return <ClipboardCheck strokeWidth={1.5} size={24} className={iconClass} />;
      case 'AlertTriangle': return <AlertTriangle strokeWidth={1.5} size={24} className={iconClass} />;
      case 'Scale': return <Scale strokeWidth={1.5} size={24} className={iconClass} />;
      case 'TrendingDown': return <TrendingDown strokeWidth={1.5} size={24} className={iconClass} />;
      case 'Hammer': return <Hammer strokeWidth={1.5} size={24} className={iconClass} />;
      case 'Rocket': return <Rocket strokeWidth={1.5} size={24} className={iconClass} />;
      case 'BookOpen': return <BookOpen strokeWidth={1.5} size={24} className={iconClass} />;
      default: return <Terminal strokeWidth={1.5} size={24} className={iconClass} />;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      
      <div>
        {/* COMMAND HEADER - SYSTEM INTRO */}
        <div className="border-b-2 border-[#094E2E] bg-black/40 backdrop-blur-md pt-16 pb-12 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
              
              {/* Identity Block */}
              <div className="relative pl-6 md:pl-8 border-l-4 border-[#EFBF04]">
                <div className="absolute -left-[11px] top-0 w-4 h-1 bg-[#EFBF04]"></div>
                <div className="absolute -left-[11px] bottom-0 w-4 h-1 bg-[#EFBF04]"></div>
                
                <Logo className="h-20 w-20 mb-6 text-[#EFBF04]" />

                <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-5">
                  VentureSwords
                </h1>
                
                <p className="max-w-2xl text-zinc-400 font-medium text-sm md:text-lg leading-relaxed uppercase">
                  Tactical Valuation Engine. <span className="text-[#EFBF04]">Engineered</span> for the precise evaluation of deep-tech and dual-use assets within the Saudi ecosystem. Bridging the valley of death from <span className="text-white font-bold">TRL 1 to 7</span> with sovereign capital intelligence.
                </p>
              </div>

              {/* Status Block */}
              <div className="hidden lg:block">
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-[#006C35] font-mono text-xs font-bold uppercase tracking-widest">System Status</div>
                    <div className="text-white font-bold uppercase text-xl">Online</div>
                  </div>
                  <div className="w-2 h-2 bg-[#006C35] rounded-full animate-pulse shadow-[0_0_10px_#006C35]"></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* TACTICAL GRID - TOOLS */}
        <div className="px-4 md:px-8 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex items-end justify-between mb-8 border-b border-[#094E2E] pb-2">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                Valuation Protocols
              </h3>
              <span className="font-mono text-[#006C35] text-xs">SELECT_MODULE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#094E2E]/30 border border-[#094E2E]">
              {TOOLS.map((tool, idx) => (
                <div 
                  key={tool.id}
                  onClick={() => onSelectTool(tool)}
                  className="group relative bg-black/80 p-6 cursor-pointer hover:bg-[#006C35]/10 transition-colors duration-200 outline outline-1 outline-[#094E2E] -outline-offset-1 h-full flex flex-col justify-between"
                >
                  {/* Hover Effect Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#EFBF04] transition-colors"></div>

                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-mono text-[#006C35] text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                        {tool.category}
                      </span>
                      <span className="font-mono text-zinc-700 text-lg font-bold group-hover:text-[#EFBF04] transition-colors">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      {getIcon(tool.icon)}
                      <h4 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-[#EFBF04] transition-colors">
                        {tool.name}
                      </h4>
                    </div>

                    <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed mb-6 border-l border-zinc-800 pl-3">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-end text-[#006C35] group-hover:text-white transition-colors">
                    <span className="text-[10px] font-mono uppercase tracking-widest mr-2 group-hover:mr-4 transition-all">Execute</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>

      {/* FOOTER - OPERATOR PROFILE */}
      <div className="border-t border-[#094E2E] bg-black/80 py-12 px-4 md:px-8 lg:px-12 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-center">
            
            {/* Operator ID */}
            <div className="lg:col-span-4 flex items-center gap-6">
               <div>
                  <div className="text-[#006C35] font-mono text-xs font-bold uppercase tracking-widest mb-1">
                    Authorized Operator
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                    Rayan Arab
                  </h2>
               </div>
            </div>

            {/* Operator Details */}
            <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 md:gap-12 md:items-center border-l border-[#094E2E] pl-0 md:pl-8">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase">
                  <User size={12} />
                  <span>Role / Origin</span>
                </div>
                <p className="text-white font-bold text-sm uppercase">
                  Independent Business Developer
                </p>
                <p className="text-[#EFBF04] font-mono text-xs uppercase">
                  Ex-Tamra Capital Associate Founder
                </p>
              </div>

              <div className="space-y-1 max-w-md">
                 <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase">
                  <Shield size={12} />
                  <span>Current Mission</span>
                </div>
                <p className="text-zinc-300 text-sm font-medium leading-snug uppercase">
                  Establishing niche <span className="text-white">Government Venture Arm</span>. 
                  Targeting <span className="text-[#EFBF04] font-bold">Dual-Use Technology</span> & R&D 
                  (TRL 1 - 7).
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
