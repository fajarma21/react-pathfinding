import Button from '@/components/Button';
import Section from '@/components/Section';

import Options from './components/Options';
import Tiles from './components/Tiles';
import * as css from './index.styles';
import type { ControlProps } from './index.types';

const Control = ({
  resetDisabled,
  searchDisabled,
  onClickGenerate,
  onClickReset,
  onClickSearch,
}: ControlProps) => {
  return (
    <>
      <div className={css.row}>
        <div>
          <Tiles onClickGenerate={onClickGenerate} />

          <Options />
        </div>

        <Section horizontal title="Actions" className={css.actionWrapper}>
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
    </>
  );
};

export default Control;
