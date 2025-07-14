import {
  CELL_DEFAULT,
  CELL_TYPE_BLOCK,
  CELL_TYPE_GOAL,
  CELL_TYPE_START,
} from '@/constants';
import type { CellTypeData, GridValue } from '@/types';

import { CELL_CHECK, CELL_OPEN } from './index.constants';
import type {
  CountCostParams,
  FindCellCostParams,
  GenerateCellsParams,
  GetChangeCells,
  GetCostParams,
  GetNeighborsParams,
} from './index.types';

export const generateCells = ({
  cellList,
  colLen,
  rowLen,
}: GenerateCellsParams) => {
  const singleRandom: GridValue[] = [];
  const multipleRandom: GridValue[] = [];
  const multipleList: CellTypeData[] = [];

  for (const cell of cellList) {
    if (cell.multiple) multipleList.push(cell);
    else {
      let x = -1;
      let y = -1;

      let isReserved = singleRandom.some(
        (item) => item.x === x && item.y === y
      );

      while ((x < 0 && y < 0) || isReserved) {
        y = Math.floor(Math.random() * rowLen);
        x = Math.floor(Math.random() * colLen);
      }

      singleRandom.push({
        ...CELL_DEFAULT,
        ...cell,
        x,
        y,
      });
    }
  }

  const randomThreshold = Math.floor(Math.random() * 5) + 4;
  for (let x = 0; x < colLen; x++) {
    for (let y = 0; y < rowLen; y++) {
      let isReserved = singleRandom.some(
        (item) => item.x === x && item.y === y
      );

      if (!isReserved) {
        const randomValue = Math.floor(Math.random() * 100);
        if (randomValue > randomThreshold * 10) {
          const cellIndex = Math.floor(Math.random() * multipleList.length);
          const cell = multipleList[cellIndex];
          multipleRandom.push({
            ...CELL_DEFAULT,
            ...cell,
            x,
            y,
          });
        }
      }
    }
  }

  return [...singleRandom, ...multipleRandom];
};

export const groupCells = (cells: GridValue[]) => {
  let start: GridValue | undefined;
  let goal: GridValue | undefined;
  let blocks: GridValue[] = [];
  let otherCells: GridValue[] = [];

  for (const cell of cells) {
    const cellType = cell.type;
    if (cellType === CELL_TYPE_START) start = cell;
    else if (cellType === CELL_TYPE_GOAL) goal = cell;
    else if (cellType === CELL_TYPE_BLOCK) blocks.push(cell);
    else otherCells.push(cell);
  }

  return { start, goal, blocks, otherCells };
};

const findCellCost = ({ x, y, others }: FindCellCostParams) => {
  const cellData = others.find((item) => item.x === x && item.y === y);
  return cellData ? cellData.cost : 1;
};

const countCost = ({ cell, ignoreCost, target, others }: CountCostParams) => {
  const costXDiff = Math.abs(cell.x - target.x);
  const costYDiff = Math.abs(cell.y - target.y);

  if (ignoreCost) return costXDiff + costYDiff;
  else {
    let costX = findCellCost({ x: cell.x, y: cell.y, others });
    let costY = findCellCost({ x: cell.x, y: cell.y, others });

    let newY = target.y;
    for (let x = 1; x <= costXDiff; x++) {
      const newX = cell.x > target.x ? cell.x - x : cell.x + x;
      costX += findCellCost({ x: newX, y: newY, others });
    }
    let newX = target.x;
    for (let y = 1; y <= costYDiff; y++) {
      const newY = cell.y > target.y ? cell.y - y : cell.y + y;
      costY += findCellCost({ x: newX, y: newY, others });
    }

    return costX + costY;
  }
};

const getCost = ({ cell, start, goal, ignoreCost, others }: GetCostParams) => {
  const gCost = countCost({ cell, ignoreCost, target: start, others });
  const hCost = countCost({ cell, ignoreCost, target: goal, others });

  return {
    gCost,
    hCost,
    fCost: gCost + hCost,
  };
};

export const getNeighbors = ({
  blocks,
  checked,
  count,
  current,
  goal,
  grid,
  ignoreCost = false,
  otherCells,
  start,
}: GetNeighborsParams) => {
  const tempNeighbors: GridValue[] = [];
  const currX = current.x;
  const currY = current.y;

  for (const row of grid) {
    for (const col of row) {
      const isTop = currY - 1 >= 0 && col.y === currY - 1 && col.x === currX;
      const isRigth =
        currX + 1 <= row.length - 1 && col.y === currY && col.x === currX + 1;
      const isBottom =
        currY + 1 <= grid.length - 1 && col.y === currY + 1 && col.x === currX;
      const isLeft = currX - 1 >= 0 && col.y === currY && col.x === currX - 1;

      if (isTop || isRigth || isBottom || isLeft) {
        const isStart = col.x === start.x && col.y === start.y;
        const isBlocked = blocks.find(
          (item) => item.x === col.x && item.y === col.y
        );
        const isChecked = checked.find(
          (item) => item.x === col.x && item.y === col.y
        );
        if (!isStart && !isBlocked && !isChecked) {
          const costs = getCost({
            cell: col,
            start: start,
            goal: goal,
            ignoreCost,
            others: otherCells,
          });

          const value = {
            ...col,
            ...costs,
            source: current,
            status: CELL_OPEN,
            counter: {
              ...col.counter,
              open: count + tempNeighbors.length + 1,
            },
          };

          tempNeighbors.push(value);
        }
      }
    }
  }

  return tempNeighbors;
};

export const getLowestFCost = (list: GridValue[]) => {
  const sorted = list.sort((a, b) => {
    // if (a.fCost === b.fCost) {
    //   return a.hCost - b.hCost;
    // }
    return a.fCost - b.fCost;
  });
  return {
    ...sorted[0],
    status: CELL_CHECK,
  };
};

const handleMultiCell = (cells: GridValue[], newCell: CellTypeData) => {
  if (newCell.multiple) return cells;
  return cells.filter((item) => item.type !== newCell.type);
};

export const getChangedCells = ({ cells, cell, newCell }: GetChangeCells) => {
  let newCells = cells;

  const isFilled = cells.find((item) => item.x === cell.x && item.y === cell.y);

  if (isFilled) {
    if (isFilled.value === newCell.value) {
      newCells = newCells.filter(
        (item) => item.x !== cell.x || item.y !== cell.y
      );
    } else {
      newCells = handleMultiCell(cells, newCell);

      newCells = newCells.map((item) => {
        if (item.x === cell.x && item.y === cell.y)
          return { ...item, ...newCell };
        return item;
      });
    }
  } else {
    newCells = handleMultiCell(cells, newCell);
    newCells = [...newCells, { ...cell, ...newCell }];
  }

  return newCells;
};
