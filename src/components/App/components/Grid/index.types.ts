import { GridValue, type CellCoordinate, type CellTypeData } from '@/types';

export interface GridProps {
  grid: GridValue[][];
  cellSize: number;
}

export interface GenerateCellsParams {
  cellList: CellTypeData[];
  rowLen: number;
  colLen: number;
}

export interface FindCellCostParams {
  x: number;
  y: number;
  others: GridValue[];
}

export interface CountCostParams {
  cell: CellCoordinate;
  ignoreCost?: boolean;
  target: CellCoordinate;
  others: GridValue[];
}

export interface GetCostParams {
  cell: CellCoordinate;
  start: CellCoordinate;
  goal: CellCoordinate;
  ignoreCost?: boolean;
  others: GridValue[];
}

export interface GetNeighborsParams {
  blocks: GridValue[];
  checked: GridValue[];
  current: GridValue;
  goal: GridValue;
  grid: GridValue[][];
  ignoreCost?: boolean;
  count: number;
  otherCells: GridValue[];
  start: GridValue;
}

export interface GetChangeCells {
  cells: GridValue[];
  cell: GridValue;
  newCell: CellTypeData;
}
