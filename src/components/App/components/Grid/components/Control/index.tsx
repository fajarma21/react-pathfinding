import { cx } from '@emotion/css';

import Button from '@/components/Button';
import Section from '@/components/Section';
import { CELL_TYPES } from '@/constants';
import * as parentCss from '@/styles';

import Checkbox from './components/Checkbox';
import RadioBtn from './components/RadioBtn';
import * as css from './index.styles';
import type { ControlProps } from './index.types';

// TODO: change when it ready
const IS_READY = false;

const Control = ({
  cellType,
  diagonal,
  resetDisabled,
  searchDisabled,
  onClickDiagonal,
  onClickGenerate,
  onClickReset,
  onClickSearch,
  onClickType,
}: ControlProps) => {
  return (
    <>
      <div className={css.row}>
        <div>
          <Section title="Tile Type">
            {CELL_TYPES.map((item, index) => (
              <RadioBtn
                key={`radio-${index}`}
                text={item.text}
                checked={cellType === item.value}
                onClick={() => onClickType(item.value)}
              >
                <div
                  className={cx(css.radioTile, {
                    [parentCss.start]: item.value === 1,
                    [parentCss.goal]: item.value === 2,
                    [parentCss.block]: item.value === 3,
                  })}
                />
              </RadioBtn>
            ))}
          </Section>
          <Button color="yellow" onClick={onClickGenerate}>
            Generate tiles
          </Button>
        </div>

        <Section title="Actions" classname={css.actionWrapper}>
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
        </Section>
      </div>
      {IS_READY && (
        <div className={cx(css.row, css.filledRow)}>
          <Section title="Options">
            <Checkbox
              text="Allow Diagonal"
              checked={diagonal}
              onClick={onClickDiagonal}
            />
          </Section>
        </div>
      )}
    </>
  );
};

export default Control;
