import type { CellTypeData } from '@/types';

export interface SelectedCellStore {
  selectedCell: CellTypeData;
  updateSelectedCell: (value: CellTypeData) => void;
}
