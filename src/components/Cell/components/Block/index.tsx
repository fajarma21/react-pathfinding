import React from "react";
import classNames from "classnames";
import css from "./index.module.css";

const Block = () => {
  return (
    <div className={css.blockWrapper}>
      <div className={classNames(css.side, css.top)} />
      <div className={classNames(css.side, css.left)} />
      <div className={classNames(css.side, css.right)} />
      <div className={classNames(css.side, css.front)} />
    </div>
  );
};

export default Block;
