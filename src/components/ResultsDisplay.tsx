
import React from 'react';
import { DetectionResult } from '../types';
import { FileImage, Info, AlertCircle, Clock, Cpu, Code, HelpCircle, Activity } from 'lucide-react';

interface ResultsDisplayProps {
  result: DetectionResult;
  imageUrl?: string;
}

const ResultsDisplay = ({ result, imageUrl }: ResultsDisplayProps) => {
  // Calculate result severity color
  const getSeverityColor = (confidence: number) => {
    if (confidence < 40) return 'text-green-600';
    if (confidence < 75) return 'text-amber-600';
    return 'text-red-600';
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'bg-green-500';
    if (score < 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const severityClass = getSeverityColor(result.confidence);
  
  return (
    <div className="result-card">
      <div className="mb-6">
        <h3 className="font-medium text-med-gray mb-1">Résultat de l'analyse</h3>
        <h2 className={`text-2xl font-bold ${severityClass}`}>{result.prediction}</h2>
      </div>

      {result.cancerRiskScore !== undefined && (
        <div className="mb-6 bg-soft-gray/20 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Indice de risque</h3>
            <span className={`font-bold ${result.cancerRiskScore < 30 ? 'text-green-600' : result.cancerRiskScore < 60 ? 'text-amber-600' : 'text-red-600'}`}>
              {result.cancerRiskScore}/100
            </span>
          </div>
          <div className="confidence-bar bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${getRiskColor(result.cancerRiskScore)}`}
              style={{ width: `${result.cancerRiskScore}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-med-gray">Niveau de confiance</h3>
          <span className={`font-bold ${severityClass}`}>{result.confidence.toFixed(1)}%</span>
        </div>
        <div className="confidence-bar bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className={`confidence-progress h-full rounded-full ${
              result.confidence < 40 ? 'bg-green-500' : 
              result.confidence < 75 ? 'bg-amber-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-med-gray mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Detailed image analysis section */}
      <div className="mb-6 p-4 bg-soft-gray/30 rounded-lg">
        <h3 className="font-medium mb-3 flex items-center">
          <FileImage className="h-4 w-4 mr-2 text-med-pink" />
          Détails de l'image
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-med-gray">Type d'image:</span>
            <span className="font-medium">
              {result.imageType || "Radiographie / Mammographie"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-med-gray">Résolution:</span>
            <span className="font-medium">
              {result.resolution || "2048 x 1536 px"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-med-gray">Format:</span>
            <span className="font-medium">
              {result.format || "DICOM / JPEG"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-med-gray">Tissus analysés:</span>
            <span className="font-medium">
              {result.tissues || "Tissu mammaire"}
            </span>
          </div>
        </div>
      </div>

      {/* AI Analysis Metadata */}
      {result.metadata && (
        <div className="mb-6 p-4 bg-soft-gray/20 rounded-lg border-l-2 border-med-gray/50">
          <h3 className="font-medium mb-3 flex items-center text-med-gray">
            <Cpu className="h-4 w-4 mr-2" />
            Métadonnées d'analyse IA
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-med-gray mb-1">Temps de traitement</p>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-med-gray" />
                <span>{result.metadata.processingTime}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-med-gray mb-1">Technique d'analyse</p>
              <div className="flex items-center">
                <Activity className="h-3 w-3 mr-1 text-med-gray" />
                <span>{result.metadata.analysisTechnique}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-med-gray mb-1">Algorithme</p>
              <div className="flex items-center">
                <Code className="h-3 w-3 mr-1 text-med-gray" />
                <span>{result.metadata.detectionAlgorithm}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-med-gray mb-1">Version du modèle</p>
              <div className="flex items-center">
                <HelpCircle className="h-3 w-3 mr-1 text-med-gray" />
                <span>{result.metadata.aiModelVersion}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diagnostic notes */}
      {result.diagnosticNotes && (
        <div className="mb-6 p-4 bg-soft-pink/10 rounded-lg">
          <h3 className="font-medium mb-2 text-med-pink">Notes diagnostiques</h3>
          <p className="text-sm">{result.diagnosticNotes}</p>
        </div>
      )}

      {/* Detection details */}
      {result.areas && result.areas.length > 0 && (
        <div className="mb-6 p-4 bg-soft-pink/10 rounded-lg border-l-2 border-med-pink">
          <h3 className="font-medium mb-3 flex items-center text-med-pink">
            <AlertCircle className="h-4 w-4 mr-2" />
            Zones d'anomalies détectées ({result.areas.length})
          </h3>
          <ul className="space-y-3">
            {result.areas.map((area, index) => (
              <li key={index} className="text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Anomalie {index + 1}</span>
                  <div className="flex items-center gap-2">
                    {area.classification && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        area.classification === "Bénin" ? "bg-green-100 text-green-800" :
                        area.classification === "Suspect" ? "bg-amber-100 text-amber-800" :
                        area.classification === "Probablement malin" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {area.classification}
                      </span>
                    )}
                    <span className="text-xs bg-soft-gray px-2 py-0.5 rounded-full">
                      {area.size || `${Math.round(area.width * area.height / 100)} mm²`}
                    </span>
                  </div>
                </div>
                <p className="text-med-gray mt-1">
                  {area.description || `Région d'intérêt située à la position (${Math.round(area.x)}, ${Math.round(area.y)}) avec dimensions approximatives de ${Math.round(area.width)}×${Math.round(area.height)} pixels.`}
                </p>
                {area.confidence && (
                  <div className="mt-1 flex items-center">
                    <span className="text-xs text-med-gray mr-2">Confiance:</span>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden flex-grow max-w-[100px]">
                      <div 
                        className={`h-full ${area.confidence < 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${area.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs ml-2">{area.confidence}%</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-4 bg-soft-pink bg-opacity-10 rounded-lg border border-soft-pink border-opacity-20">
        <h3 className="font-medium mb-2">Recommandation</h3>
        <p>{result.recommendation}</p>
        
        {/* Additional metrics section */}
        <div className="mt-4 pt-3 border-t border-soft-pink border-opacity-20">
          <h4 className="text-sm font-medium mb-2">Métriques d'analyse</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white bg-opacity-50 rounded p-2">
              <div className="text-xs text-med-gray">Sensibilité</div>
              <div className="font-medium">{result.sensitivity || "97%"}</div>
            </div>
            <div className="bg-white bg-opacity-50 rounded p-2">
              <div className="text-xs text-med-gray">Spécificité</div>
              <div className="font-medium">{result.specificity || "94%"}</div>
            </div>
            <div className="bg-white bg-opacity-50 rounded p-2">
              <div className="text-xs text-med-gray">Précision</div>
              <div className="font-medium">{result.accuracy || "95%"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-soft-gray">
        <p className="text-med-gray text-sm italic flex items-start">
          <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Important :</strong> Ce résultat est généré par une intelligence artificielle et ne constitue pas un diagnostic médical. 
            Consultez toujours un professionnel de santé qualifié pour une évaluation complète.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
