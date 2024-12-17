import React from "react";
import classNames from "classnames";
import css from "./index.module.css";
import { ControlGroupProps } from "./index.types";

const ControlGroup = ({ title, children, classname }: ControlGroupProps) => {
  return (
    <div className={classNames(css.controlGroup, classname)}>
      <h3 className={css.groupTitle}>{title}</h3>
      <div className={css.groupContent}>{children}</div>
    </div>
  );
};

export default ControlGroup;
