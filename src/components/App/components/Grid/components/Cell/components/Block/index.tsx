import { cx } from '@emotion/css';
import * as css from './index.styles';

const Block = () => {
  return (
    <div className={css.blockWrapper}>
      <div className={cx(css.side, css.top)} />
      <div className={cx(css.side, css.left)} />
      <div className={cx(css.side, css.right)} />
      <div className={cx(css.side, css.front)} />
    </div>
  );
};

export default Block;
