export const ROW = 10;
export const COL = 15;

export const CELL_GRASS = 'grass';
export const CELL_START = 'start';
export const CELL_GOAL = 'goal';
export const CELL_BLOCK = 'block';

export const CELL_TYPE_START = 1;
export const CELL_TYPE_GOAL = 2;
export const CELL_TYPE_BLOCK = 3;
export const CELL_TYPE_CUSTOM = 99;

export const CELL_START_DATA = {
  value: CELL_START,
  text: 'Start',
  type: CELL_TYPE_START,
  cost: 1,
};
export const CELL_GOAL_DATA = {
  value: CELL_GOAL,
  text: 'Goal',
  type: CELL_TYPE_GOAL,
  cost: 1,
};
export const CELL_BLOCK_DATA = {
  value: CELL_BLOCK,
  text: 'Block',
  type: CELL_TYPE_BLOCK,
  multiple: true,
  cost: 0,
};

export const CELL_TYPES = [CELL_START_DATA, CELL_GOAL_DATA, CELL_BLOCK_DATA];

export const DEFAULT_COST = {
  [CELL_GRASS]: 1,
  [CELL_BLOCK]: 0,
};

export const CELL_DEFAULT = {
  x: -1,
  y: -1,
  cost: 1,
  fCost: 0,
  hCost: 0,
  gCost: 0,
  counter: {
    open: 0,
    check: 0,
    path: 0,
  },
  status: 0,
  type: 0,
  value: CELL_GRASS,
};

export const CELL_SIZE = 50;

export const DEFAULT_TILE_COLOR = '#ffffff';
