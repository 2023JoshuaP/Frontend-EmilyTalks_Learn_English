import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Info, Settings } from 'lucide-react';
import Button from '../components/atoms/Button';
import Logo from '../components/atoms/Logo';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card className="shadow-2xl border-0 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full transform translate-x-16 -translate-y-16 opacity-30"></div>
          
          <CardHeader className="text-center pb-6 relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1"></div>
              <div className="flex justify-center flex-1">
              </div>
              <div className="flex-1 flex justify-end">
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Info size={20} />
                </button>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              ¡Bienvenido de vuelta!
            </h1>
            <p className="text-muted-foreground">
              Continúa mejorando tu inglés con Emily
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 relative z-10">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center animate-float">
          <img
            src="/lacasita.webp"
            alt="Logo EmilyTalks"
            className="w-full h-full object-contain rounded-full"
          />
              </div>
              <p className="text-muted-foreground mb-6">
                Emily está lista para practicar contigo
              </p>
            </div>
            
            <Button 
              onClick={() => navigate('/mode')}
              className="w-full"
              size="lg"
            >
              Iniciar práctica
            </Button>
            
            <div className="flex justify-center pt-4">
              <button className="p-3 text-muted-foreground hover:text-primary transition-colors">
                <Settings size={24} />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;