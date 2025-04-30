
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, Mail, ChevronLeft, Calendar, Clock } from 'lucide-react';

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
  notes: 'Image de qualité adéquate. La détection montre une masse potentielle de 1.2 cm dans le quadrant supérieur externe.'
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
                <div className="relative">
                  <img 
                    src={mockAnalysisDetails.imageSrc} 
                    alt={mockAnalysisDetails.imageType} 
                    className="w-full h-auto"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-med-pink bg-opacity-10 pointer-events-none">
                    <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full border-2 border-red-500 animate-pulse"></div>
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

                  <div className="p-4 bg-soft-pink bg-opacity-20 rounded-lg border border-med-pink border-opacity-20 mb-6">
                    <h3 className="font-medium mb-2 text-med-pink">Recommandation</h3>
                    <p className="text-sm">{mockAnalysisDetails.recommendation}</p>
                  </div>

                  <div className="pt-4 border-t border-soft-gray">
                    <p className="text-med-gray text-sm italic">
                      <strong>Important :</strong> Ce résultat est généré par une intelligence artificielle et ne constitue pas un diagnostic médical définitif. 
                      Consultez toujours un professionnel de santé qualifié pour une évaluation complète.
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
