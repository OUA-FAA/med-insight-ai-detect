
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  FileImage, 
  Microscope, 
  FileText, 
  Info 
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HowItWorksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-med-pink text-dark-gray hover:bg-soft-pink hover:bg-opacity-20">
          <Info className="mr-2 h-4 w-4" />
          Comment ça marche
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Comment <span className="text-med-pink">ça marche</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-6">
          {/* Ligne de connexion entre les étapes sur les écrans moyens et grands */}
          <div className="hidden md:block absolute top-1/3 left-1/2 transform -translate-x-1/2 h-0.5 w-2/3 bg-gradient-to-r from-soft-pink via-med-pink to-soft-pink"></div>

          {/* Étape 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm card-hover relative">
            <div className="w-16 h-16 mx-auto bg-soft-pink rounded-full flex items-center justify-center mb-6">
              <FileImage className="h-8 w-8 text-dark-pink" />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-med-pink rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
            </div>
            <h3 className="font-heading font-bold text-xl mb-3 text-center">Importez votre image</h3>
            <p className="text-med-gray text-center">
              Téléchargez facilement vos mammographies ou autres images liées au cancer.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-1 bg-soft-pink"></div>
            </div>
            
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="details-upload">
                <AccordionTrigger className="text-sm text-med-pink">Voir plus de détails</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-med-gray list-disc pl-5 space-y-1">
                    <li>Formats d'images acceptés: JPG, PNG, DICOM</li>
                    <li>Types d'images: mammographies, radiographies, IRM, scanner CT</li>
                    <li>Chiffrement des données pour protéger votre vie privée</li>
                    <li>Interface intuitive par glisser-déposer ou sélection de fichier</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Étape 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm card-hover relative md:mt-8">
            <div className="w-16 h-16 mx-auto bg-soft-pink rounded-full flex items-center justify-center mb-6">
              <Microscope className="h-8 w-8 text-dark-pink" />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-med-pink rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
            </div>
            <h3 className="font-heading font-bold text-xl mb-3 text-center">Analyse IA Avancée</h3>
            <p className="text-med-gray text-center">
              Nos algorithmes CNN analysent en profondeur vos images médicales avec précision.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-1 bg-soft-pink"></div>
            </div>
            
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="details-ai">
                <AccordionTrigger className="text-sm text-med-pink">Voir plus de détails</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-med-gray list-disc pl-5 space-y-1">
                    <li>Réseaux neuronaux convolutifs (CNN) spécialisés en oncologie</li>
                    <li>Entraînés sur plus de 150 000 images médicales</li>
                    <li>Modèles de deep learning avec précision de 95%</li>
                    <li>Détection des masses, calcifications et autres anomalies</li>
                    <li>Plusieurs couches d'analyse pour réduire les faux positifs</li>
                    <li>Système d'auto-apprentissage pour amélioration continue</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Étape 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm card-hover relative">
            <div className="w-16 h-16 mx-auto bg-soft-pink rounded-full flex items-center justify-center mb-6">
              <FileText className="h-8 w-8 text-dark-pink" />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-med-pink rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
            </div>
            <h3 className="font-heading font-bold text-xl mb-3 text-center">Résultats détaillés</h3>
            <p className="text-med-gray text-center">
              Recevez un rapport complet avec la probabilité de détection et des recommandations spécifiques.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-1 bg-soft-pink"></div>
            </div>
            
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="details-results">
                <AccordionTrigger className="text-sm text-med-pink">Voir plus de détails</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-med-gray list-disc pl-5 space-y-1">
                    <li>Visualisation précise des zones suspectes avec cartographie thermique</li>
                    <li>Classification des anomalies selon les standards médicaux</li>
                    <li>Score BI-RADS (Breast Imaging-Reporting and Data System)</li>
                    <li>Recommandations personnalisées pour le suivi médical</li>
                    <li>Options d'exportation du rapport (PDF, email)</li>
                    <li>Historique des analyses disponible dans votre tableau de bord</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg font-medium mb-6">
            Notre technologie d'IA aide à identifier les anomalies potentielles avec une grande précision
          </p>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-soft-pink bg-opacity-10 p-4 rounded-lg text-center">
                <h4 className="font-bold text-2xl text-med-pink">95%</h4>
                <p className="text-sm text-med-gray">Précision diagnostique</p>
              </div>
              <div className="bg-soft-pink bg-opacity-10 p-4 rounded-lg text-center">
                <h4 className="font-bold text-2xl text-med-pink">&lt;30s</h4>
                <p className="text-sm text-med-gray">Temps d'analyse</p>
              </div>
              <div className="bg-soft-pink bg-opacity-10 p-4 rounded-lg text-center">
                <h4 className="font-bold text-2xl text-med-pink">+150k</h4>
                <p className="text-sm text-med-gray">Images d'entraînement</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksDialog;
