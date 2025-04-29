
import { DetectionResult } from "../types";

// This is a mock API service that simulates sending an image to an AI detection service
export const detectDisease = (imageFile: File): Promise<DetectionResult> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Generate a random result for demo purposes
      const results = [
        {
          prediction: "Suspicion de tumeur bénigne détectée",
          confidence: 87.5,
          recommendation: "Consultez un spécialiste pour une évaluation complémentaire."
        },
        {
          prediction: "Anomalie pulmonaire potentielle identifiée",
          confidence: 76.3,
          recommendation: "Une consultation rapide avec un pneumologue est recommandée."
        },
        {
          prediction: "Aucune anomalie significative détectée",
          confidence: 92.1,
          recommendation: "Poursuivez vos contrôles réguliers selon les recommandations de votre médecin."
        },
        {
          prediction: "Anomalies osseuses détectées",
          confidence: 81.7,
          recommendation: "Une consultation avec un orthopédiste est recommandée pour évaluation."
        }
      ];

      // Randomly select one of the prepared results
      const randomIndex = Math.floor(Math.random() * results.length);
      resolve(results[randomIndex]);
    }, 2000); // 2 second delay to simulate processing
  });
};
