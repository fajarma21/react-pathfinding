import { CellCoordinate } from '@/types';

export interface CellProps {
  x: number;
  y: number;
  source?: CellCoordinate;
  fCost: number;
  gCost: number;
  hCost: number;
  data: {
    open: number;
    check: number;
    path: number;
  };
  isStart?: boolean;
  isGoal?: boolean;
  isBlock?: boolean;
  isChecked?: boolean;
  isOpened?: boolean;
  isPath?: boolean;
  size: number;
  onClick: () => void;
}
