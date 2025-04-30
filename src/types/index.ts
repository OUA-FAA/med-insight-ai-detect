
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
