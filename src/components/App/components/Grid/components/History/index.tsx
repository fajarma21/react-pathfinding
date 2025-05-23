import Section from '@/components/Section';

import Item from './components/item';
import * as css from './index.styles';
import { HistoryProps } from './index.types';
import dayjs from 'dayjs';

const History = ({ list, selected, onClick, onDelete }: HistoryProps) => {
  return (
    <Section title="History" classname={css.section}>
      <ul className={css.container}>
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
      </ul>
    </Section>
  );
};

export default History;
