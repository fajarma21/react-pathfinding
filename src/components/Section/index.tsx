import { cx } from '@emotion/css';

import type { CSSProperties } from 'react';
import * as css from './index.styles';
import { SectionProps } from './index.types';

const Section = ({
  gap = 8,
  horizontal,
  title,
  children,
  className,
  underline,
}: SectionProps) => {
  return (
    <section
      className={cx(css.section, className)}
      data-underline={underline || undefined}
    >
      <h3 className={css.sectionTitle}>{title}</h3>
      <div
        className={cx({ [css.sectionHorizontal]: horizontal })}
        style={{ '--hGap': `${gap}px` } as CSSProperties}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
