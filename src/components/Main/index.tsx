"use client";

import React, { useEffect, useState } from "react";
import { COL, ROW } from "@/constants";
import Grid from "@/components/Grid";
import css from "./index.module.css";
import type { GridValue } from "@/types";

const Main = () => {
  const [gridValue, setGridValue] = useState<GridValue[][]>();

  const handleResetGrid = () => {
    const arr = [];
    for (let i = 0; i < ROW; i++) {
      const row = [];
      for (let j = 0; j < COL; j++) {
        row.push({
          x: j,
          y: i,
          fCost: 0,
          gCost: 0,
          indexes: {
            open: 0,
            check: 0,
            path: 0,
          },
          hCost: 0,
          type: 0,
        });
      }
      arr.push(row);
    }
    setGridValue(arr);
  };

  useEffect(() => {
    if (!gridValue) handleResetGrid();
  }, [gridValue]);

  return (
    <>
      <h1 className={css.title}>A* Pathfinding</h1>
      {gridValue && <Grid grid={gridValue} />}
    </>
  );
};

export default Main;