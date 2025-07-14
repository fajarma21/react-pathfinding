import { useState } from 'react';

import { CELL_TYPE_GOAL, CELL_TYPE_START } from '@/constants';
import useHistory from '@/hooks/useHistory';
import useCustomCell from '@/stores/useCustomCell';
import useOptions from '@/stores/useOptions';
import { type GridValue, type HistoryList } from '@/types';

import useSelectedCell from '@/stores/useSelectedCell';
import Cell from './components/Cell';
import Control from './components/Control';
import History from './components/History';
import {
  generateCells,
  getChangedCells,
  getLowestFCost,
  getNeighbors,
  groupCells,
} from './index.helpers';
import * as css from './index.styles';
import type { GridProps } from './index.types';

const Grid = ({ cellSize, grid }: GridProps) => {
  const selectedCell = useSelectedCell((state) => state.selectedCell);
  const cellList = useCustomCell((state) => state.cellList);
  const ignoreCost = useOptions((state) => state.ignoreCost);
  const showCost = useOptions((state) => state.showCost);

  const [changedCells, setChangedCells] = useState<GridValue[]>([]);

  const [openList, setOpenList] = useState<GridValue[]>([]);
  const [checkedList, setCheckedList] = useState<GridValue[]>([]);
  const [path, setPath] = useState<GridValue[]>([]);

  const finished = path.length > 0;
  const resetDisabled = !(
    finished ||
    (!openList.length && Boolean(checkedList.length))
  );
  const searchDisabled =
    finished ||
    changedCells.filter(
      (item) => item.type === CELL_TYPE_START || item.type === CELL_TYPE_GOAL
    ).length < 2;

  const {
    historyList,
    selectedHistory,
    handleAddHistory,
    handleDeleteHistory,
    setSelectedHistory,
  } = useHistory(changedCells);

  const handleReset = () => {
    setOpenList([]);
    setCheckedList([]);
    setPath([]);
  };

  const handleResetAll = () => {
    handleReset();
    setChangedCells([]);
  };

  const handleClickHistory = (value: HistoryList) => {
    handleResetAll();
    setSelectedHistory(value.dateNumber);
    setChangedCells(value.cells);
  };

  const handleClickCell = (value: GridValue) => {
    setSelectedHistory(0);

    const newChangedCells = getChangedCells({
      cells: changedCells,
      cell: value,
      newCell: selectedCell,
    });
    setChangedCells(newChangedCells);

    handleReset();
  };

  const handleClickGenerate = () => {
    handleResetAll();

    const generatedCells = generateCells({
      cellList,
      colLen: grid[0].length,
      rowLen: grid.length,
    });
    setChangedCells(generatedCells);
    handleAddHistory(generatedCells);
  };

  const handleSearch = () => {
    if (!selectedHistory) handleAddHistory();

    const { start, goal, blocks, otherCells } = groupCells(changedCells);

    if (!start || !goal) return;

    let count = 0;
    let tempCurrentCell = start;
    let tempOpenList = openList;
    let tempCheckedList = checkedList;
    let tempFinished;

    while (!tempFinished) {
      const neighbors = getNeighbors({
        blocks,
        count,
        checked: tempCheckedList,
        current: tempCurrentCell,
        goal,
        grid,
        ignoreCost,
        otherCells,
        start,
      });

      if (!neighbors) break;

      if (neighbors.length) {
        count = neighbors[neighbors.length - 1].counter.open;
        tempOpenList = [...tempOpenList, ...neighbors];
      }

      if (tempOpenList.length) {
        const lowestCell = getLowestFCost(tempOpenList);

        count += 1;
        const modifiedLowestCell = {
          ...lowestCell,
          counter: {
            ...lowestCell.counter,
            check: count,
          },
        };
        tempCheckedList = [...tempCheckedList, modifiedLowestCell];
        tempOpenList = tempOpenList.filter(
          (item) =>
            !(
              item.x === modifiedLowestCell.x && item.y === modifiedLowestCell.y
            )
        );

        tempCurrentCell = modifiedLowestCell;
        tempFinished =
          tempCurrentCell.x === goal.x && tempCurrentCell.y === goal.y;
      } else break;
    }

    if (tempFinished) {
      const tempPath: GridValue[] = [];
      const pathIndex: number[] = [];
      let currPath = tempCheckedList[tempCheckedList.length - 1];
      while (currPath.source) {
        const currSource = currPath.source;
        if (currSource) {
          tempPath.push(currSource);
          pathIndex.push(count + tempPath.length + 1);
          currPath = tempPath[tempPath.length - 1];
        }
      }

      const reversedPath = tempPath.reduce(
        (prev: GridValue[], curr: GridValue) => {
          return [
            ...prev,
            {
              ...curr,
              counter: {
                ...curr.counter,
                path: pathIndex[pathIndex.length - (prev.length + 1)],
              },
            },
          ];
        },
        []
      );
      setPath(reversedPath);
    }

    setCheckedList(tempCheckedList);
    setOpenList(tempOpenList);
  };

  return (
    <div className={css.container}>
      <div className={css.gridWrapper}>
        <div className={css.grid}>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className={css.row}>
              {row.map((cell, cellIdx) => {
                const newCell =
                  changedCells.find(
                    (item) => item.x === cell.x && item.y === cell.y
                  ) || cell;
                const pathCell = path.find(
                  (item) => item.x === cell.x && item.y === cell.y
                );
                const processedCell = [...openList, ...checkedList].find(
                  (item) => item.x === cell.x && item.y === cell.y
                );

                const counterCell = pathCell || processedCell || newCell;
                return (
                  <Cell
                    key={`${rowIdx}-${cellIdx}`}
                    data={{ ...newCell, counter: counterCell.counter }}
                    ignoreCost={ignoreCost}
                    size={cellSize}
                    showCost={showCost}
                    onClick={() => handleClickCell(newCell)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <Control
        resetDisabled={resetDisabled}
        searchDisabled={searchDisabled}
        onClickGenerate={handleClickGenerate}
        onClickReset={handleReset}
        onClickSearch={handleSearch}
      />

      {historyList.length > 0 && (
        <History
          selected={selectedHistory}
          list={historyList}
          onDelete={handleDeleteHistory}
          onClick={handleClickHistory}
        />
      )}
    </div>
  );
};

export default Grid;
