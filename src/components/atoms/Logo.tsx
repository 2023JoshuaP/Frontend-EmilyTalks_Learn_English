import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-32 h-32'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} gradient-primary rounded-2xl flex items-center justify-center animate-float`}>
          <img
            src="/lacasita.webp"
            alt="Logo EmilyTalks"
            className="w-full h-full object-contain rounded-full"
          />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-foreground ${textSizeClasses[size]}`}>
            EmilyTalks
          </span>
          <span className="text-muted-foreground text-sm">Learn English</span>
        </div>
      )}
    </div>
  );
};

export default Logo;