import { cx } from '@emotion/css';
import { CSSProperties } from 'react';

import {
  CELL_SIZE,
  CELL_TYPE_BLOCK,
  CELL_TYPE_CUSTOM,
  CELL_TYPE_GOAL,
  CELL_TYPE_START,
} from '@/constants';
import * as parentCss from '@/styles';

import Block from './components/Block';
import { getDelay } from './index.helpers';
import * as css from './index.styles';
import { CellProps } from './index.types';

const Cell = ({
  data,
  ignoreCost,
  size = CELL_SIZE,
  showCost,
  onClick,
}: CellProps) => {
  const { color, cost, counter, type } = data;

  const isStart = type === CELL_TYPE_START;
  const isGoal = type === CELL_TYPE_GOAL;
  const isBlock = type === CELL_TYPE_BLOCK;
  const isCustom = type === CELL_TYPE_CUSTOM;

  return (
    <button
      type="button"
      className={css.cell}
      style={
        {
          '--size': `${size > CELL_SIZE ? CELL_SIZE : size}px`,
        } as CSSProperties
      }
      onClick={onClick}
    >
      {isBlock && <Block />}

      {(isStart || isGoal) && (
        <div
          className={cx(css.innerCell, {
            [parentCss.start]: isStart,
            [parentCss.goal]: isGoal,
          })}
        />
      )}

      {isCustom && (
        <div className={css.innerCell} style={{ backgroundColor: color }} />
      )}

      {counter.open > 0 && (
        <div
          className={cx(css.innerCell, css.isOpened)}
          style={getDelay(counter.open)}
        />
      )}
      {counter.check > 0 && (
        <div
          className={cx(css.innerCell, css.isChecked)}
          style={getDelay(counter.check)}
        />
      )}
      {counter.path > 0 && (
        <div
          className={cx(css.innerCell, css.isPath)}
          style={getDelay(counter.path)}
        />
      )}
      <div className={css.hover} />
      {showCost && !isStart && !isGoal && (
        <div
          className={css.cost}
          data-cost={cost}
          data-ignore={ignoreCost || undefined}
        />
      )}
    </button>
  );
};

export default Cell;
