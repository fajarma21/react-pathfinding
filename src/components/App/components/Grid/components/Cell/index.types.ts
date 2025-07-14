import type { GridValue } from '@/types';

export interface CellProps {
  data: GridValue;
  ignoreCost?: boolean;
  showCost?: boolean;
  size: number;
  onClick: () => void;
}
