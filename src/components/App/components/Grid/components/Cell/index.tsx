import { CSSProperties } from 'react';
import { cx } from '@emotion/css';

import { CELL_SIZE } from '@/constants';
import * as parentCss from '@/styles';

import Block from './components/Block';
import * as css from './index.styles';
import { CellProps } from './index.types';

const Cell = ({
  data,
  isStart = false,
  isGoal = false,
  isBlock = false,
  size = CELL_SIZE,
  onClick,
}: CellProps) => {
  return (
    <button
      type="button"
      className={css.cell}
      style={
        {
          '--delay': '0ms',
          '--size': `${size > CELL_SIZE ? CELL_SIZE : size}px`,
        } as CSSProperties
      }
      onClick={onClick}
    >
      {data.open > 0 && (
        <div
          className={cx(css.innerCell, css.isOpened)}
          style={{ '--delay': `${data.open * 20}ms` } as CSSProperties}
        />
      )}
      {data.check > 0 && (
        <div
          className={cx(css.innerCell, css.isChecked)}
          style={{ '--delay': `${data.check * 20}ms` } as CSSProperties}
        />
      )}
      {data.path > 0 && (
        <div
          className={cx(css.innerCell, css.isPath)}
          style={{ '--delay': `${data.path * 20}ms` } as CSSProperties}
        />
      )}

      {isBlock && <Block />}

      {(isStart || isGoal) && (
        <div
          className={cx(css.innerCell, {
            [parentCss.start]: isStart,
            [parentCss.goal]: isGoal,
          })}
        />
      )}
    </button>
  );
};

export default Cell;
