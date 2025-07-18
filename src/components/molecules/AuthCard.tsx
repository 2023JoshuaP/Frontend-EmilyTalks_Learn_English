import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Logo from '../atoms/Logo';

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;