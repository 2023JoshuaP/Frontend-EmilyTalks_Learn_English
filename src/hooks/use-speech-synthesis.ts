import { useState, useEffect, useRef } from 'react';

interface UseSpeechSynthesisReturn {
  /** Indica si actualmente se está reproduciendo audio */
  isSpeaking: boolean;
  /** Función para reproducir texto */
  speak: (text: string, options?: SpeechSynthesisUtteranceOptions) => void;
  /** Función para detener el audio */
  stop: () => void;
  /** Función para pausar el audio */
  pause: () => void;
  /** Función para reanudar el audio */
  resume: () => void;
}

interface SpeechSynthesisUtteranceOptions {
  lang?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);
    const handleSpeechError = () => setIsSpeaking(false);

    // Verificar periódicamente el estado del speechSynthesis
    const checkSpeakingStatus = setInterval(() => {
      setIsSpeaking(speechSynthesis.speaking);
    }, 100);

    return () => {
      clearInterval(checkSpeakingStatus);
      if (utteranceRef.current) {
        utteranceRef.current.removeEventListener('start', handleSpeechStart);
        utteranceRef.current.removeEventListener('end', handleSpeechEnd);
        utteranceRef.current.removeEventListener('error', handleSpeechError);
      }
    };
  }, []);

  const speak = (text: string, options: SpeechSynthesisUtteranceOptions = {}) => {
    // Detener cualquier audio previo
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configurar opciones
    utterance.lang = options.lang || 'en-US';
    utterance.pitch = options.pitch || 1;
    utterance.rate = options.rate || 1;
    utterance.volume = options.volume || 1;
    
    if (options.voice) {
      utterance.voice = options.voice;
    }

    // Event listeners
    utterance.addEventListener('start', () => setIsSpeaking(true));
    utterance.addEventListener('end', () => setIsSpeaking(false));
    utterance.addEventListener('error', () => setIsSpeaking(false));

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const pause = () => {
    speechSynthesis.pause();
  };

  const resume = () => {
    speechSynthesis.resume();
  };

  return {
    isSpeaking,
    speak,
    stop,
    pause,
    resume
  };
};
