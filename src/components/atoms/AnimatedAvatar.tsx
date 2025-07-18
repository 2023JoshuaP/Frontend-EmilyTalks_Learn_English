import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AnimatedAvatarProps {
  /** URL del GIF animado */
  animatedSrc: string;
  /** URL de la imagen estática (fallback cuando no hay audio) */
  staticSrc: string;
  /** Alt text para la imagen */
  alt: string;
  /** Texto del fallback si no cargan las imágenes */
  fallbackText: string;
  /** Indica si actualmente hay audio reproduciéndose */
  isAudioActive: boolean;
  /** Tamaño del avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Clases adicionales */
  className?: string;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  animatedSrc,
  staticSrc,
  alt,
  fallbackText,
  isAudioActive,
  size = 'md',
  className = ''
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-32 h-32',
    xl: 'w-64 h-64'
  };

  const fallbackSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-2xl',
    xl: 'text-6xl'
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (isAudioActive) {
      // Cambiar a GIF animado y reiniciar la animación
      img.src = `${animatedSrc}?t=${Date.now()}`;
    } else {
      // Cambiar a imagen estática
      img.src = staticSrc;
    }

    // Añadir manejo de errores para imágenes que no cargan
    const handleError = () => {
      console.warn('Error loading image, using fallback');
    };

    img.addEventListener('error', handleError);
    return () => img.removeEventListener('error', handleError);
  }, [isAudioActive, animatedSrc, staticSrc]);

  return (
    <Avatar className={`${sizeClasses[size]} ${className} shadow-2xl border-4 border-white transition-all duration-300`}>
      <AvatarImage 
        ref={imgRef}
        src={isAudioActive ? animatedSrc : staticSrc}
        alt={alt}
        className="object-cover"
      />
      <AvatarFallback className={`gradient-primary text-white ${fallbackSizeClasses[size]}`}>
        {fallbackText}
      </AvatarFallback>
    </Avatar>
  );
};

export default AnimatedAvatar;
