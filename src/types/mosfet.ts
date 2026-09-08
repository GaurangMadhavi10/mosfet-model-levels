export interface ModelJourneyStage {
  id: string;
  stepNumber: number;
  name: string;
  subtitle: string;
  tag: string;
  targetSectionId: string;
  description: string;
}

export interface MosfetVariable {
  symbol: string;
  latex: string;
  name: string;
  unit: string;
  description: string;
  typicalValue: string;
  role: string;
}

export interface OperatingRegion {
  name: string;
  condition: string;
  conditionLatex: string;
  behavior: string;
  physics: string;
  circuitRole: string;
  color: string;
}

export interface SpiceToken {
  token: string;
  type: 'directive' | 'parameter' | 'node' | 'model' | 'command';
  explanation: string;
  significance: string;
}

export interface ExtractionStage {
  id: string;
  stepNumber: number;
  name: string;
  category: string;
  measurements: string[];
  parametersExtracted: string[];
  description: string;
}

export interface ModelComparisonRow {
  model: string;
  bestUse: string;
  captures: string;
  limits: string;
  typicalEra: string;
  equationForm: string;
  parameterCount: string;
  multiGate: boolean;
}

export interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  question: string;
  detail: string;
  sanityCheck: string;
}

export interface LearningStep {
  step: number;
  title: string;
  action: string;
  details: string;
  icon: string;
}
