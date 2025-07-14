import type { CellTypeData } from '@/types';

export interface UseAllCellParams {
  addCell: CellTypeData;
  handleClickCellType: (param: CellTypeData) => void;
}
