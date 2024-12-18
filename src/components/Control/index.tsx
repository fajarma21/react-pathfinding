import React from "react";

import Button from "@/components/Button";
// import Checkbox from "@/components/Checkbox";
import RaidoBtn from "@/components/RadioBtn";
import { CELL_TYPES } from "@/constants";
import parentCss from "@/styles/index.module.css";

import css from "./index.module.css";
import type { ControlProps } from "./index.types";
import ControlGroup from "./components/ControlGroup";
import classNames from "classnames";

const Control = ({
  cellType,
  resetDisabled,
  searchDisabled,
  onClickGenerate,
  onClickReset,
  onClickSearch,
  onClickType,
}: ControlProps) => {
  return (
    <>
      <div className={css.row}>
        <div>
          <ControlGroup title="Add/Remove">
            {CELL_TYPES.map((item, index) => (
              <RaidoBtn
                key={`radio-${index}`}
                text={item.text}
                checked={cellType === item.value}
                onClick={() => onClickType(item.value)}
              >
                <div
                  className={classNames(css.radioTile, {
                    [parentCss.start]: item.value === 1,
                    [parentCss.goal]: item.value === 2,
                    [parentCss.block]: item.value === 3,
                  })}
                />
              </RaidoBtn>
            ))}
          </ControlGroup>
        </div>

        <ControlGroup title="Actions" classname={css.actionWrapper}>
          <Button color="yellow" onClick={onClickGenerate}>
            Generate
          </Button>
          <Button
            color="orange"
            disabled={searchDisabled}
            onClick={onClickSearch}
          >
            Search
          </Button>
          <Button color="red" disabled={resetDisabled} onClick={onClickReset}>
            Reset
          </Button>
        </ControlGroup>
      </div>
      {/* <div className={classNames(css.row, css.filledRow)}>
        <div>
          <ControlGroup title="Options">
            <Checkbox
              disabled
              text="Allow Diagonal"
              checked={diagonal}
              onClick={onClickDiagonal}
            />
          </ControlGroup>
        </div>
      </div> */}
    </>
  );
};

export default Control;
