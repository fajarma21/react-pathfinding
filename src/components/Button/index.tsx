import React from "react";
import classNames from "classnames";
import css from "./index.module.css";
import { ButtonProps } from "./index.types";

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
      className={classNames(css.btn, css[color], className)}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
