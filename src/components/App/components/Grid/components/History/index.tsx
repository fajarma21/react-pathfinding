import dayjs from 'dayjs';
import { useIntersect } from 'fajarma-react-lib';
import { useRef, useState } from 'react';

import Section from '@/components/Section';
import Item from './components/item';
import * as css from './index.styles';
import { HistoryProps } from './index.types';

const History = ({ list, selected, onClick, onDelete }: HistoryProps) => {
  const [height, setHeight] = useState(220);
  const { ref, intersecting } = useIntersect<HTMLDivElement>();
  const containerRef = useRef<HTMLUListElement>(null);

  const handleSeeMore = () => {
    const listH = containerRef.current ? containerRef.current.scrollHeight : 0;
    const diffH = listH - height;

    if (diffH > 220) setHeight((prev) => prev + 220);
    else setHeight((prev) => prev + diffH);
  };

  return (
    <Section title="History" className={css.section}>
      <ul
        ref={containerRef}
        className={css.container}
        style={{ height: height }}
      >
        {list.map((item, index) => (
          <Item
            key={`history-${index}`}
            isActive={selected === item.dateNumber}
            onClick={() => onClick(item)}
            onDelete={() => onDelete(item.dateNumber)}
          >
            {dayjs(item.dateNumber).format('DD/MM/YYYY HH:mm:ss')}
          </Item>
        ))}
        <p className={css.endLine}>- That's it -</p>
        <div ref={ref} />
      </ul>
      {!intersecting && (
        <button
          type="button"
          className={css.showMore}
          onClick={handleSeeMore}
        />
      )}
    </Section>
  );
};

export default History;
