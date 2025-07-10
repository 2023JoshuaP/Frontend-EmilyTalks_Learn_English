import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import Button from '../components/atoms/Button';
import Logo from '../components/atoms/Logo';

interface Message {
  id: string;
  speaker: 'user' | 'emily';
  text: string;
  timestamp: Date;
}

const Conversation: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      speaker: 'emily',
      text: 'Hello! Welcome to our conversation practice. I\'m Emily, and I\'m here to help you improve your English. What would you like to talk about today?',
      timestamp: new Date()
    }
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleEndConversation = () => {
    navigate('/report');
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append("file", audioBlob, "recording.webm");

          try {
            const response = await fetch("http://localhost:8080/api/conversation/converse", {
              method: "POST",
              headers: {
                "X-User-Id": "demo"
              },
              body: formData
            });

            if (!response.ok) throw new Error("Error al enviar el audio");

            const data = await response.json();

            const userMessage: Message = {
              id: Date.now().toString(),
              speaker: 'user',
              text: data.userUtterance,
              timestamp: new Date()
            };

            const emilyMessage: Message = {
              id: (Date.now() + 1).toString(),
              speaker: 'emily',
              text: data.agentResponse,
              timestamp: new Date()
            };

            setMessages((prev) => [...prev, userMessage, emilyMessage]);
            const utterance = new SpeechSynthesisUtterance(data.agentResponse);
            utterance.lang = 'en-US';
            utterance.pitch = 1;
            utterance.rate = 1;
            speechSynthesis.speak(utterance);

          } catch (error) {
            console.error("Error en la conversación:", error);
          }

          stream.getTracks().forEach(track => track.stop());
          setAudioChunks([]);
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
        setAudioChunks(chunks);
        setIsRecording(true);

      } catch (err) {
        console.error("No se pudo acceder al micrófono:", err);
      }

    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face" alt="Emily" />
              <AvatarFallback className="gradient-primary text-white">E</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium">Emily</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleEndConversation}>
            Finalizar
          </Button>
        </div>
      </div>

      {/* Main Content - Split Screen */}
      <div className="flex-1 flex">
        {/* Left Side - AI Avatar */}
        <div className="w-1/2 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="relative mb-6">
              <Avatar className="w-64 h-64 mx-auto shadow-2xl border-4 border-white">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop&crop=face" 
                  alt="Emily" 
                  className="object-cover"
                />
                <AvatarFallback className="gradient-primary text-white text-6xl">E</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Speaking...</span>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Emily</h2>
            <p className="text-gray-600">Your AI English Tutor</p>
          </div>
        </div>

        {/* Right Side - Conversation */}
        <div className="w-1/2 flex flex-col">
          {/* Chat Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4 max-w-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-xs ${
                    message.speaker === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      {message.speaker === 'emily' ? (
                        <>
                          <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face" />
                          <AvatarFallback className="gradient-primary text-white text-xs">E</AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="bg-blue-500 text-white text-xs">U</AvatarFallback>
                      )}
                    </Avatar>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.speaker === 'user' 
                        ? 'gradient-primary text-white' 
                        : 'bg-white shadow-md border'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${
                          message.speaker === 'user' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.speaker === 'emily' && (
                          <button className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <Volume2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Input Area */}
          <div className="p-6 bg-white/80 backdrop-blur-sm border-t">
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={toggleRecording}
                  className={`p-6 rounded-full transition-all duration-200 shadow-lg ${
                    isRecording 
                      ? 'bg-red-500 text-white shadow-red-200 animate-pulse scale-110' 
                      : 'gradient-primary text-white hover:scale-105'
                  }`}
                >
                  {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
                </button>
                <p className="text-sm text-muted-foreground text-center">
                  {isRecording ? 'Listening... Speak now' : 'Tap to speak'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
