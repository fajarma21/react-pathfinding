import { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  horizontal?: boolean;
  title: string;
}
