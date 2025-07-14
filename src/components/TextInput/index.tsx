import { cx } from '@emotion/css';
import * as css from './index.styles';
import type { TextInputProps } from './index.types';

const TextInput = ({
  autoComplete,
  horizontal,
  id,
  label,
  name,
  type,
  className,
  ...restInputProps
}: TextInputProps) => {
  return (
    <div
      className={cx(css.inputGroup, className)}
      data-horizontal={horizontal || undefined}
    >
      {label && (
        <label htmlFor={id || name} className={css.labelModifier}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name || id}
        className={css.inputModifier}
        autoComplete={autoComplete || 'off'}
        {...restInputProps}
      />
    </div>
  );
};

export default TextInput;
