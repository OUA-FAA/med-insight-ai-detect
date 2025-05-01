
export type DetectionResult = {
  prediction: string;
  confidence: number;
  recommendation: string;
  imageType?: string;
  resolution?: string;
  format?: string;
  tissues?: string;
  sensitivity?: string;
  specificity?: string;
  accuracy?: string;
  areas?: {
    x: number;
    y: number;
    width: number;
    height: number;
    size?: string;
    description?: string;
    confidence?: number;
    classification?: string;
  }[];
  metadata?: {
    processingTime?: string;
    analysisTechnique?: string;
    detectionAlgorithm?: string;
    aiModelVersion?: string;
    detectionThreshold?: string;
  };
  cancerRiskScore?: number;
  diagnosticNotes?: string;
};

export type UserProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
};

export type AnalysisResult = {
  id: string;
  user_id: string;
  image_url: string;
  prediction: string;
  confidence: number;
  recommendation: string | null;
  image_type: string | null;
  resolution: string | null;
  format: string | null;
  tissues: string | null;
  sensitivity: string | null;
  specificity: string | null;
  accuracy: string | null;
  cancer_risk_score: number | null;
  diagnostic_notes: string | null;
  metadata: any | null;
  created_at: string;
  areas?: AnalysisArea[];
};

export type AnalysisArea = {
  id: string;
  result_id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  size: string | null;
  description: string | null;
  confidence: number | null;
  classification: string | null;
  created_at: string;
};
