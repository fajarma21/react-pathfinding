import { DEFAULT_TILE_COLOR } from '@/constants';
import TextInput from '../TextInput';
import * as css from './index.styles';
import type { ColorPickerProps } from './index.types';

const ColorPicker = ({
  label,
  name,
  value,
  pattern,
  onChange,
  ...restProps
}: ColorPickerProps) => {
  return (
    <div className={css.inputGroup}>
      <label htmlFor="color-text" className={css.labelModifier}>
        {label}
      </label>
      <div className={css.inputRow}>
        <TextInput
          type="text"
          id="color-text"
          placeholder="#000000"
          value={value}
          pattern="#([0123456789abcdefABCDEF]){6}"
          className={css.inputTextModifier}
          title='The format is "#rrggbb" where rr, gg, bb are two-digit hexadecimal numbers.'
          onChange={onChange}
        />
        {value !== undefined && (
          <input
            type="color"
            name={name}
            value={
              String(value).match(/#([0123456789abcdef]){6}/gi)
                ? value
                : DEFAULT_TILE_COLOR
            }
            className={css.inputColorModifier}
            onChange={onChange}
            {...restProps}
          />
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
