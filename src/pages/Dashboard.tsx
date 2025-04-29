
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Download, FileImage, Clock, Calendar } from 'lucide-react';

// Simulons des données d'historique pour le tableau de bord
const mockAnalysisHistory = [
  {
    id: 1,
    date: '2025-04-25',
    time: '14:35',
    imageType: 'Radiographie pulmonaire',
    result: 'Aucune anomalie détectée',
    confidence: 93.5,
    imageSrc: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=300'
  },
  {
    id: 2,
    date: '2025-04-20',
    time: '10:15',
    imageType: 'IRM cérébrale',
    result: 'Suspicion d\'anomalie détectée',
    confidence: 78.2,
    imageSrc: 'https://images.unsplash.com/photo-1559757175-7b46f682a267?auto=format&fit=crop&w=300'
  },
  {
    id: 3,
    date: '2025-04-12',
    time: '16:40',
    imageType: 'Mammographie',
    result: 'Aucune anomalie détectée',
    confidence: 95.1,
    imageSrc: 'https://images.unsplash.com/photo-1516069677022-d9b44967c9b4?auto=format&fit=crop&w=300'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [analyses] = useState(mockAnalysisHistory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-soft-gray bg-opacity-30">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Tableau de bord</h1>
              <p className="text-med-gray">Bienvenue sur votre espace personnel</p>
            </div>
            <Button 
              className="mt-4 md:mt-0" 
              onClick={() => navigate('/')}
            >
              <FileImage className="mr-2 h-4 w-4" /> Nouvelle analyse
            </Button>
          </div>

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
                  <span className="text-base font-medium">{analyses[0].date.split('-').reverse().join('/')}</span>
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
                  <span className="text-3xl font-bold">1</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-bold mb-4">Historique des analyses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyses.map((analysis) => (
              <Card key={analysis.id} className="overflow-hidden card-hover">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={analysis.imageSrc} 
                    alt={analysis.imageType}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                    analysis.result.includes('anomalie') 
                      ? 'bg-destructive/90 text-white' 
                      : 'bg-med-green/90 text-white'
                  }`}>
                    {analysis.confidence.toFixed(1)}% de confiance
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold mb-2">{analysis.imageType}</h3>
                  <p className={`text-sm font-medium mb-2 ${
                    analysis.result.includes('anomalie') 
                      ? 'text-destructive' 
                      : 'text-med-green'
                  }`}>
                    {analysis.result}
                  </p>
                  <div className="flex items-center text-xs text-med-gray mb-3">
                    <Calendar className="h-3 w-3 mr-1" /> 
                    {analysis.date.split('-').reverse().join('/')}
                    <Clock className="h-3 w-3 ml-3 mr-1" /> 
                    {analysis.time}
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
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
