import Button from '@/components/Button';
import * as css from './index.styles';
import { ItemProps } from './index.types';

const Item = ({ children, isActive, onClick, onDelete }: ItemProps) => {
  return (
    <li className={css.list} data-active={isActive || undefined}>
      {children}
      <div className={css.btnContainer}>
        <Button color="red" onClick={onDelete}>
          x
        </Button>
        {!isActive && (
          <Button color="orange" onClick={onClick}>
            Restore &gt;
          </Button>
        )}
      </div>
    </li>
  );
};

export default Item;
