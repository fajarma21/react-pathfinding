import { Dialog } from 'fajarma-react-lib';

import { cx } from '@emotion/css';
import * as css from './index.styles';
import type { DialogProps } from './index.types';

const View = ({ children, className, display, onClose }: DialogProps) => {
  return (
    <Dialog
      display={display}
      className={cx(css.modifier, className)}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
};

export default View;
