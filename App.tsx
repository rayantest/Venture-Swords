import React, { useState } from 'react';
import ToolView from './components/ToolView';
import Dashboard from './components/Dashboard';
import { ToolDefinition } from './types';

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolDefinition | null>(null);

  return (
    <div className="min-h-screen bg-transparent text-white font-sans">
      <main className="w-full mx-auto">
        {selectedTool ? (
          <ToolView 
            tool={selectedTool} 
            onBack={() => setSelectedTool(null)}
          />
        ) : (
          <Dashboard onSelectTool={setSelectedTool} />
        )}
      </main>
    </div>
  );
};

export default App;