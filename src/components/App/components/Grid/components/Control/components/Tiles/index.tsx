import { cx } from '@emotion/css';
import { useState } from 'react';

import Button from '@/components/Button';
import Section from '@/components/Section';
import { CELL_TYPE_CUSTOM } from '@/constants';
import useAllCell from '@/hooks/useAllCell';
import * as parentCss from '@/styles';

import useSelectedCell from '@/stores/useSelectedCell';
import AddDialog from './components/AddDialog';
import TileBtn from './components/TileBtn';
import { CELL_LIMIT } from './index.constants';
import * as css from './index.styles';
import type { TilesProps } from './index.types';

const Tiles = ({ onClickGenerate }: TilesProps) => {
  const [display, setDisplay] = useState(false);

  const selectedCell = useSelectedCell((state) => state.selectedCell);
  const updateSelectedCell = useSelectedCell(
    (state) => state.updateSelectedCell
  );

  const { cellList, handleAddCutomCell, handleDeleteCustomCell } = useAllCell({
    addCell: selectedCell,
    handleClickCellType: updateSelectedCell,
  });

  const handleToggleDialog = () => {
    setDisplay((prev) => !prev);
  };

  return (
    <>
      <Section horizontal underline title="Tile Type">
        {cellList.map((item, index) => (
          <TileBtn
            key={`radio-${index}`}
            text={item.text}
            groupName="tiles"
            className={css.tileBtnModif}
            checked={selectedCell.value === item.value}
            onChange={() => updateSelectedCell(item)}
          >
            <div
              className={cx(css.radioTile, {
                [parentCss.cells + '-' + item.value]: !item.color,
              })}
              style={{ backgroundColor: item.color }}
            />
            {item.type === CELL_TYPE_CUSTOM && (
              <button
                type="button"
                className={css.deleteBtn}
                onClick={() => handleDeleteCustomCell(item)}
              />
            )}
          </TileBtn>
        ))}
        {cellList.length < CELL_LIMIT && (
          <button
            type="button"
            className={css.addTileBtn}
            onClick={handleToggleDialog}
          />
        )}
        <Button color="yellow" onClick={onClickGenerate}>
          Generate tiles
        </Button>
      </Section>

      <AddDialog
        display={display}
        onClose={handleToggleDialog}
        onClickAddCutomCell={handleAddCutomCell}
      />
    </>
  );
};

export default Tiles;
