import { cx } from '@emotion/css';

import * as css from './index.styles';
import { SectionProps } from './index.types';

const Section = ({ title, children, classname }: SectionProps) => {
  return (
    <section className={cx(css.section, classname)}>
      <h3 className={css.sectionTitle}>{title}</h3>
      <div className={css.sectionContent}>{children}</div>
    </section>
  );
};

export default Section;
