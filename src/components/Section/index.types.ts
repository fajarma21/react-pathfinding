import { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  horizontal?: boolean;
  underline?: boolean;
  title: string;
}
