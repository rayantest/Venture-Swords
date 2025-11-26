import React from 'react';
import { 
  LayoutDashboard, Settings, 
  Trophy, BarChart2, Briefcase, ClipboardCheck, AlertTriangle, Scale, TrendingDown, Hammer, Rocket, BookOpen
} from 'lucide-react';
import { TOOLS } from '../constants';
import { ToolDefinition } from '../types';

interface SidebarProps {
  selectedTool: ToolDefinition | null;
  onSelectTool: (tool: ToolDefinition | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTool, onSelectTool }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy size={20} />;
      case 'BarChart2': return <BarChart2 size={20} />;
      case 'Briefcase': return <Briefcase size={20} />;
      case 'ClipboardCheck': return <ClipboardCheck size={20} />;
      case 'AlertTriangle': return <AlertTriangle size={20} />;
      case 'Scale': return <Scale size={20} />;
      case 'TrendingDown': return <TrendingDown size={20} />;
      case 'Hammer': return <Hammer size={20} />;
      case 'Rocket': return <Rocket size={20} />;
      case 'BookOpen': return <BookOpen size={20} />;
      default: return <LayoutDashboard size={20} />;
    }
  };

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 shadow-xl z-10">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3 cursor-pointer" onClick={() => onSelectTool(null)}>
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">V</div>
        <span className="font-semibold text-lg tracking-tight">VentureVision</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <div 
          onClick={() => onSelectTool(null)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedTool === null ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </div>

        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Evaluation Tools
        </div>

        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 text-left ${selectedTool?.id === tool.id ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            {getIcon(tool.icon)}
            <span className="font-medium text-sm">{tool.name}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors px-2">
          <Settings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;