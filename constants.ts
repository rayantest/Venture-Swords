import { ToolDefinition } from './types';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'berkus',
    name: 'The Berkus Method',
    description: 'Best for pre-revenue startups. Assigns value based on 5 qualitative indicators: Idea, Prototype, Team, Relationships, and Sales.',
    category: 'Financial',
    icon: 'Trophy',
    chartType: 'bar',
    inputs: [
      { id: 'idea_val', label: 'Sound Idea Assessment', type: 'textarea', placeholder: 'Describe the basic value prop and market risk.' },
      { id: 'proto_val', label: 'Product Prototype Status', type: 'textarea', placeholder: 'Is there a working prototype? Tech risk reduced?' },
      { id: 'team_val', label: 'Management Team Quality', type: 'textarea', placeholder: 'Experience and completeness of the team.' },
      { id: 'strat_val', label: 'Strategic Relationships', type: 'textarea', placeholder: 'Partnerships, board members, or advisors.' },
      { id: 'sales_val', label: 'Initial Sales / Rollout', type: 'textarea', placeholder: 'Any revenue or path to production?' },
      { id: 'max_val', label: 'Max Value per Category ($)', type: 'number', placeholder: '500000', defaultValue: 500000 },
    ]
  },
  {
    id: 'first-chicago',
    name: 'The First Chicago Method',
    description: 'Probability-weighted approach valuing a startup based on Success (Best), Failure (Worst), and Survival (Base) scenarios.',
    category: 'Financial',
    icon: 'BarChart2',
    chartType: 'bar',
    inputs: [
      { id: 'success_val', label: 'Success Case Valuation ($)', type: 'number', placeholder: '100000000' },
      { id: 'success_prob', label: 'Success Probability (%)', type: 'number', placeholder: '10' },
      { id: 'survival_val', label: 'Survival Case Valuation ($)', type: 'number', placeholder: '10000000' },
      { id: 'survival_prob', label: 'Survival Probability (%)', type: 'number', placeholder: '60' },
      { id: 'failure_val', label: 'Failure Case Valuation ($)', type: 'number', placeholder: '0' },
      { id: 'failure_prob', label: 'Failure Probability (%)', type: 'number', placeholder: '30' },
    ]
  },
  {
    id: 'vc-method',
    name: 'Venture Capital Method',
    description: 'Works backward from the investor\'s desired ROI at exit, utilizing terminal multiples and time to exit.',
    category: 'Financial',
    icon: 'Briefcase',
    chartType: 'composed',
    inputs: [
      { id: 'exit_revenue', label: 'Projected Revenue in Exit Year ($)', type: 'number', placeholder: '50000000' },
      { id: 'profit_margin', label: 'Net Profit Margin at Exit (%)', type: 'number', placeholder: '20' },
      { id: 'pe_ratio', label: 'Industry P/E Ratio', type: 'number', placeholder: '15' },
      { id: 'roi', label: 'Desired ROI (Multiple, e.g. 10x)', type: 'number', placeholder: '10' },
      { id: 'years', label: 'Years to Exit', type: 'number', placeholder: '5' },
      { id: 'investment', label: 'Investment Amount ($)', type: 'number', placeholder: '2000000' },
    ]
  },
  {
    id: 'scorecard',
    name: 'Scorecard Method',
    description: 'Compares the startup against funded competitors, adjusting average valuation based on weighted factors.',
    category: 'Market',
    icon: 'ClipboardCheck',
    chartType: 'radar',
    inputs: [
      { id: 'avg_val', label: 'Avg Pre-money of Comparables ($)', type: 'number', placeholder: '6000000' },
      { id: 'team_score', label: 'Strength of Team (Target 100%)', type: 'number', placeholder: '125', unit: '%' },
      { id: 'size_score', label: 'Size of Opportunity (Target 100%)', type: 'number', placeholder: '100', unit: '%' },
      { id: 'tech_score', label: 'Product/Technology (Target 100%)', type: 'number', placeholder: '100', unit: '%' },
      { id: 'comp_score', label: 'Competitive Environment (Target 100%)', type: 'number', placeholder: '75', unit: '%' },
      { id: 'marketing_score', label: 'Marketing/Partnerships (Target 100%)', type: 'number', placeholder: '100', unit: '%' },
      { id: 'invest_score', label: 'Need for Investment (Target 100%)', type: 'number', placeholder: '100', unit: '%' },
    ]
  },
  {
    id: 'risk-summation',
    name: 'Risk Factor Summation',
    description: 'Evaluates 12 specific risk factors (management, political, competition) to adjust the base valuation.',
    category: 'Market',
    icon: 'AlertTriangle',
    chartType: 'bar',
    inputs: [
      { id: 'base_val', label: 'Base Valuation ($)', type: 'number', placeholder: '5000000' },
      { id: 'risk_mgmt', label: 'Management Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_stage', label: 'Stage of Business Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_legis', label: 'Legislation/Political Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_mfg', label: 'Manufacturing/Supply Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_sales', label: 'Sales & Marketing Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_funding', label: 'Funding/Capital Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_comp', label: 'Competition Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_tech', label: 'Technology Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_lit', label: 'Litigation Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_intl', label: 'International Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'risk_rep', label: 'Reputation Risk', type: 'select', options: ['Very Low (+2)', 'Low (+1)', 'Normal (0)', 'High (-1)', 'Very High (-2)'] },
      { id: 'val_per_point', label: 'Value Adjustment per Point ($)', type: 'number', placeholder: '250000', defaultValue: 250000 },
    ]
  },
  {
    id: 'comparables',
    name: 'Comparables Method',
    description: 'Uses real market data from similar businesses that have recently exited or raised funds.',
    category: 'Market',
    icon: 'Scale',
    chartType: 'bar',
    inputs: [
      { id: 'industry', label: 'Industry / Sector', type: 'text', placeholder: 'e.g. Fintech B2C' },
      { id: 'revenue', label: 'Annual Revenue ($)', type: 'number', placeholder: '1000000' },
      { id: 'ebitda', label: 'Annual EBITDA ($)', type: 'number', placeholder: '200000' },
      { id: 'comps', label: 'Target Comparable Companies', type: 'textarea', placeholder: 'List known competitors or recent exits to benchmark against.' },
    ]
  },
  {
    id: 'dcf',
    name: 'Discounted Cash Flow',
    description: 'Projects future cash flows and discounts them to a Present Value using WACC.',
    category: 'Financial',
    icon: 'TrendingDown',
    chartType: 'composed',
    inputs: [
      { id: 'cf_y1', label: 'Year 1 Cash Flow ($)', type: 'number', placeholder: '100000' },
      { id: 'cf_y2', label: 'Year 2 Cash Flow ($)', type: 'number', placeholder: '250000' },
      { id: 'cf_y3', label: 'Year 3 Cash Flow ($)', type: 'number', placeholder: '500000' },
      { id: 'cf_y4', label: 'Year 4 Cash Flow ($)', type: 'number', placeholder: '1000000' },
      { id: 'cf_y5', label: 'Year 5 Cash Flow ($)', type: 'number', placeholder: '2500000' },
      { id: 'wacc', label: 'Discount Rate / WACC (%)', type: 'number', placeholder: '25' },
      { id: 'growth_rate', label: 'Terminal Growth Rate (%)', type: 'number', placeholder: '3' },
    ]
  },
  {
    id: 'cost-to-duplicate',
    name: 'Cost-to-Duplicate',
    description: 'Calculates the hard cost to rebuild the company from scratch (IP, Development, Personnel).',
    category: 'Financial',
    icon: 'Hammer',
    chartType: 'pie',
    inputs: [
      { id: 'rd_cost', label: 'R&D / Engineering Costs ($)', type: 'number', placeholder: '300000' },
      { id: 'ip_cost', label: 'Patent / IP Costs ($)', type: 'number', placeholder: '50000' },
      { id: 'marketing_cost', label: 'Marketing / Branding Costs ($)', type: 'number', placeholder: '50000' },
      { id: 'legal_cost', label: 'Legal / Admin Costs ($)', type: 'number', placeholder: '20000' },
      { id: 'proto_cost', label: 'Physical Prototype Costs ($)', type: 'number', placeholder: '0' },
    ]
  },
  {
    id: 'valuation-by-stage',
    name: 'Valuation by Stage',
    description: 'Links valuation directly to the development cycle milestones and maturity.',
    category: 'Product',
    icon: 'Rocket',
    chartType: 'bar',
    inputs: [
      { id: 'stage', label: 'Current Stage', type: 'select', options: ['Idea Stage', 'Prototype', 'Alpha Testing', 'Beta Testing', 'First Revenue', 'Growth'] },
      { id: 'industry', label: 'Target Industry', type: 'text', placeholder: 'e.g. Biotech' },
      { id: 'team_status', label: 'Management Team', type: 'select', options: ['Founders Only', 'Partial Team', 'Complete Team'] },
      { id: 'alliances', label: 'Strategic Alliances', type: 'select', options: ['None', 'In Discussion', 'Signed Partners'] },
    ]
  },
  {
    id: 'book-value',
    name: 'The Book Value Method',
    description: 'Strictly quantitative based on Balance Sheet: Assets minus Liabilities.',
    category: 'Financial',
    icon: 'BookOpen',
    chartType: 'bar',
    inputs: [
      { id: 'tangible_assets', label: 'Total Tangible Assets ($)', type: 'number', placeholder: '500000' },
      { id: 'liabilities', label: 'Total Liabilities ($)', type: 'number', placeholder: '150000' },
      { id: 'intangible_assets', label: 'Intangible Assets (Reference only)', type: 'number', placeholder: '1000000' },
    ]
  }
];