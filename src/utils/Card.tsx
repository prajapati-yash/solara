import React, { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>
    {children}
  </div>
);

interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className = '', children }) => (
  <div className={` ${className}`}>
    {children}
  </div>
);

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className = '', children }) => (
  <h2 className={`text-xl font-semibold ${className}`}>
    {children}
  </h2>
);

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className = '', children }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);