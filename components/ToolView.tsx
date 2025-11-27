
import React, { useState, useEffect } from 'react';
import { ToolDefinition, AnalysisResult, SavedReport } from '../types';
import { 
  Play, RotateCcw, AlertTriangle, ArrowLeft, Loader2, 
  Terminal, FileText, CheckSquare, Target, Save, CheckCircle
} from 'lucide-react';
import { analyzeStartup } from '../services/gemini';
import { db } from '../services/db';
import { Logo } from './Logo';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Line
} from 'recharts';

interface ToolViewProps {
  tool: ToolDefinition;
  initialData?: SavedReport | null;
  onBack: () => void;
}

// Strict Palette
const COLOR_MAIN = '#006C35';
const COLOR_DARK = '#094E2E';
const COLOR_ACCENT = '#EFBF04';
const COLOR_WHITE = '#FFFFFF';
const COLOR_GRID = '#1f2937';

const ToolView: React.FC<ToolViewProps> = ({ tool, initialData, onBack }) => {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (initialData) {
      setInputs(initialData.inputs);
      setResult(initialData.result);
      setSaved(true); // Assuming opened from history means it's saved
    } else {
      setInputs({});
      setResult(null);
      setError(null);
      setSaved(false);
    }
  }, [tool.id, initialData]);

  const handleInputChange = (id: string, value: any) => {
    setInputs(prev => ({ ...prev, [id]: value }));
    setSaved(false);
  };

  const handleRunAnalysis = async () => {
    setLoading(true);
    setError(null);
    setSaved(false);
    try {
      const data = await analyzeStartup(tool, inputs);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Execution failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDb = () => {
    if (!result) return;
    db.save({
      toolId: tool.id,
      toolName: tool.name,
      inputs: inputs,
      result: result
    });
    setSaved(true);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black border border-[#EFBF04] p-2">
          <p className="text-[#EFBF04] font-mono text-xs font-bold uppercase mb-1">{label}</p>
          {payload.map((p: any) => (
            <p key={p.name} className="text-white font-mono text-xs">
              {p.name}: <span className="font-bold">{p.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (!result?.chartData || result.chartData.length === 0) return null;

    if (tool.chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={result.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLOR_DARK} opacity={0.5} />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontFamily: 'monospace'}} />
            <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontFamily: 'monospace'}} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: COLOR_DARK, opacity: 0.2}} />
            <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '10px', paddingTop: '10px' }} />
            <Bar dataKey="value" name="TARGET" fill={COLOR_MAIN} />
            <Bar dataKey="benchmark" name="MARKET" fill={COLOR_ACCENT} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (tool.chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={result.chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
            >
              {result.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? COLOR_MAIN : COLOR_ACCENT} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '10px', paddingTop: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (tool.chartType === 'radar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={result.chartData}>
            <PolarGrid stroke={COLOR_DARK} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#d1d5db', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="TARGET" dataKey="A" stroke={COLOR_MAIN} strokeWidth={2} fill={COLOR_MAIN} fillOpacity={0.5} />
            <Radar name="MARKET AVG" dataKey="B" stroke={COLOR_ACCENT} strokeWidth={2} fill={COLOR_ACCENT} fillOpacity={0.2} />
            <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '10px', paddingTop: '10px' }} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      );
    }
    
    return (
       <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={result.chartData}>
            <CartesianGrid stroke={COLOR_DARK} vertical={false} opacity={0.5} />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={10} fontFamily="monospace" />
            <YAxis stroke="#6b7280" fontSize={10} fontFamily="monospace" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '10px', paddingTop: '10px' }} />
            <Bar dataKey="value" name="TARGET" barSize={20} fill={COLOR_MAIN} />
            <Line type="step" dataKey="benchmark" name="MARKET" stroke={COLOR_ACCENT} strokeWidth={2} dot={false} />
          </ComposedChart>
       </ResponsiveContainer>
    )
  };

  return (
    <div className="min-h-screen text-white pb-24">
      
      {/* Tactical Header */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur border-b border-[#094E2E]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-zinc-400 hover:text-[#EFBF04] transition-colors uppercase font-mono text-xs font-bold tracking-wider"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Abort / Return
            </button>
            <div className="h-6 w-px bg-[#094E2E]"></div>
            <div className="flex items-center gap-3">
               <Logo className="w-8 h-8" />
               <span className="font-black text-white text-sm uppercase hidden md:block tracking-tight">VentureSwords</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#006C35] font-mono text-xs uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#006C35] animate-pulse rounded-full"></span>
            Protocol Active: {tool.id}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
        
        {/* Title Block */}
        <div className="mb-10 border-l-4 border-[#006C35] pl-6 py-1">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
            {tool.name}
          </h1>
          <p className="text-zinc-400 font-mono text-sm uppercase max-w-2xl">
            {tool.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUT TERMINAL */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-black/50 border border-[#094E2E] p-1">
              <div className="bg-[#094E2E] px-4 py-2 flex items-center gap-2">
                <Terminal size={14} className="text-white" />
                <h2 className="text-white text-xs font-mono font-bold uppercase tracking-widest">
                  Input Parameters
                </h2>
              </div>
              
              <div className="p-5 space-y-6">
                {tool.inputs.map((input) => (
                  <div key={input.id}>
                    <label className="block text-[10px] font-mono font-bold text-[#EFBF04] uppercase mb-2">
                      {input.label}
                    </label>
                    
                    {input.type === 'select' ? (
                       <div className="relative">
                         <select
                          className="w-full bg-black border border-zinc-700 text-white p-3 font-mono text-base md:text-sm focus:border-[#EFBF04] focus:ring-0 rounded-none appearance-none"
                          onChange={(e) => handleInputChange(input.id, e.target.value)}
                          value={inputs[input.id] || ''}
                        >
                          <option value="">-- SELECT --</option>
                          {input.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <div className="absolute right-3 top-3 pointer-events-none text-zinc-500">▼</div>
                       </div>
                    ) : input.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        className="w-full bg-black border border-zinc-700 text-white p-3 font-mono text-base md:text-sm focus:border-[#EFBF04] focus:ring-0 rounded-none resize-none placeholder:text-zinc-800"
                        placeholder={input.placeholder}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        value={inputs[input.id] || ''}
                      />
                    ) : (
                      <div className="relative group">
                        <input
                          type={input.type}
                          className="w-full bg-black border border-zinc-700 text-white p-3 font-mono text-base md:text-sm focus:border-[#EFBF04] focus:ring-0 rounded-none placeholder:text-zinc-800"
                          placeholder={input.placeholder}
                          onChange={(e) => handleInputChange(input.id, e.target.value)}
                          value={inputs[input.id] || ''}
                        />
                        {input.unit && (
                          <span className="absolute right-3 top-3 text-zinc-600 font-mono text-xs">
                            {input.unit}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-[#094E2E] flex gap-3">
                <button
                  onClick={handleRunAnalysis}
                  disabled={loading}
                  className="flex-1 bg-[#006C35] hover:bg-[#094E2E] text-white font-bold font-mono uppercase text-sm py-4 border border-transparent hover:border-[#EFBF04] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} fill="currentColor" />}
                  {loading ? 'CALCULATING...' : 'INITIATE'}
                </button>
                <button 
                  onClick={() => { setInputs({}); setResult(null); setSaved(false); }}
                  className="px-4 border border-zinc-700 hover:border-white text-zinc-500 hover:text-white transition-colors"
                >
                  <RotateCcw size={18} />
                </button>
              </div>

              {error && (
                <div className="m-5 p-3 bg-red-950/30 border border-red-900 text-red-500 font-mono text-xs flex items-center gap-2">
                   <AlertTriangle size={14} />
                   {error}
                </div>
              )}
            </div>
          </div>

          {/* OUTPUT READOUT */}
          <div className="lg:col-span-8 space-y-8">
            {!result && !loading && (
               <div className="h-full min-h-[400px] border border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-700">
                 <Target size={64} strokeWidth={1} className="mb-4 opacity-20" />
                 <p className="font-mono text-sm uppercase tracking-widest">Awaiting Data Input</p>
               </div>
            )}

            {loading && (
               <div className="h-full min-h-[400px] bg-black/40 border border-[#094E2E] relative overflow-hidden flex flex-col items-center justify-center">
                 {/* Scanline */}
                 <div className="absolute top-0 w-full h-1 bg-[#EFBF04]/50 shadow-[0_0_20px_#EFBF04] animate-[scan_2s_linear_infinite]"></div>
                 
                 <div className="font-mono text-[#006C35] text-sm mb-2 animate-pulse">PROCESSING DATA STREAM</div>
                 <div className="w-64 h-1 bg-zinc-900 overflow-hidden">
                   <div className="h-full bg-[#006C35] animate-[progress_1.5s_ease-in-out_infinite]"></div>
                 </div>
               </div>
            )}

            {result && (
              <div className="animate-in fade-in duration-500 space-y-6">
                
                {/* ACTIONS BAR */}
                <div className="flex justify-between items-center bg-black/50 p-2 border border-zinc-800">
                  <div className="text-[10px] font-mono text-zinc-500 px-2 uppercase">Analysis generated via Gemini 2.5</div>
                  <button 
                    onClick={handleSaveToDb}
                    disabled={saved}
                    className={`flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase transition-all ${saved ? 'text-[#006C35] bg-[#006C35]/10 cursor-default' : 'text-[#EFBF04] bg-[#EFBF04]/10 hover:bg-[#EFBF04] hover:text-black'}`}
                  >
                    {saved ? <CheckCircle size={14} /> : <Save size={14} />}
                    {saved ? 'Archived to Database' : 'Archive Report'}
                  </button>
                </div>

                {/* KPI STRIP */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {result.keyMetrics.map((metric, idx) => (
                    <div key={idx} className="bg-black/80 border border-[#094E2E] p-4 relative overflow-hidden">
                      <div className={`absolute top-0 right-0 w-8 h-8 opacity-10 ${metric.status === 'good' ? 'bg-[#006C35]' : metric.status === 'bad' ? 'bg-red-500' : 'bg-[#EFBF04]'}`}></div>
                      <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase mb-2 truncate">{metric.label}</p>
                      <p className="text-xl md:text-2xl font-bold text-white font-mono">{metric.value}</p>
                      <div className={`mt-2 text-[10px] font-bold uppercase inline-block px-2 py-0.5 ${
                         metric.status === 'good' ? 'text-[#006C35] bg-[#006C35]/10' : 
                         metric.status === 'bad' ? 'text-red-500 bg-red-900/10' : 
                         'text-[#EFBF04] bg-[#EFBF04]/10'
                      }`}>
                        {metric.status.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* CHART MODULE */}
                   <div className="bg-black/60 border border-[#094E2E] p-1">
                      <div className="bg-[#094E2E]/20 px-4 py-2 border-b border-[#094E2E] flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-[#006C35] uppercase">Visual Analysis</span>
                        <Target size={14} className="text-[#006C35]" />
                      </div>
                      <div className="p-4">
                        {renderChart()}
                      </div>
                   </div>

                   {/* RECOMMENDATION MODULE */}
                   <div className="bg-black/60 border border-[#094E2E] p-1">
                      <div className="bg-[#094E2E]/20 px-4 py-2 border-b border-[#094E2E] flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-[#006C35] uppercase">Strategic Directives</span>
                        <CheckSquare size={14} className="text-[#006C35]" />
                      </div>
                      <div className="p-4 space-y-3">
                        {result.recommendations.map((rec, i) => (
                          <div key={i} className="flex gap-3 items-start group">
                             <div className="mt-1.5 w-1 h-1 bg-[#EFBF04] shrink-0 group-hover:scale-150 transition-transform"></div>
                             <span className="text-zinc-300 text-xs md:text-sm font-mono leading-relaxed">{rec}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                {/* TEXT ANALYSIS */}
                <div className="bg-black/60 border border-[#094E2E] p-6 relative">
                  <div className="absolute top-0 left-0 border-t border-l border-white w-4 h-4"></div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={16} className="text-[#EFBF04]" />
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm">Analyst Dossier</h3>
                  </div>
                  <p className="text-zinc-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {result.analysisText}
                  </p>
                </div>
                
                {/* FOOTER METADATA */}
                {result.sources && result.sources.length > 0 && (
                  <div className="border-t border-[#094E2E] pt-4">
                    <p className="text-[10px] font-mono text-zinc-600 uppercase mb-2">Intelligence Gathered From:</p>
                    <div className="flex flex-wrap gap-2">
                      {result.sources.map((s, i) => (
                        <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-[#006C35] hover:text-[#EFBF04] hover:underline truncate max-w-xs block">
                          [{i+1}] {s.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolView;
