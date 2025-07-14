export interface CellCoordinate {
  x: number;
  y: number;
}

export interface GridValue extends CellCoordinate {
  color?: string;
  cost: number;
  counter: {
    open: number;
    check: number;
    path: number;
  };
  fCost: number;
  hCost: number;
  gCost: number;
  source?: GridValue;
  status: number;
  value: string;
  type: number;
}

export interface HistoryList {
  dateNumber: number;
  cells: GridValue[];
}

export interface CellTypeData {
  color?: string;
  cost: number;
  multiple?: boolean;
  text: string;
  type: number;
  value: string;
}
