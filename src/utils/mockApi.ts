
import { DetectionResult } from "../types";

// This simulates an enhanced API service for image detection with detailed analysis
export const detectDisease = (imageFile: File): Promise<DetectionResult> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Generate random image metadata
      const imageType = ["Mammographie", "Radiographie", "IRM", "Échographie"][Math.floor(Math.random() * 4)];
      const format = ["DICOM", "JPEG", "PNG", "TIFF"][Math.floor(Math.random() * 4)];
      const width = Math.floor(Math.random() * 1000) + 1000;
      const height = Math.floor(Math.random() * 1000) + 1000;
      const resolution = `${width} x ${height} px`;
      const sensitivity = `${Math.floor(Math.random() * 6) + 94}%`;
      const specificity = `${Math.floor(Math.random() * 7) + 92}%`;
      const accuracy = `${Math.floor(Math.random() * 5) + 95}%`;
      const tissues = imageType === "Mammographie" ? "Tissu mammaire" : "Tissu pulmonaire";
      
      // Generate random AI model metadata
      const metadata = {
        processingTime: `${(Math.random() * 3 + 0.5).toFixed(2)} secondes`,
        analysisTechnique: ["Deep Learning CNN", "Transfer Learning", "Ensemble Methods", "Region-based CNN"][Math.floor(Math.random() * 4)],
        detectionAlgorithm: ["YOLOv5", "Faster R-CNN", "RetinaNet", "EfficientDet"][Math.floor(Math.random() * 4)],
        aiModelVersion: `MedCancer v${Math.floor(Math.random() * 2) + 2}.${Math.floor(Math.random() * 10)}`,
        detectionThreshold: `${(Math.random() * 0.2 + 0.7).toFixed(2)}`
      };

      // Generate more detailed results based on image data
      const results = [
        {
          prediction: "Suspicion de tumeur maligne",
          confidence: 87.5,
          recommendation: "Consultez rapidement un spécialiste pour une évaluation complémentaire et une biopsie potentielle.",
          cancerRiskScore: 76,
          diagnosticNotes: "Masse spiculée avec contours irréguliers et forte densité. Caractéristiques compatibles avec un carcinome canalaire infiltrant."
        },
        {
          prediction: "Anomalie mammaire suspecte détectée",
          confidence: 76.3,
          recommendation: "Une consultation avec un oncologue est fortement recommandée dans les plus brefs délais.",
          cancerRiskScore: 68,
          diagnosticNotes: "Microcalcifications groupées dans le quadrant supéro-externe du sein. Distorsion architecturale légère suggérant un processus infiltrant possible."
        },
        {
          prediction: "Absence d'anomalies significatives",
          confidence: 92.1,
          recommendation: "Poursuivez vos contrôles réguliers selon les recommandations de dépistage standard.",
          cancerRiskScore: 12,
          diagnosticNotes: "Tissu mammaire de densité normale sans masses, calcifications suspectes ou distorsions architecturales."
        },
        {
          prediction: "Lésion probablement bénigne",
          confidence: 81.7,
          recommendation: "Un suivi à court terme (6 mois) est recommandé pour évaluer l'évolution.",
          cancerRiskScore: 27,
          diagnosticNotes: "Nodule bien circonscrit avec contours réguliers et homogénéité interne. Caractéristiques évoquant un fibroadénome ou un kyste."
        }
      ];

      // Randomly select one of the prepared results
      const randomIndex = Math.floor(Math.random() * results.length);
      const selectedResult = results[randomIndex];
      
      // Generate random areas of interest based on the prediction
      const areas = [];
      if (selectedResult.prediction !== "Absence d'anomalies significatives") {
        const numAreas = Math.floor(Math.random() * 3) + 1; // 1-3 areas
        for (let i = 0; i < numAreas; i++) {
          const areaSize = Math.floor(Math.random() * 25) + 5; // 5-30mm
          areas.push({
            x: Math.floor(Math.random() * (width - 100)) + 50,
            y: Math.floor(Math.random() * (height - 100)) + 50,
            width: Math.floor(Math.random() * 100) + 50,
            height: Math.floor(Math.random() * 100) + 50,
            size: `${areaSize} mm`,
            confidence: Math.floor(Math.random() * 20) + 70, // 70-90%
            classification: ["Bénin", "Suspect", "Probablement malin", "Indéterminé"][Math.floor(Math.random() * 4)],
            description: [
              `Zone hyperdense de ${areaSize}mm avec contours ${Math.random() > 0.5 ? 'irréguliers' : 'réguliers'}`,
              `Groupe de microcalcifications d'environ ${areaSize}mm de diamètre`,
              `Masse solide de ${areaSize}mm avec renforcement périphérique`,
              `Distorsion architecturale d'environ ${areaSize}mm`
            ][Math.floor(Math.random() * 4)]
          });
        }
      }

      // Combine everything into the final result
      const finalResult: DetectionResult = {
        ...selectedResult,
        imageType,
        resolution,
        format,
        tissues,
        sensitivity,
        specificity,
        accuracy,
        areas,
        metadata
      };

      resolve(finalResult);
    }, 2000); // 2 second delay to simulate processing
  });
};
