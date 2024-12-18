import React, { CSSProperties } from "react";
import classNames from "classnames";

import { CELL_SIZE } from "@/constants";
import parentCss from "@/styles/index.module.css";
import Block from "./components/Block";
import css from "./index.module.css";
import { CellProps } from "./index.types";

const Cell = ({
  indexes,
  isStart = false,
  isGoal = false,
  isBlocked = false,
  size = CELL_SIZE,
  onClick,
}: CellProps) => {
  return (
    <button
      type="button"
      className={css.cell}
      style={
        {
          "--delay": "0ms",
          "--size": `${size > CELL_SIZE ? CELL_SIZE : size}px`,
        } as CSSProperties
      }
      onClick={onClick}
    >
      {indexes.open > 0 && (
        <div
          className={classNames(css.innerCell, css.isOpened)}
          style={{ "--delay": `${indexes.open * 20}ms` } as CSSProperties}
        />
      )}
      {indexes.check > 0 && (
        <div
          className={classNames(css.innerCell, css.isChecked)}
          style={{ "--delay": `${indexes.check * 20}ms` } as CSSProperties}
        />
      )}
      {indexes.path > 0 && (
        <div
          className={classNames(css.innerCell, css.isPath)}
          style={{ "--delay": `${indexes.path * 20}ms` } as CSSProperties}
        />
      )}

      {isBlocked && <Block />}

      {(isStart || isGoal) && (
        <div
          className={classNames(css.innerCell, {
            [parentCss.start]: isStart,
            [parentCss.goal]: isGoal,
          })}
        />
      )}
    </button>
  );
};

export default Cell;
