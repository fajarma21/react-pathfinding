import { useState } from 'react';

import {
  CELL_BLOCK,
  CELL_DEFAULT,
  CELL_GOAL,
  CELL_START,
  COL,
  ROW,
} from '@/constants';
import useHistory from '@/hooks/useHistory';
import { GridValue, HistoryList } from '@/types';

import Cell from './components/Cell';
import Control from './components/Control';
import { CELL_CHECK, CELL_OPEN } from './index.constants';
import {
  getLowestFCost,
  getNeighbors,
  getRandomCoordinate,
} from './index.helpers';
import * as css from './index.styles';
import { GridProps } from './index.types';
import History from './components/History';

const Grid = ({ cellSize, grid }: GridProps) => {
  const [cellType, setCellType] = useState(1);
  const [diagonal, setDiagonal] = useState(false);
  const [startCell, setStartCell] = useState<GridValue>(CELL_DEFAULT);
  const [goalCell, setGoalCell] = useState<GridValue>(CELL_DEFAULT);
  const [blockList, setBlockList] = useState<GridValue[]>([]);

  const [openList, setOpenList] = useState<GridValue[]>([]);
  const [checkedList, setCheckedList] = useState<GridValue[]>([]);
  const [path, setPath] = useState<GridValue[]>([]);

  const {
    historyList,
    selectedHistory,
    handleAddHistory,
    handleDeleteHistory,
    setSelectedHistory,
  } = useHistory({ block: blockList, goal: goalCell, start: startCell });

  const finished = path.length > 0;

  const handleSearch = () => {
    if (!selectedHistory) handleAddHistory();

    let count = 0;
    let tempCurrentCell = startCell;
    let tempOpenList: GridValue[] = openList;
    let tempCheckedList = checkedList;
    let tempFinished;
    while (!tempFinished) {
      const neighbors = getNeighbors({
        blocked: blockList,
        checked: tempCheckedList,
        count,
        current: tempCurrentCell,
        goal: goalCell,
        grid: grid,
        start: startCell,
      });

      if (neighbors.length) {
        count = neighbors[neighbors.length - 1].data.open;
        tempOpenList = [...tempOpenList, ...neighbors];
      }

      if (tempOpenList.length) {
        const lowestCell = getLowestFCost(tempOpenList);

        count += 1;
        const modifiedLowestCell = {
          ...lowestCell,
          data: {
            ...lowestCell.data,
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
          tempCurrentCell.x === goalCell.x && tempCurrentCell.y === goalCell.y;
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
              data: {
                ...curr.data,
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

  const handleReset = () => {
    setOpenList([]);
    setCheckedList([]);
    setPath([]);
  };

  const handleResetAll = () => {
    setStartCell(CELL_DEFAULT);
    setGoalCell(CELL_DEFAULT);
    setBlockList([]);
    setOpenList([]);
    setCheckedList([]);
    setPath([]);
  };

  const handleClickCell = (value: GridValue) => {
    setSelectedHistory(0);

    const isBlock = blockList.find(
      (item) => item.x === value.x && item.y === value.y
    );
    const isStart = startCell.x === value.x && startCell.y === value.y;
    const isGoal = goalCell.x === value.x && goalCell.y === value.y;

    if (isBlock) {
      setBlockList((prev) =>
        prev.filter((item) => !(item.x === value.x && item.y === value.y))
      );
    } else if (cellType === CELL_START) {
      if (!isGoal) setStartCell(value);
    } else if (cellType === CELL_GOAL) {
      if (!isStart) setGoalCell(value);
    } else {
      if (!isStart && !isGoal) setBlockList((prev) => [...prev, value]);
    }
    handleReset();
  };

  const handleClickGenerate = () => {
    handleResetAll();
    setCellType(CELL_BLOCK);

    //start
    const startRandom = {
      ...CELL_DEFAULT,
      ...getRandomCoordinate({ maxCol: COL, maxRow: ROW }),
    };
    setStartCell(startRandom);

    //goal
    const goalRandom = {
      ...CELL_DEFAULT,
      ...getRandomCoordinate({
        maxCol: COL,
        maxRow: ROW,
        reserved: startRandom,
      }),
    };
    setGoalCell(goalRandom);

    //block
    const blockRandom: GridValue[] = [];
    const randomLimit = Math.floor(Math.random() * 5) + 4;
    for (let i = 0; i < COL; i++) {
      for (let j = 0; j < ROW; j++) {
        if (
          !(i === startRandom.x && j === startRandom.y) &&
          !(i === goalRandom.x && j === goalRandom.y)
        ) {
          const randomValue = Math.floor(Math.random() * 100);
          if (randomValue > randomLimit * 10) {
            const blockCell = {
              ...CELL_DEFAULT,
              x: i,
              y: j,
            };
            setBlockList((prev) => [...prev, blockCell]);
            blockRandom.push(blockCell);
          }
        }
      }
    }

    handleAddHistory({
      block: blockRandom,
      goal: goalRandom,
      start: startRandom,
    });
  };

  const handleClickType = (value: number) => {
    setCellType(value);
  };

  const handleClickDiagonal = () => {
    setDiagonal((prev) => !prev);
  };

  const handleClickHistory = (value: HistoryList) => {
    handleResetAll();
    setSelectedHistory(value.dateNumber);
    setGoalCell(value.goal);
    setStartCell(value.start);
    setBlockList(value.block);
  };

  return (
    <div className={css.container}>
      <div className={css.gridWrapper}>
        <div className={css.grid}>
          {grid.map((row, indexRow) => (
            <div key={indexRow} className={css.row}>
              {row.map((col, indexCol) => {
                const {
                  gCost = 0,
                  hCost = 0,
                  fCost = 0,
                  data = {
                    open: 0,
                    check: 0,
                    path: 0,
                  },
                  status = 0,
                } = [...openList, ...checkedList].find(
                  (item) => item.x === col.x && item.y === col.y
                ) || {};
                const isChecked = status === CELL_CHECK;
                const isOpened = status === CELL_OPEN;
                const isPath =
                  finished &&
                  path.find((item) => item.x === col.x && item.y === col.y);

                return (
                  <Cell
                    key={`${indexRow} - ${indexCol}`}
                    {...col}
                    size={cellSize}
                    data={isPath ? isPath.data : data}
                    gCost={gCost}
                    hCost={hCost}
                    fCost={fCost}
                    isBlock={blockList.some(
                      (item) => item.x === col.x && item.y === col.y
                    )}
                    isChecked={isChecked}
                    isOpened={isOpened}
                    isStart={col.x === startCell.x && col.y === startCell.y}
                    isGoal={col.x === goalCell.x && col.y === goalCell.y}
                    isPath={Boolean(isPath)}
                    onClick={() => handleClickCell(col)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <Control
        cellType={cellType}
        diagonal={diagonal}
        resetDisabled={
          !(finished || (!openList.length && Boolean(checkedList.length)))
        }
        searchDisabled={
          finished ||
          startCell.x + startCell.y < 0 ||
          goalCell.x + goalCell.y < 0
        }
        onClickDiagonal={handleClickDiagonal}
        onClickGenerate={handleClickGenerate}
        onClickReset={handleReset}
        onClickSearch={handleSearch}
        onClickType={handleClickType}
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
