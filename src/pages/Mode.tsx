import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Button from '../components/atoms/Button';
import Logo from '../components/atoms/Logo';

const Mode: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <Logo size="md" />
        </div>
        
        <Card className="shadow-2xl border-0 mb-8">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">
              Selecciona tu modo de práctica
            </h1>
            
            <div className="space-y-6">
              <div 
                className="p-6 border-2 border-dashed border-primary/30 rounded-xl hover:border-primary/60 hover:bg-green-50 transition-all cursor-pointer group"
                onClick={() => navigate('/scenario')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🗣️</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Modo Libre</h3>
                  <p className="text-muted-foreground text-sm">
                    Conversación natural sobre cualquier tema que elijas
                  </p>
                </div>
              </div>
              
              <div 
                className="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
                onClick={() => navigate('/topic')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Tema Específico</h3>
                  <p className="text-muted-foreground text-sm">
                    Practica vocabulario y expresiones de temas concretos
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <button 
            onClick={() => navigate('/home')}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mode;