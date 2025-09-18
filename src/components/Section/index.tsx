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
  subTitle,
  underline,
}: SectionProps) => {
  return (
    <section
      className={cx(css.section, className)}
      data-underline={underline || undefined}
    >
      <div className={css.head}>
        <h3 className={css.sectionTitle}>{title}</h3>
        {subTitle && <div>{subTitle}</div>}
      </div>
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
