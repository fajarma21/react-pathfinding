import type { ChangeEvent, FormEvent } from 'react';
import { useRef, useState } from 'react';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import ColorPicker from '@/components/ColorPicker';
import Dialog from '@/components/Dialog';
import TextInput from '@/components/TextInput';
import { CellTypeData } from '@/types';

import { DEFAULT_TILE } from './index.constants';
import { getValidValue } from './index.helpers';
import * as css from './index.styles';
import type { AddDialogProps } from './index.types';

const AddDialog = ({
  display,
  onClose,
  onClickAddCutomCell,
}: AddDialogProps) => {
  const [newTile, setNewTile] = useState<CellTypeData>(DEFAULT_TILE);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onClickAddCutomCell({
      ...newTile,
      value: getValidValue(newTile.text),
    });

    onClose();
    setNewTile(DEFAULT_TILE);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    let value: string | number | boolean = e.target.value;
    if (key === 'cost') value = Number(value);
    else if (key === 'multiple') value = value === 'true';

    setNewTile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog display={display} className={css.dialogModifier} onClose={onClose}>
      <div className={css.container}>
        <div
          className={css.preview}
          style={{ backgroundColor: newTile.color }}
        />
        <form ref={formRef} onSubmit={handleSubmitForm}>
          <TextInput
            required
            type="text"
            id="name"
            placeholder="Tile name"
            pattern="([A-z]|| ){1,12}"
            title="1 to 12 letters or spaces"
            value={newTile.text}
            onChange={(e) => handleChange(e, 'text')}
          />

          <TextInput
            required
            type="number"
            id="cost"
            label="Cost (0 = impassable)"
            placeholder="Cost"
            min={0}
            max={100}
            value={String(newTile.cost)}
            onChange={(e) => handleChange(e, 'cost')}
          />

          <ColorPicker
            label="Color (hex)"
            value={newTile.color}
            onChange={(e) => handleChange(e, 'color')}
          />

          <Checkbox
            id="multiple"
            label="Multiple"
            checked={newTile.multiple}
            onChange={(e) => handleChange(e, 'multiple')}
          />

          <Button type="submit" className={css.btnModifier} color="orange">
            Add Tile
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default AddDialog;
