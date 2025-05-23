import * as css from './index.styles';
import { CheckboxProps } from './index.types';

const Checkbox = ({ checked, disabled, text, onClick }: CheckboxProps) => {
  return (
    <button type="button" disabled={disabled} className={css.checkbox}>
      <input
        hidden
        type="checkbox"
        id={text}
        checked={checked}
        disabled={disabled}
        onChange={onClick}
      />
      <label htmlFor={text}>
        <div className={css.dot} />
        <div>{text}</div>
      </label>
    </button>
  );
};

export default Checkbox;
