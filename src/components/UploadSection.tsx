import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, FileImage, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { DetectionResult } from '@/types';
import ResultsDisplay from './ResultsDisplay';
import { getMockDetectionResult } from '@/utils/mockApi';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { saveAnalysisResult } from '@/services/analysisService';
const UploadSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    toast
  } = useToast();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Format de fichier non supporté",
          description: "Veuillez sélectionner une image",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      setDetectionResult(null);
    }
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      setDetectionResult(null);
    } else {
      toast({
        title: "Format de fichier non supporté",
        description: "Veuillez déposer une image",
        variant: "destructive"
      });
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const uploadToServer = async (file: File) => {
    // This would normally upload to a server but for demo purposes we'll create a mock URL
    return URL.createObjectURL(file);
  };
  const handleAnalyzeClick = async () => {
    if (!selectedFile) {
      toast({
        title: "Aucune image sélectionnée",
        description: "Veuillez sélectionner une image à analyser",
        variant: "destructive"
      });
      return;
    }
    try {
      setIsAnalyzing(true);

      // In a real app, you'd upload the image to a server and get back a result
      setTimeout(async () => {
        const result = getMockDetectionResult();
        setDetectionResult(result);

        // Save the result to Supabase if user is logged in
        if (user) {
          try {
            // Upload image to server (mock)
            const imageUrl = await uploadToServer(selectedFile);

            // Save result to Supabase
            await saveAnalysisResult(user.id, imageUrl, result);
            toast({
              title: "Résultat enregistré",
              description: "Votre analyse a été enregistrée dans votre historique"
            });
          } catch (error) {
            console.error("Error saving result:", error);
            toast({
              title: "Erreur d'enregistrement",
              description: "Impossible d'enregistrer votre analyse",
              variant: "destructive"
            });
          }
        }
        setIsAnalyzing(false);
      }, 2000);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setIsAnalyzing(false);
      toast({
        title: "Erreur d'analyse",
        description: "Une erreur est survenue lors de l'analyse de l'image",
        variant: "destructive"
      });
    }
  };
  const handleTakePhoto = () => {
    // This would open the camera on mobile devices
    toast({
      title: "Fonctionnalité en développement",
      description: "La prise de photo sera bientôt disponible"
    });
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setDetectionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleViewHistory = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour accéder à votre historique d'analyses"
      });
      navigate('/login');
    }
  };
  return <section id="upload-section" className="py-16 bg-gradient-to-b from-white to-soft-blue/10">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Détectez les cancers avec notre IA</h2>
          <p className="text-med-gray max-w-2xl mx-auto">
            Téléchargez une image médicale pour obtenir une analyse instantanée. Notre système d'intelligence artificielle vous fournira une évaluation rapide et précise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Tabs defaultValue="upload" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="upload" className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Télécharger
                </TabsTrigger>
                <TabsTrigger value="camera" className="flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Prendre une photo
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload">
                <Card>
                  <CardContent className="p-6">
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    
                    {!imagePreview ? <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-med-blue transition-colors" onClick={handleButtonClick} onDrop={handleDrop} onDragOver={handleDragOver}>
                        <FileImage className="h-12 w-12 mx-auto mb-4 text-med-gray" />
                        <h3 className="font-medium mb-2">Déposez votre image ici</h3>
                        <p className="text-sm text-med-gray mb-4">ou</p>
                        <Button onClick={e => {
                      e.stopPropagation();
                      handleButtonClick();
                    }}>
                          Parcourir
                        </Button>
                        <p className="mt-4 text-xs text-med-gray">
                          Formats acceptés: PNG, JPG, JPEG, DICOM
                        </p>
                      </div> : <div>
                        <div className="relative overflow-hidden rounded-lg mb-4 border border-gray-200">
                          <img src={imagePreview} alt="Aperçu" className="w-full h-auto max-h-80 object-contain" />
                          {detectionResult && <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${detectionResult.prediction.toLowerCase().includes('anomalie') ? 'bg-destructive/80 text-white' : 'bg-emerald-500/80 text-white'}`}>
                              Confiance: {detectionResult.confidence.toFixed(1)}%
                            </div>}
                        </div>
                        
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={handleReset}>
                            Changer d'image
                          </Button>
                          
                          {!detectionResult ? <Button onClick={handleAnalyzeClick} disabled={isAnalyzing}>
                              {isAnalyzing ? <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Analyse en cours...
                                </> : 'Analyser l\'image'}
                            </Button> : <Button variant="default" onClick={handleViewHistory}>
                              Voir mon historique
                            </Button>}
                        </div>
                      </div>}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="camera">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-med-gray" />
                    <h3 className="font-medium mb-4">Prendre une photo avec votre appareil</h3>
                    <Button onClick={handleTakePhoto}>
                      Activer la caméra
                    </Button>
                    <p className="mt-4 text-xs text-med-gray">
                      Assurez-vous d'être dans un environnement bien éclairé
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {!user && !detectionResult && activeTab === "upload" && <div className="bg-soft-yellow p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-amber-600 flex-shrink-0 h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">Connectez-vous pour sauvegarder vos analyses</h4>
                  <p className="text-sm text-amber-700">
                    Créez un compte ou connectez-vous pour enregistrer vos résultats et accéder à votre historique d'analyses.
                  </p>
                  <div className="mt-2 flex gap-3">
                    <Button variant="outline" size="sm" onClick={() => navigate('/login')} className="border-amber-600 text-amber-700 bg-slate-50">
                      Se connecter
                    </Button>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => navigate('/register')}>
                      Créer un compte
                    </Button>
                  </div>
                </div>
              </div>}
            
            {detectionResult && <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${detectionResult.prediction.toLowerCase().includes('anomalie') ? 'bg-red-50' : 'bg-green-50'}`}>
                {detectionResult.prediction.toLowerCase().includes('anomalie') ? <AlertCircle className="text-destructive flex-shrink-0 h-5 w-5 mt-0.5" /> : <CheckCircle2 className="text-emerald-500 flex-shrink-0 h-5 w-5 mt-0.5" />}
                <div>
                  <h4 className={`font-medium mb-1 ${detectionResult.prediction.toLowerCase().includes('anomalie') ? 'text-destructive' : 'text-emerald-700'}`}>
                    {detectionResult.prediction}
                  </h4>
                  <p className={`text-sm ${detectionResult.prediction.toLowerCase().includes('anomalie') ? 'text-red-700' : 'text-emerald-600'}`}>
                    {detectionResult.recommendation}
                  </p>
                </div>
              </div>}
          </div>
          
          <div>
            {detectionResult && <ResultsDisplay result={detectionResult} imageUrl={imagePreview || ''} />}
          </div>
        </div>
      </div>
    </section>;
};
export default UploadSection;