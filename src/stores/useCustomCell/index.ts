import { create } from 'zustand';
import { CustomCellStore } from './index.types';

const useCustomCell = create<CustomCellStore>((set) => ({
  cellList: [],
  updateCustomCell: (value) => {
    set(() => ({ cellList: value }));
  },
}));

export default useCustomCell;
