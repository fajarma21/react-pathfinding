export interface CellCoordinate {
  x: number;
  y: number;
}

export interface GridValue extends CellCoordinate {
  fCost: number;
  hCost: number;
  indexes: {
    open: number;
    check: number;
    path: number;
  };
  gCost: number;
  source?: GridValue;
  type: number;
}
