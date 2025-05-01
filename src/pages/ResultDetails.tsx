
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Calendar, Clock, FileImage, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { AnalysisResult } from '@/types';
import { getAnalysisResultById } from '@/services/analysisService';

const ResultDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      if (!id || !user) return;

      try {
        setIsLoading(true);
        const data = await getAnalysisResultById(id);
        
        if (!data) {
          toast({
            title: "Résultat non trouvé",
            description: "Le résultat demandé n'existe pas ou vous n'avez pas les droits pour y accéder",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        // Check if this result belongs to the current user
        if (data.user_id !== user.id) {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les droits pour accéder à ce résultat",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        setResult(data);
      } catch (error) {
        console.error("Error fetching result:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de l'analyse",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [id, user, navigate, toast]);

  // Function to format date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Function to format time from ISO string
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-med-blue" />
            <p className="text-med-gray">Chargement des détails de l'analyse...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 container-custom">
          <div className="max-w-2xl mx-auto text-center bg-soft-gray p-10 rounded-lg">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Résultat non trouvé</h1>
            <p className="mb-6 text-med-gray">Le résultat d'analyse que vous recherchez n'existe pas ou vous n'avez pas les permissions pour y accéder.</p>
            <Button onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Retour au tableau de bord
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isAnomalyDetected = result.prediction.toLowerCase().includes('anomalie') || 
                           result.prediction.toLowerCase().includes('suspect');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-soft-gray bg-opacity-30">
        <div className="container-custom">
          {/* Navigation */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="pl-0" 
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne de gauche - Image et détails principaux */}
            <div className="lg:col-span-2">
              {/* En-tête avec titre */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Résultat d'analyse</h1>
                <div className="flex items-center text-med-gray">
                  <Calendar className="h-4 w-4 mr-1" /> 
                  {formatDate(result.created_at)}
                  <Clock className="h-4 w-4 ml-3 mr-1" /> 
                  {formatTime(result.created_at)}
                </div>
              </div>

              {/* Card de l'image */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="relative rounded-md overflow-hidden">
                    <img 
                      src={result.image_url} 
                      alt={result.image_type || "Image médicale"} 
                      className="w-full h-auto max-h-96 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800';
                      }}
                    />
                    {result.areas && result.areas.length > 0 && (
                      <svg className="absolute top-0 left-0 w-full h-full">
                        {result.areas.map((area, index) => (
                          <rect
                            key={index}
                            x={`${area.x}%`}
                            y={`${area.y}%`}
                            width={`${area.width}%`}
                            height={`${area.height}%`}
                            className={`${
                              isAnomalyDetected ? 'stroke-destructive' : 'stroke-emerald-500'
                            } stroke-2 fill-transparent`}
                          />
                        ))}
                      </svg>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Résultat principal */}
              <Card className={`mb-6 border-l-4 ${
                isAnomalyDetected ? 'border-l-destructive' : 'border-l-emerald-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {isAnomalyDetected ? (
                      <div className="rounded-full bg-destructive/10 p-2">
                        <AlertCircle className="h-8 w-8 text-destructive" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-emerald-100 p-2">
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                      </div>
                    )}
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        isAnomalyDetected ? 'text-destructive' : 'text-emerald-700'
                      }`}>{result.prediction}</h3>
                      <p className="text-med-gray mb-4">{result.recommendation}</p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        isAnomalyDetected ? 
                          'bg-red-100 text-destructive' : 
                          'bg-green-100 text-emerald-700'
                      }`}>
                        <span className="font-medium mr-1">Confiance:</span> {result.confidence.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Zones détectées */}
              {result.areas && result.areas.length > 0 && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Zones détectées</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {result.areas.map((area, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                          <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{area.classification || `Zone ${index + 1}`}</div>
                            <div className="text-sm text-med-gray">{area.description || 'Aucune description disponible'}</div>
                            <div className="mt-1 text-xs text-med-gray">
                              {area.confidence && (
                                <span className="inline-block mr-3">
                                  Confiance: {area.confidence.toFixed(1)}%
                                </span>
                              )}
                              {area.size && (
                                <span className="inline-block">
                                  Taille: {area.size}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Colonne de droite - Informations supplémentaires */}
            <div>
              {/* Actions */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <Button className="w-full mb-3" onClick={() => {
                    toast({
                      title: "Export PDF",
                      description: "La fonctionnalité d'export en PDF sera bientôt disponible",
                    });
                  }}>
                    <Download className="mr-2 h-4 w-4" /> Télécharger le rapport
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                    <FileImage className="mr-2 h-4 w-4" /> Nouvelle analyse
                  </Button>
                </CardContent>
              </Card>

              {/* Informations de l'image */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Informations de l'image</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-med-gray">Type d'image</dt>
                      <dd className="font-medium">{result.image_type || 'Non spécifié'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-med-gray">Format</dt>
                      <dd className="font-medium">{result.format || 'Non spécifié'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-med-gray">Résolution</dt>
                      <dd className="font-medium">{result.resolution || 'Non spécifié'}</dd>
                    </div>
                    {result.tissues && (
                      <div>
                        <dt className="text-sm text-med-gray">Tissus concernés</dt>
                        <dd className="font-medium">{result.tissues}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>

              {/* Indicateurs de performance */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Indicateurs de performance</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <dl className="space-y-2">
                    {result.sensitivity && (
                      <div>
                        <dt className="text-sm text-med-gray">Sensibilité</dt>
                        <dd className="font-medium">{result.sensitivity}</dd>
                      </div>
                    )}
                    {result.specificity && (
                      <div>
                        <dt className="text-sm text-med-gray">Spécificité</dt>
                        <dd className="font-medium">{result.specificity}</dd>
                      </div>
                    )}
                    {result.accuracy && (
                      <div>
                        <dt className="text-sm text-med-gray">Précision</dt>
                        <dd className="font-medium">{result.accuracy}</dd>
                      </div>
                    )}
                    {result.cancer_risk_score !== null && (
                      <div>
                        <dt className="text-sm text-med-gray">Score de risque</dt>
                        <dd className="font-medium">{result.cancer_risk_score.toFixed(1)}/10</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>

              {/* Notes diagnostiques */}
              {result.diagnostic_notes && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Notes diagnostiques</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-sm">{result.diagnostic_notes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Métadonnées de l'IA */}
              {result.metadata && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Métadonnées de l'analyse</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <dl className="space-y-2 text-sm">
                      {result.metadata.processingTime && (
                        <div>
                          <dt className="text-med-gray">Temps de traitement</dt>
                          <dd>{result.metadata.processingTime}</dd>
                        </div>
                      )}
                      {result.metadata.analysisTechnique && (
                        <div>
                          <dt className="text-med-gray">Technique d'analyse</dt>
                          <dd>{result.metadata.analysisTechnique}</dd>
                        </div>
                      )}
                      {result.metadata.detectionAlgorithm && (
                        <div>
                          <dt className="text-med-gray">Algorithme</dt>
                          <dd>{result.metadata.detectionAlgorithm}</dd>
                        </div>
                      )}
                      {result.metadata.aiModelVersion && (
                        <div>
                          <dt className="text-med-gray">Version du modèle</dt>
                          <dd>{result.metadata.aiModelVersion}</dd>
                        </div>
                      )}
                    </dl>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultDetails;
