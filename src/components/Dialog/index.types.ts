import type { ReactNode } from 'react';

export interface DialogProps {
  children: ReactNode;
  className?: string;
  display: boolean;
  onClose: () => void;
}
