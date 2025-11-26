export interface ToolInput {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  options?: string[]; // For select type
  unit?: string;
  defaultValue?: string | number;
}

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Financial' | 'Market' | 'Team' | 'Product';
  inputs: ToolInput[];
  chartType?: 'bar' | 'pie' | 'radar' | 'composed';
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface AnalysisResult {
  analysisText: string;
  keyMetrics: { label: string; value: string | number; status: 'good' | 'neutral' | 'bad' }[];
  recommendations: string[];
  chartData?: any[];
  sources?: GroundingSource[];
}
