import { cx } from '@emotion/css';

import * as css from './index.styles';
import { ButtonProps } from './index.types';

const Button = ({
  children,
  className,
  disabled,
  color,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cx(css.btn, className)}
      disabled={disabled}
      data-color={color}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
