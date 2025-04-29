
export type DetectionResult = {
  prediction: string;
  confidence: number;
  recommendation: string;
  areas?: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
};
