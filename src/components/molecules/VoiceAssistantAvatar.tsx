import React from 'react';
import AnimatedAvatar from '../atoms/AnimatedAvatar';

interface VoiceAssistantAvatarProps {
  /** Nombre del asistente */
  name: string;
  /** Descripción del asistente */
  description: string;
  /** URL del GIF animado */
  animatedSrc: string;
  /** URL de la imagen estática */
  staticSrc: string;
  /** Indica si está hablando */
  isSpeaking: boolean;
  /** Indica si está online */
  isOnline?: boolean;
  /** Tamaño del avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Clases adicionales */
  className?: string;
}

const VoiceAssistantAvatar: React.FC<VoiceAssistantAvatarProps> = ({
  name,
  description,
  animatedSrc,
  staticSrc,
  isSpeaking,
  isOnline = true,
  size = 'xl',
  className = ''
}) => {
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const descriptionSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div className={`text-center ${className}`}>
      <div className="relative mb-6">
        <AnimatedAvatar
          animatedSrc={animatedSrc}
          staticSrc={staticSrc}
          alt={name}
          fallbackText={name.charAt(0)}
          isAudioActive={isSpeaking}
          size={size}
        />
        
        {/* Status indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
            <div className={`w-2 h-2 rounded-full ${
              isSpeaking 
                ? 'bg-blue-500 animate-pulse' 
                : isOnline 
                  ? 'bg-blue-500 animate-pulse' 
                  : 'bg-gray-400'
            }`}></div>
            <span className="text-xs font-medium">
              {isSpeaking ? 'Speaking...' : isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
      
      <h2 className={`font-bold text-gray-800 mb-2 ${textSizeClasses[size]}`}>
        {name}
      </h2>
      <p className={`text-gray-600 ${descriptionSizeClasses[size]}`}>
        {description}
      </p>
    </div>
  );
};

export default VoiceAssistantAvatar;
