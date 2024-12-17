export const ROW = 10;
export const COL = 15;

export const CELL_DEFAULT = {
  x: -1,
  y: -1,
  fCost: 0,
  hCost: 0,
  gCost: 0,
  indexes: {
    open: 0,
    check: 0,
    path: 0,
  },
  type: 0,
};

export const CELL_TYPES = [
  { value: 1, text: "Start" },
  { value: 2, text: "Goal" },
  { value: 3, text: "Block" },
];
