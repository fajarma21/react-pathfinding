import { create } from 'zustand';

import { CELL_START_DATA } from '@/constants';
import { SelectedCellStore } from './index.types';

const useSelectedCell = create<SelectedCellStore>((set) => ({
  selectedCell: CELL_START_DATA,
  updateSelectedCell: (value) => {
    set(() => ({ selectedCell: value }));
  },
}));

export default useSelectedCell;
