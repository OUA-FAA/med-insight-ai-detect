
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Download, FileImage, Clock, Calendar, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserAnalysisResults } from '@/services/analysisService';
import { AnalysisResult } from '@/types';
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalysisResults = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const results = await getUserAnalysisResults(user.id);
        setAnalyses(results);
      } catch (error) {
        console.error('Error fetching analysis results:', error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer vos analyses",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysisResults();
  }, [user]);

  // Function to format date from ISO string to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Function to extract time from ISO string
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getAnomaliesCount = () => {
    return analyses.filter(analysis => 
      analysis.prediction.toLowerCase().includes('anomalie') || 
      analysis.prediction.toLowerCase().includes('suspect')
    ).length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-soft-gray bg-opacity-30">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Tableau de bord</h1>
              <p className="text-med-gray">
                {profile?.first_name 
                  ? `Bienvenue ${profile.first_name}${profile.last_name ? ' ' + profile.last_name : ''}`
                  : 'Bienvenue sur votre espace personnel'}
              </p>
            </div>
            <Button 
              className="mt-4 md:mt-0" 
              onClick={() => navigate('/')}
            >
              <FileImage className="mr-2 h-4 w-4" /> Nouvelle analyse
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center my-12">
              <Loader2 className="h-8 w-8 animate-spin text-med-blue mr-2" />
              <p>Chargement de vos analyses...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-med-gray">Total analyses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-soft-blue flex items-center justify-center">
                        <FileImage className="h-5 w-5 text-dark-blue" />
                      </div>
                      <span className="text-3xl font-bold">{analyses.length}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-med-gray">Dernière analyse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-soft-green flex items-center justify-center">
                        <Clock className="h-5 w-5 text-med-green" />
                      </div>
                      <span className="text-base font-medium">
                        {analyses.length > 0 ? formatDate(analyses[0].created_at) : 'Aucune analyse'}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-med-gray">Anomalies détectées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-soft-blue flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-dark-blue" />
                      </div>
                      <span className="text-3xl font-bold">{getAnomaliesCount()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-xl font-bold mb-4">Historique des analyses</h2>
              
              {analyses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <FileImage className="h-12 w-12 mx-auto text-med-gray mb-4" />
                  <h3 className="text-xl font-medium mb-2">Aucune analyse trouvée</h3>
                  <p className="text-med-gray mb-6">Vous n'avez pas encore effectué d'analyse d'image</p>
                  <Button onClick={() => navigate('/')}>
                    Analyser une image
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analyses.map((analysis) => (
                    <Card key={analysis.id} className="overflow-hidden card-hover">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={analysis.image_url} 
                          alt={analysis.image_type || 'Image médicale'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=300';
                          }}
                        />
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                          analysis.prediction.toLowerCase().includes('anomalie') || analysis.prediction.toLowerCase().includes('suspect')
                            ? 'bg-destructive/90 text-white' 
                            : 'bg-med-green/90 text-white'
                        }`}>
                          {analysis.confidence.toFixed(1)}% de confiance
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-bold mb-2">{analysis.image_type || 'Image médicale'}</h3>
                        <p className={`text-sm font-medium mb-2 ${
                          analysis.prediction.toLowerCase().includes('anomalie') || analysis.prediction.toLowerCase().includes('suspect')
                            ? 'text-destructive' 
                            : 'text-med-green'
                        }`}>
                          {analysis.prediction}
                        </p>
                        <div className="flex items-center text-xs text-med-gray mb-3">
                          <Calendar className="h-3 w-3 mr-1" /> 
                          {formatDate(analysis.created_at)}
                          <Clock className="h-3 w-3 ml-3 mr-1" /> 
                          {formatTime(analysis.created_at)}
                        </div>
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs"
                            onClick={() => navigate(`/results/${analysis.id}`)}
                          >
                            Voir détails
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-med-gray hover:text-dark-blue"
                            onClick={() => {
                              // Logique d'export en PDF
                              toast({
                                title: "Export PDF",
                                description: "La fonctionnalité d'export en PDF sera bientôt disponible",
                              });
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
