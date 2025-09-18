import * as css from './index.styles';
import type { TickerProps } from './index.types';

const Ticker = ({ children }: TickerProps) => {
  return <div className={css.container}>{children}</div>;
};

export default Ticker;
