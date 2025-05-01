
import { DetectionResult } from '@/types';

// Function to generate a mock detection result for UI testing
export const getMockDetectionResult = (): DetectionResult => {
  // Randomly decide if we detect an anomaly or not (30% chance)
  const hasAnomaly = Math.random() < 0.3;
  
  // Base result with common properties
  const baseResult: DetectionResult = {
    prediction: hasAnomaly 
      ? "Suspicion d'anomalie détectée" 
      : "Aucune anomalie détectée",
    confidence: hasAnomaly 
      ? 75 + Math.random() * 15 // 75-90% confidence for anomalies
      : 90 + Math.random() * 8, // 90-98% confidence for normal results
    recommendation: hasAnomaly 
      ? "Une consultation avec un spécialiste est recommandée pour examiner les zones suspectes identifiées."
      : "Aucune action immédiate n'est nécessaire. Continuez les examens de routine selon les recommandations de votre médecin.",
    imageType: selectRandom([
      "Mammographie", 
      "Radiographie pulmonaire", 
      "IRM cérébrale", 
      "TDM abdominale",
      "Échographie thyroïdienne"
    ]),
    resolution: selectRandom([
      "2048x1536 px", 
      "1920x1080 px", 
      "3840x2160 px", 
      "1024x768 px"
    ]),
    format: selectRandom([
      "JPEG", 
      "DICOM", 
      "PNG", 
      "TIFF"
    ]),
    tissues: hasAnomaly 
      ? selectRandom([
          "Tissu mammaire", 
          "Tissu pulmonaire", 
          "Tissu cérébral", 
          "Tissu abdominal"
        ])
      : null,
    sensitivity: `${(85 + Math.random() * 12).toFixed(1)}%`,
    specificity: `${(82 + Math.random() * 15).toFixed(1)}%`,
    accuracy: `${(88 + Math.random() * 10).toFixed(1)}%`,
    cancerRiskScore: hasAnomaly 
      ? 3 + Math.random() * 5 // 3-8 risk score for anomalies
      : 0.5 + Math.random() * 1.5, // 0.5-2 risk score for normal results
    diagnosticNotes: hasAnomaly 
      ? "Les zones de haute densité identifiées présentent des caractéristiques qui méritent un examen plus approfondi. La forme irrégulière et les bords mal définis sont des indicateurs qui justifient une évaluation clinique supplémentaire."
      : "L'image a été analysée en détail sans détection d'aucun modèle anormal. Les structures observées sont conformes aux attentes pour l'âge et le type d'examen.",
    metadata: {
      processingTime: `${(0.8 + Math.random() * 1.2).toFixed(2)} secondes`,
      analysisTechnique: selectRandom([
        "Deep Learning CNN", 
        "Machine Learning SVM", 
        "Réseau de neurones convolutif", 
        "Analyse spectrale assistée par IA"
      ]),
      detectionAlgorithm: selectRandom([
        "MedNet v3.2", 
        "CancerDetect 2.0", 
        "DiagnosticAI 4.1", 
        "MedVision Pro"
      ]),
      aiModelVersion: selectRandom([
        "1.3.5", 
        "2.0.1", 
        "3.4.2", 
        "4.0.0"
      ]),
      detectionThreshold: selectRandom([
        "0.75", 
        "0.82", 
        "0.68", 
        "0.91"
      ])
    }
  };

  // Add anomaly areas only if there's an anomaly detected
  if (hasAnomaly) {
    const numberOfAreas = 1 + Math.floor(Math.random() * 2); // 1-2 anomalies
    baseResult.areas = [];
    
    for (let i = 0; i < numberOfAreas; i++) {
      baseResult.areas.push({
        x: 20 + Math.random() * 60, // random position between 20-80%
        y: 20 + Math.random() * 60,
        width: 5 + Math.random() * 15, // random size between 5-20%
        height: 5 + Math.random() * 15,
        size: selectRandom([
          "12mm x 8mm", 
          "7mm x 5mm", 
          "15mm x 9mm", 
          "5mm x 4mm"
        ]),
        description: selectRandom([
          "Masse à densité accrue", 
          "Zone d'opacité suspecte", 
          "Nodule avec contours irréguliers", 
          "Lésion potentiellement maligne"
        ]),
        confidence: 65 + Math.random() * 25, // 65-90% confidence
        classification: selectRandom([
          "BI-RADS 4B", 
          "Nodule suspect", 
          "Possible malignité", 
          "Opacité à investiguer"
        ])
      });
    }
  }

  return baseResult;
};

// Helper function to select a random item from an array
function selectRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
