import { CELL_CHECK, CELL_OPEN } from './index.constants';
import {
  GetCostParams,
  GetNeighborsParams,
  GetRandomCoordinateParams,
} from './index.types';
import { GridValue } from '@/types';

const getCost = ({ cell, start, goal }: GetCostParams) => {
  const gCostXDiff = Math.abs(cell.x - start.x);
  const gCostYDiff = Math.abs(cell.y - start.y);
  const gCost = gCostXDiff + gCostYDiff;

  const hCostXDiff = Math.abs(cell.x - goal.x);
  const hCostYDiff = Math.abs(cell.y - goal.y);
  const hCost = hCostXDiff + hCostYDiff;
  return {
    gCost,
    hCost,
    fCost: gCost + hCost,
  };
};

export const getNeighbors = ({
  blocked,
  checked,
  count,
  current,
  goal,
  grid,
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
        const isBlocked = blocked.find(
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
          });

          const value = {
            ...col,
            ...costs,
            source: current,
            status: CELL_OPEN,
            data: {
              ...col.data,
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

export const getRandomCoordinate = ({
  maxCol,
  maxRow,
  reserved = { x: 0, y: 0 },
}: GetRandomCoordinateParams) => {
  let x = -1;
  let y = -1;

  while ((x < 0 && y < 0) || (x === reserved.x && y === reserved.y)) {
    x = Math.floor(Math.random() * maxCol);
    y = Math.floor(Math.random() * maxRow);
  }

  return {
    x,
    y,
  };
};
