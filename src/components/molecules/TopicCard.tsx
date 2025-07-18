import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  title: string;
  icon?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ 
  title, 
  icon = '📚', 
  selected = false, 
  onClick,
  className 
}) => {
  return (
    <Card 
      className={cn(
        'aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 border-2',
        selected ? 'border-primary bg-blue-50' : 'border-border hover:border-primary/50',
        className
      )}
      onClick={onClick}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-sm font-medium text-center px-2">{title}</h3>
    </Card>
  );
};

export default TopicCard;