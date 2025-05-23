import { CELL_DEFAULT, COL, ROW } from '@/constants';

export const initGrid = () => {
  const arr = [];
  for (let i = 0; i < ROW; i++) {
    const row = [];
    for (let j = 0; j < COL; j++) {
      row.push({
        ...CELL_DEFAULT,
        x: j,
        y: i,
      });
    }
    arr.push(row);
  }

  return arr;
};
