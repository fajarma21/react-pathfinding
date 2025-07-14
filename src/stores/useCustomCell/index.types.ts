import type { CellTypeData } from '@/types';

export interface CustomCellStore {
  cellList: CellTypeData[];
  updateCustomCell: (value: CellTypeData[]) => void;
}
