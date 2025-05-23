export const ROW = 10;
export const COL = 15;

export const CELL_DEFAULT = {
  x: -1,
  y: -1,
  fCost: 0,
  hCost: 0,
  gCost: 0,
  data: {
    open: 0,
    check: 0,
    path: 0,
  },
  status: 0,
};

export const CELL_START = 1;
export const CELL_GOAL = 2;
export const CELL_BLOCK = 3;

export const CELL_TYPES = [
  { value: CELL_START, text: 'Start' },
  { value: CELL_GOAL, text: 'Goal' },
  { value: CELL_BLOCK, text: 'Block' },
];

export const CELL_SIZE = 50;
