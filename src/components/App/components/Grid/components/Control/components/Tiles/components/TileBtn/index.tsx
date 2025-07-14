import { cx } from '@emotion/css';
import * as css from './index.styles';
import type { TileBtnProps } from './index.types';

const TileBtn = ({
  checked,
  children,
  className,
  groupName,
  text,
  onChange,
}: TileBtnProps) => {
  return (
    <label className={css.container} role="radio">
      <input
        type="radio"
        name={groupName}
        className={css.input}
        checked={checked}
        onChange={onChange}
      />
      <div className={cx(css.content, className)}>
        {children}
        {text && <p className={css.text}>{text}</p>}
      </div>
    </label>
  );
};

export default TileBtn;
