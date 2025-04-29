
import React, { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { detectDisease } from '../utils/mockApi';
import { DetectionResult } from '../types';
import ResultsDisplay from './ResultsDisplay';
import { Upload, X, File, Check, Info } from 'lucide-react';

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const validateFile = (file: File) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'application/dicom'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Format non supporté",
        description: "Veuillez télécharger une image au format JPG, PNG ou DICOM.",
        variant: "destructive"
      });
      return false;
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille du fichier ne doit pas dépasser 10 MB.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setOriginalFile(file);
        setResult(null);
        
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [toast]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setOriginalFile(file);
        setResult(null);
        
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [toast]);

  const handleAnalyze = async () => {
    if (!originalFile) return;

    setIsAnalyzing(true);
    try {
      const detectionResult = await detectDisease(originalFile);
      setResult(detectionResult);
      toast({
        title: "Analyse terminée",
        description: "L'analyse de votre image a été complétée avec succès.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Erreur d'analyse",
        description: "Une erreur est survenue lors de l'analyse de l'image.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setOriginalFile(null);
    setResult(null);
  };

  return (
    <section id="upload" className="py-16 bg-gradient-to-br from-white to-soft-pink/10">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-soft-pink bg-opacity-20 rounded-full text-dark-pink font-medium text-sm mb-4">
            Analyse IA sécurisée
          </span>
          <h2 className="text-3xl font-bold mb-4">Analyse d'images médicales</h2>
          <p className="text-med-gray max-w-2xl mx-auto">
            Téléchargez votre image médicale pour une analyse rapide et précise par notre intelligence artificielle.
            Nous supportons les formats JPG, PNG et DICOM pour une flexibilité maximale.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center bg-soft-gray rounded-full px-4 py-2">
              <Check className="h-4 w-4 text-med-pink mr-2" />
              <span className="text-sm">Analyse rapide</span>
            </div>
            <div className="flex items-center bg-soft-gray rounded-full px-4 py-2">
              <Check className="h-4 w-4 text-med-pink mr-2" />
              <span className="text-sm">Haute précision</span>
            </div>
            <div className="flex items-center bg-soft-gray rounded-full px-4 py-2">
              <Check className="h-4 w-4 text-med-pink mr-2" />
              <span className="text-sm">Résultats instantanés</span>
            </div>
          </div>
        </div>

        {!uploadedImage ? (
          <div 
            className={`upload-zone mx-auto max-w-2xl ${isDragging ? 'upload-zone-active' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-soft-pink bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-med-pink" />
            </div>
            <h3 className="text-xl font-medium mb-2">Déposez votre image ici</h3>
            <p className="text-med-gray mb-6 text-center">
              ou
            </p>
            <label className="btn-primary cursor-pointer">
              <File className="h-5 w-5 mr-2" /> Parcourir les fichiers
              <input 
                type="file" 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.dcm"
                onChange={handleFileChange}
              />
            </label>
            
            <div className="mt-8 pt-6 border-t border-dashed border-soft-gray w-full">
              <div className="flex items-center justify-center text-sm text-med-gray">
                <Info className="h-4 w-4 mr-2 text-med-pink" />
                <span>Formats acceptés : JPG, PNG, DICOM (max. 10MB)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="rounded-full bg-white bg-opacity-70 hover:bg-opacity-100"
                      onClick={resetUpload}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <img 
                    src={uploadedImage} 
                    alt="Image téléchargée" 
                    className="w-full rounded-xl shadow-md object-cover max-h-80"
                  />
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-med-gray">
                        {originalFile?.name}
                      </p>
                      <p className="text-xs bg-soft-gray px-2 py-1 rounded-full">
                        {Math.round(originalFile?.size ? originalFile.size / 1024 : 0)} KB
                      </p>
                    </div>
                    {!result && (
                      <Button 
                        className="btn-primary w-full" 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Analyse en cours...
                          </>
                        ) : (
                          <>🧠 Lancer la détection</>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                {result ? (
                  <ResultsDisplay result={result} />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    {isAnalyzing ? (
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-med-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg font-medium">Analyse en cours...</p>
                        <p className="text-med-gray">Notre IA est en train d'analyser votre image</p>
                        
                        <div className="mt-6 max-w-xs mx-auto">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-med-pink animate-pulse" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-8 border border-dashed border-soft-pink rounded-xl">
                        <div className="w-16 h-16 bg-soft-pink bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Info className="h-8 w-8 text-med-pink" />
                        </div>
                        <p className="text-lg font-medium mb-2">Prêt pour l'analyse</p>
                        <p className="text-med-gray">Cliquez sur "Lancer la détection" pour analyser votre image</p>
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                          <div className="text-xs bg-soft-gray px-3 py-1 rounded-full text-med-gray">
                            Précision ~94%
                          </div>
                          <div className="text-xs bg-soft-gray px-3 py-1 rounded-full text-med-gray">
                            Résultat en &lt;30s
                          </div>
                          <div className="text-xs bg-soft-gray px-3 py-1 rounded-full text-med-gray">
                            Confidentiel
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadSection;
