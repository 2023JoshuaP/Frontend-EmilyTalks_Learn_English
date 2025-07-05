import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'gradient-primary text-white shadow-lg hover:shadow-xl focus:ring-green-500',
    secondary: 'gradient-secondary text-white shadow-lg hover:shadow-xl focus:ring-blue-500',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-green-500',
    ghost: 'text-primary hover:bg-green-50 focus:ring-green-500'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
