
import React from 'react';
import { DetectionResult } from '../types';

interface ResultsDisplayProps {
  result: DetectionResult;
}

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  return (
    <div className="result-card">
      <div className="mb-6">
        <h3 className="font-medium text-med-gray mb-1">Résultat de l'analyse</h3>
        <h2 className="text-2xl font-bold">{result.prediction}</h2>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-med-gray">Niveau de confiance</h3>
          <span className="font-bold">{result.confidence.toFixed(1)}%</span>
        </div>
        <div className="confidence-bar">
          <div 
            className="confidence-progress" 
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-med-gray mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="p-4 bg-soft-pink bg-opacity-10 rounded-lg border border-soft-pink border-opacity-20">
        <h3 className="font-medium mb-2">Recommandation</h3>
        <p>{result.recommendation}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-soft-gray">
        <p className="text-med-gray text-sm italic">
          <strong>Important :</strong> Ce résultat est généré par une intelligence artificielle et ne constitue pas un diagnostic médical. 
          Consultez toujours un professionnel de santé qualifié pour une évaluation complète.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
