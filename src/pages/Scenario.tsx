import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ShoppingCart, Utensils, Plane, Hotel, Stethoscope, BriefcaseBusiness } from 'lucide-react';
import Button from '../components/atoms/Button';
import Logo from '../components/atoms/Logo';

const Scenario: React.FC = () => {
  const navigate = useNavigate();
  const [currentScenario, setCurrentScenario] = useState(0);

  const scenarios = [
    { id: 'interview', title: 'Entrevista de trabajo', icon: BriefcaseBusiness },
    { id: 'shopping', title: 'En el supermercado', icon: ShoppingCart },
    { id: 'restaurant', title: 'En el restaurante', icon: Utensils },
    { id: 'airport', title: 'En el aeropuerto', icon: Plane },
    { id: 'hotel', title: 'En el hotel', icon: Hotel },
    { id: 'doctor', title: 'En el médico', icon: Stethoscope }
  ];

  const handleClick = async (scenarioId: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/conversation/prepare-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenario: scenarioId,
          topic: "free",
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la conexión con la API");
      }

      const data = await response.json();

      navigate('/conversation');
    } catch (error) {
      console.error(error);
    }
  }

  
  const nextScenario = () => {
    setCurrentScenario((prev) => (prev + 1) % scenarios.length);
  };

  const prevScenario = () => {
    setCurrentScenario((prev) => (prev - 1 + scenarios.length) % scenarios.length);
  };

  const CurrentIcon = scenarios[currentScenario].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <Logo size="md" />
        </div>
        
        <Card className="shadow-2xl border-0 mb-8">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-12">
              Elige tu escenario
            </h1>
            
            <div className="flex items-center justify-center mb-12">
              <button 
                onClick={prevScenario}
                className="p-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
              
              <div className="mx-8 text-center flex-1">
                <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
                  <CurrentIcon size={40} className="text-white" />
                </div>
                <h3 className="font-bold text-lg">
                  {scenarios[currentScenario].title}
                </h3>
              </div>
              
              <button 
                onClick={nextScenario}
                className="p-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {scenarios.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentScenario ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => handleClick(scenarios[currentScenario].id)}
              className="w-full"
              size="lg"
            >
              Iniciar práctica
            </Button>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <button 
            onClick={() => navigate('/mode')}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            ← Volver a modo de práctica
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scenario;