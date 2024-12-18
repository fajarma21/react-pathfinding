import { CellCoordinate } from "@/types";

export interface CellProps {
  x: number;
  y: number;
  source?: CellCoordinate;
  fCost: number;
  gCost: number;
  hCost: number;
  indexes: {
    open: number;
    check: number;
    path: number;
  };
  isStart?: boolean;
  isGoal?: boolean;
  isBlocked?: boolean;
  isChecked?: boolean;
  isOpened?: boolean;
  isPath?: boolean;
  size: number;
  onClick: () => void;
}
