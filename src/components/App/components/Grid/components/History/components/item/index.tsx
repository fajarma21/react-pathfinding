import Button from '@/components/Button';
import * as css from './index.styles';
import { ItemProps } from './index.types';

const Item = ({ children, isActive, onClick, onDelete }: ItemProps) => {
  return (
    <li className={css.list} data-active={isActive || undefined}>
      <p className={css.text}>{children}</p>
      <div className={css.btnContainer}>
        <Button color="red" onClick={onDelete}>
          x
        </Button>
        {!isActive && (
          <Button color="orange" onClick={onClick}>
            <span>Restore</span>&gt;
          </Button>
        )}
      </div>
    </li>
  );
};

export default Item;
