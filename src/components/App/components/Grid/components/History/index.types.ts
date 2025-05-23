import { HistoryList } from '@/types';

export interface HistoryProps {
  list: HistoryList[];
  selected: number;
  onDelete: (value: number) => void;
  onClick: (value: HistoryList) => void;
}
