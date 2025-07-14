import { cx } from '@emotion/css';
import * as css from './index.styles';
import type { CheckboxProps } from './index.types';

const Checkbox = ({
  className,
  id,
  label,
  name,
  ...restInputProps
}: CheckboxProps) => {
  return (
    <label
      htmlFor={id || name}
      role="checkbox"
      className={cx(css.container, className)}
    >
      <input
        type="checkbox"
        id={id || name}
        name={name || id}
        className={css.input}
        {...restInputProps}
      />
      <div className={css.content}>
        <div className={css.box} />
        {label && <p className={css.text}>{label}</p>}
      </div>
    </label>
  );
};

export default Checkbox;
