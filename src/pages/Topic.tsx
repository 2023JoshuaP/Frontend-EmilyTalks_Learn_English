import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import TopicCard from '../components/molecules/TopicCard';
import Button from '../components/atoms/Button';
import Logo from '../components/atoms/Logo';

const Topic: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = [
    { id: 'simple-past', title: 'Simple Past', icon: '📅' },
    { id: 'present-continuous', title: 'Present Continuous', icon: '⏳' },
    { id: 'simple-present', title: 'Simple Present', icon: '📋' },
    { id: 'future-tense', title: 'Future Tense', icon: '🔮' },
    { id: 'past-continuous', title: 'Past Continuous', icon: '🔄' },
    { id: 'present-perfect', title: 'Present Perfect', icon: '✅' },
    { id: 'conditionals', title: 'Conditionals', icon: '❓' },
    { id: 'modal-verbs', title: 'Modal Verbs', icon: '🔀' },
    { id: 'passive-voice', title: 'Passive Voice', icon: '🔁' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <Logo size="md" />
        </div>
        
        <Card className="shadow-2xl border-0 mb-8">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">
              Selecciona el tema gramatical que quieras practicar
            </h1>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  title={topic.title}
                  icon={topic.icon}
                  selected={selectedTopic === topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                onClick={() => navigate('/conversation')}
                disabled={!selectedTopic}
                className="px-8"
                size="lg"
              >
                Practicar tema seleccionado
              </Button>
            </div>
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

export default Topic;