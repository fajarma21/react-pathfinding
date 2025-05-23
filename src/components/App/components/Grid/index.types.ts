import { CellCoordinate, GridValue } from '@/types';

export interface GridProps {
  grid: GridValue[][];
  cellSize: number;
}

export interface GetCostParams {
  cell: CellCoordinate;
  start: CellCoordinate;
  goal: CellCoordinate;
}

export interface GetNeighborsParams {
  blocked: GridValue[];
  checked: GridValue[];
  current: GridValue;
  goal: GridValue;
  grid: GridValue[][];
  count: number;
  start: GridValue;
}

export interface GetRandomCoordinateParams {
  maxRow: number;
  maxCol: number;
  reserved?: {
    x: number;
    y: number;
  };
}
