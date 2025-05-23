export interface CellCoordinate {
  x: number;
  y: number;
}

export interface GridValue extends CellCoordinate {
  fCost: number;
  hCost: number;
  data: {
    open: number;
    check: number;
    path: number;
  };
  gCost: number;
  source?: GridValue;
  status: number;
}

export interface HistoryData {
  block: GridValue[];
  goal: GridValue;
  start: GridValue;
}

export interface HistoryList {
  dateNumber: number;
  block: GridValue[];
  goal: GridValue;
  start: GridValue;
}
