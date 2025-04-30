
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, Mail, ChevronLeft, Calendar, Clock, FileImage, AlertCircle, Info, Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simulons des données détaillées pour une analyse
const mockAnalysisDetails = {
  id: 1,
  date: '2025-04-25',
  time: '14:35',
  imageType: 'Mammographie du sein droit',
  result: 'Suspicion de lésion',
  confidence: 87.5,
  recommendation: 'Une biopsie est recommandée pour confirmer la nature de la lésion détectée. Veuillez consulter un oncologue spécialisé dans le cancer du sein dans les plus brefs délais.',
  imageSrc: 'https://www.cancerresearchuk.org/sites/default/files/styles/cruk_wide_resp/public/mammogram-cruk.png.webp',
  doctor: 'Dr. Sophie Laurent',
  hospital: 'Centre d\'Oncologie',
  notes: 'Image de qualité adéquate. La détection montre une masse potentielle de 1.2 cm dans le quadrant supérieur externe.',
  resolution: '3000 x 2400 px',
  format: 'DICOM',
  tissues: 'Tissu mammaire, quadrant supérieur externe',
  sensitivity: '97%',
  specificity: '94%',
  accuracy: '95%',
  areas: [
    {
      x: 1480,
      y: 920,
      width: 120,
      height: 85,
      size: '1.2 cm',
      description: 'Masse hyperdense irrégulière avec bords mal définis',
      confidence: 91.3,
      classification: 'BI-RADS 4C'
    },
    {
      x: 1350,
      y: 850,
      width: 65,
      height: 60,
      size: '0.7 cm',
      description: 'Microcalcifications groupées avec distribution hétérogène',
      confidence: 84.8,
      classification: 'BI-RADS 4A'
    }
  ],
  medicalHistory: 'Antécédents familiaux de cancer du sein (mère). Pas de mammographies anormales antérieures.',
  additionalNotes: 'La densité mammaire est de catégorie C (hétérogène), ce qui peut limiter la sensibilité de la mammographie. Une échographie complémentaire est recommandée.'
};

const ResultDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // En production, nous récupèrerions les données avec l'ID
  // Pour l'instant, utilisons les données mockées
  
  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "Le rapport a été téléchargé avec succès",
    });
  };
  
  const handleSendEmail = () => {
    toast({
      title: "Email envoyé",
      description: "Le rapport a été envoyé à votre adresse email",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-soft-gray bg-opacity-30 py-8">
        <div className="container-custom">
          <Button 
            variant="ghost" 
            className="mb-6 hover:bg-transparent pl-0" 
            onClick={() => navigate('/dashboard')}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour au tableau de bord
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden mb-6 animate-fade-in">
                <Tabs defaultValue="image" className="w-full">
                  <div className="px-6 pt-6">
                    <TabsList className="mb-4">
                      <TabsTrigger value="image">Image</TabsTrigger>
                      <TabsTrigger value="details">Détails techniques</TabsTrigger>
                      <TabsTrigger value="history">Antécédents</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="image" className="mt-0">
                    <div className="relative">
                      <img 
                        src={mockAnalysisDetails.imageSrc} 
                        alt={mockAnalysisDetails.imageType} 
                        className="w-full h-auto"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-med-pink bg-opacity-10 pointer-events-none">
                        {mockAnalysisDetails.areas.map((area, index) => (
                          <div 
                            key={index} 
                            className="absolute border-2 border-red-500 animate-pulse rounded-full flex items-center justify-center"
                            style={{ 
                              left: `${area.x/30}px`, 
                              top: `${area.y/30}px`, 
                              width: `${area.width/3}px`, 
                              height: `${area.height/3}px` 
                            }}
                          >
                            <span className="bg-red-500 text-white text-xs px-1 rounded-full absolute -top-6">
                              {index + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">{mockAnalysisDetails.imageType}</h1>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={handleExportPDF}>
                            <Download className="mr-2 h-4 w-4" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleSendEmail}>
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-med-gray mb-6">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {mockAnalysisDetails.date.split('-').reverse().join('/')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {mockAnalysisDetails.time}
                        </div>
                        <div className="flex items-center">
                          <FileImage className="h-4 w-4 mr-1" />
                          {mockAnalysisDetails.format}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="font-medium text-med-gray mb-1">Information</h3>
                        <p className="text-sm">{mockAnalysisDetails.notes}</p>
                      </div>
                      
                      <div className="border-t border-soft-gray pt-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-soft-blue flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-dark-blue text-sm font-bold">Dr</span>
                          </div>
                          <div>
                            <p className="font-medium">{mockAnalysisDetails.doctor}</p>
                            <p className="text-sm text-med-gray">{mockAnalysisDetails.hospital}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-0 p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Spécifications de l'image</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-soft-gray/30 p-3 rounded-lg">
                            <span className="text-sm text-med-gray">Résolution</span>
                            <p className="font-medium">{mockAnalysisDetails.resolution}</p>
                          </div>
                          <div className="bg-soft-gray/30 p-3 rounded-lg">
                            <span className="text-sm text-med-gray">Format</span>
                            <p className="font-medium">{mockAnalysisDetails.format}</p>
                          </div>
                          <div className="bg-soft-gray/30 p-3 rounded-lg">
                            <span className="text-sm text-med-gray">Type d'examen</span>
                            <p className="font-medium">Mammographie</p>
                          </div>
                          <div className="bg-soft-gray/30 p-3 rounded-lg">
                            <span className="text-sm text-med-gray">Tissus analysés</span>
                            <p className="font-medium">{mockAnalysisDetails.tissues}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Zones d'anomalies détectées</h3>
                        <div className="space-y-4">
                          {mockAnalysisDetails.areas.map((area, index) => (
                            <div key={index} className="bg-soft-pink/10 p-4 rounded-lg border-l-2 border-med-pink">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">Anomalie {index + 1}</span>
                                <span className="bg-med-pink/20 text-med-pink px-2 py-0.5 rounded-full text-xs">
                                  Confiance: {area.confidence}%
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mb-2">
                                <div className="text-sm">
                                  <span className="text-med-gray">Taille:</span> {area.size}
                                </div>
                                <div className="text-sm">
                                  <span className="text-med-gray">Classification:</span> {area.classification}
                                </div>
                              </div>
                              <p className="text-sm">{area.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Métriques d'analyse</h3>
                        <div className="flex gap-4">
                          <div className="bg-white shadow-sm rounded-lg p-4 flex-1 text-center">
                            <h4 className="text-sm text-med-gray">Sensibilité</h4>
                            <p className="text-2xl font-bold text-med-pink">{mockAnalysisDetails.sensitivity}</p>
                          </div>
                          <div className="bg-white shadow-sm rounded-lg p-4 flex-1 text-center">
                            <h4 className="text-sm text-med-gray">Spécificité</h4>
                            <p className="text-2xl font-bold text-med-pink">{mockAnalysisDetails.specificity}</p>
                          </div>
                          <div className="bg-white shadow-sm rounded-lg p-4 flex-1 text-center">
                            <h4 className="text-sm text-med-gray">Précision</h4>
                            <p className="text-2xl font-bold text-med-pink">{mockAnalysisDetails.accuracy}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="mt-0 p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Antécédents médicaux</h3>
                        <p className="mb-4">{mockAnalysisDetails.medicalHistory}</p>
                        
                        <div className="bg-soft-gray/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Notes supplémentaires</h4>
                          <p className="text-sm">{mockAnalysisDetails.additionalNotes}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Liste des examens précédents</h3>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-soft-gray/50 px-4 py-2 text-sm font-medium grid grid-cols-12">
                            <div className="col-span-2">Date</div>
                            <div className="col-span-3">Type</div>
                            <div className="col-span-4">Résultat</div>
                            <div className="col-span-3">Médecin</div>
                          </div>
                          <div className="divide-y">
                            <div className="px-4 py-3 text-sm grid grid-cols-12 hover:bg-soft-gray/20">
                              <div className="col-span-2">15/12/2024</div>
                              <div className="col-span-3">Mammographie</div>
                              <div className="col-span-4 flex items-center">
                                <span className="inline-flex items-center">
                                  <Check className="h-3 w-3 mr-1 text-green-500" />
                                  Normal
                                </span>
                              </div>
                              <div className="col-span-3">Dr. Laurent</div>
                            </div>
                            <div className="px-4 py-3 text-sm grid grid-cols-12 hover:bg-soft-gray/20">
                              <div className="col-span-2">03/06/2024</div>
                              <div className="col-span-3">Échographie</div>
                              <div className="col-span-4 flex items-center">
                                <span className="inline-flex items-center">
                                  <Check className="h-3 w-3 mr-1 text-green-500" />
                                  Normal
                                </span>
                              </div>
                              <div className="col-span-3">Dr. Moreau</div>
                            </div>
                            <div className="px-4 py-3 text-sm grid grid-cols-12 hover:bg-soft-gray/20">
                              <div className="col-span-2">10/01/2024</div>
                              <div className="col-span-3">IRM</div>
                              <div className="col-span-4 flex items-center">
                                <span className="inline-flex items-center">
                                  <X className="h-3 w-3 mr-1 text-amber-500" />
                                  Inconclusif
                                </span>
                              </div>
                              <div className="col-span-3">Dr. Bernard</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="font-medium text-med-gray mb-1">Résultat de l'analyse</h3>
                    <h2 className="text-2xl font-bold text-med-pink">{mockAnalysisDetails.result}</h2>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-med-gray">Niveau de confiance</h3>
                      <span className="font-bold">{mockAnalysisDetails.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-med-pink h-full rounded-full" 
                        style={{ width: `${mockAnalysisDetails.confidence}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-med-gray mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {mockAnalysisDetails.areas.map((area, index) => (
                      <div key={index} className="flex items-center bg-soft-pink/10 px-3 py-2 rounded-lg">
                        <div className="w-5 h-5 rounded-full bg-med-pink text-white flex items-center justify-center text-xs mr-2">
                          {index + 1}
                        </div>
                        <div className="flex-grow overflow-hidden">
                          <div className="truncate text-sm font-medium">{area.classification}</div>
                          <div className="text-xs text-med-gray truncate">{area.description.substring(0, 30)}...</div>
                        </div>
                        <span className="text-xs bg-med-pink/20 text-med-pink px-1.5 py-0.5 rounded-full ml-1">
                          {area.confidence}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-soft-pink bg-opacity-20 rounded-lg border border-med-pink border-opacity-20 mb-6">
                    <h3 className="font-medium mb-2 text-med-pink flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Recommandation
                    </h3>
                    <p className="text-sm">{mockAnalysisDetails.recommendation}</p>
                  </div>

                  <div className="pt-4 border-t border-soft-gray">
                    <p className="text-med-gray text-sm italic flex items-start">
                      <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Important :</strong> Ce résultat est généré par une intelligence artificielle et ne constitue pas un diagnostic médical définitif. 
                        Consultez toujours un professionnel de santé qualifié pour une évaluation complète.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Button className="w-full bg-med-pink hover:bg-dark-pink" onClick={() => navigate('/')}>
                  Nouvelle analyse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultDetails;
