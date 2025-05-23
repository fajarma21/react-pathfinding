import { ReactNode } from 'react';

export interface ItemProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}
