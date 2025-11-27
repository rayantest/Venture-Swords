
import React, { useState } from 'react';
import ToolView from './components/ToolView';
import Dashboard from './components/Dashboard';
import { ToolDefinition, SavedReport } from './types';
import { TOOLS } from './constants';

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolDefinition | null>(null);
  const [savedData, setSavedData] = useState<SavedReport | null>(null);

  const handleSelectTool = (tool: ToolDefinition) => {
    setSelectedTool(tool);
    setSavedData(null);
  };

  const handleLoadReport = (report: SavedReport) => {
    const tool = TOOLS.find(t => t.id === report.toolId);
    if (tool) {
      setSelectedTool(tool);
      setSavedData(report);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-sans">
      <main className="w-full mx-auto">
        {selectedTool ? (
          <ToolView 
            tool={selectedTool} 
            initialData={savedData}
            onBack={() => {
              setSelectedTool(null);
              setSavedData(null);
            }}
          />
        ) : (
          <Dashboard 
            onSelectTool={handleSelectTool} 
            onLoadReport={handleLoadReport}
          />
        )}
      </main>
    </div>
  );
};

export default App;
