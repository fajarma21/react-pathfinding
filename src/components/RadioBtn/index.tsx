import React from "react";

import css from "./index.module.css";
import { RadioBtnProps } from "./index.types";

const RaidoBtn = ({ checked, children, text, onClick }: RadioBtnProps) => {
  return (
    <button type="button" className={css.radio}>
      <input
        hidden
        type="radio"
        id={text}
        checked={checked}
        onChange={onClick}
      />
      <label htmlFor={text}>
        {children}
        <div>{text}</div>
      </label>
    </button>
  );
};

export default RaidoBtn;