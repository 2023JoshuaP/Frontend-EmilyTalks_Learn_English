import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProgressCircle from '../components/molecules/ProgressCircle';
import Button from '../components/atoms/Button';
import Logo from '../components/atoms/Logo';
import DownloadPdfButton from '@/components/molecules/DownloadPDFButton';

const Report: React.FC = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<string>('Cargando...');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/conversation/deepseek-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ /* datos necesarios para el endpoint */ })
        });
        const result = await response.text();
        setFeedback(result);
      } catch (error) {
        setFeedback('No se pudo obtener el feedback del backend.');
      }
      setIsLoading(false);
    };
    fetchFeedback();
  }, []);

  const report = {
    generationDate: new Date().toISOString(),
    grammarScore: 80,
    vocabularyScore: 85,
    feedback: feedback
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <Logo size="md" />
        </div>

        <Card className="shadow-2xl border-0 mb-8">
          <CardHeader className="text-center pb-6">
            <h1 className="text-2xl font-bold mb-2">
              Aquí está tu reporte final
            </h1>
            <p className="text-muted-foreground">
              ¡Excelente trabajo en tu práctica de conversación!
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Resumen de la sesión</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {isLoading ? 'Cargando...' : report.feedback}
              </p>
            </div>

            <div className="flex justify-center space-x-12">
              <ProgressCircle
                percentage={90}
                label="Fluidez"
                color="#10b981"
              />
              <ProgressCircle
                percentage={75}
                label="Pronunciación"
                color="#3b82f6"
              />
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3 text-blue-800">Logros de la sesión</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm">Mantuviste una conversación de 15 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm">Usaste 25 palabras nuevas correctamente</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm">Mejoraste tu pronunciación en un 10%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate('/mode')}
                className="flex-1"
                size="lg"
              >
                Repetir práctica
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/home')}
                className="flex-1"
                size="lg"
              >
                Volver a inicio
              </Button>
            </div>

            {/* Mostrar el botón PDF solo cuando el feedback está listo */}
            {!isLoading && feedback && (
              <DownloadPdfButton report={report} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;
