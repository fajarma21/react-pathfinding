"use client";

import React, { useState } from "react";

import Cell from "@/components/Cell";
import Control from "@/components/Control";
import { CELL_DEFAULT, COL, ROW } from "@/constants";
import { GridValue } from "@/types";

import {
  getLowestFCost,
  getNeighbors,
  getRandomCoordinate,
} from "./index.helpers";
import css from "./index.module.css";
import { GridProps } from "./index.types";

const Grid = ({ grid }: GridProps) => {
  const [cellType, setCellType] = useState(1);
  const [diagobal, setDiagobal] = useState(false);
  const [startCell, setStartCell] = useState<GridValue>(CELL_DEFAULT);
  const [goalCell, setGoalCell] = useState<GridValue>(CELL_DEFAULT);
  const [blockList, setBlockList] = useState<GridValue[]>([]);

  const [openList, setOpenList] = useState<GridValue[]>([]);
  const [checkedList, setCheckedList] = useState<GridValue[]>([]);
  const [path, setPath] = useState<GridValue[]>([]);

  const finished = path.length > 0;

  const handleSearch = () => {
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
        count = neighbors[neighbors.length - 1].indexes.open;
        tempOpenList = [...tempOpenList, ...neighbors];
      }

      if (tempOpenList.length) {
        const lowestCell = getLowestFCost(tempOpenList);

        count += 1;
        const modifiedLowestCell = {
          ...lowestCell,
          indexes: {
            ...lowestCell.indexes,
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
      let tempPath = [];
      let pathIndex = [];
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
              indexes: {
                ...curr.indexes,
                path: pathIndex[pathIndex.length - (prev.length + 1)],
              },
            },
          ];
        },
        []
      );

      setPath(reversedPath);
    } else {
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
    const isBlock = blockList.find(
      (item) => item.x === value.x && item.y === value.y
    );
    const isStart = startCell.x === value.x && startCell.y === value.y;
    const isGoal = goalCell.x === value.x && goalCell.y === value.y;

    if (cellType === 1) {
      if (!isBlock && !isGoal) {
        setStartCell(value);
        handleReset();
      }
    } else if (cellType === 2) {
      if (!isBlock && !isStart) {
        setGoalCell(value);
        handleReset();
      }
    } else {
      if (isBlock) {
        setBlockList((prev) =>
          prev.filter((item) => !(item.x === value.x && item.y === value.y))
        );
      } else setBlockList((prev) => [...prev, value]);
      handleReset();
    }
  };

  const handleClickGenerate = () => {
    handleResetAll();

    //start
    const startRandom = getRandomCoordinate({ maxCol: COL, maxRow: ROW });
    setStartCell((prev) => ({ ...prev, ...startRandom }));

    //goal
    const goalRandom = getRandomCoordinate({
      maxCol: COL,
      maxRow: ROW,
      reserved: startRandom,
    });

    //block
    const randomLimit = Math.floor(Math.random() * 5) + 4;
    for (let i = 0; i < COL; i++) {
      for (let j = 0; j < ROW; j++) {
        if (
          !(i === startRandom.x && j === startRandom.y) &&
          !(i === goalRandom.x && j === goalRandom.y)
        ) {
          const randomValue = Math.floor(Math.random() * 100);
          if (randomValue > randomLimit * 10) {
            setBlockList((prev) => [
              ...prev,
              {
                ...CELL_DEFAULT,
                x: i,
                y: j,
              },
            ]);
          }
        }
      }
    }

    setGoalCell((prev) => ({ ...prev, ...goalRandom }));
  };

  const handleClickType = (value: number) => {
    setCellType(value);
  };

  const handleClickDiagonal = () => {
    setDiagobal((prev) => !prev);
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
                  indexes = {
                    open: 0,
                    check: 0,
                    path: 0,
                  },
                  type = 0,
                } = [...openList, ...checkedList].find(
                  (item) => item.x === col.x && item.y === col.y
                ) || {};
                const isChecked = type === 2;
                const isOpened = type === 1;
                const isPath =
                  finished &&
                  path.find((item) => item.x === col.x && item.y === col.y);

                return (
                  <Cell
                    key={`${indexRow} - ${indexCol}`}
                    {...col}
                    indexes={isPath ? isPath.indexes : indexes}
                    gCost={gCost}
                    hCost={hCost}
                    fCost={fCost}
                    isBlocked={blockList.some(
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
        diagonal={diagobal}
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
    </div>
  );
};

export default Grid;
