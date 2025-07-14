import { create } from 'zustand';
import type { OptionStore } from './index.types';

const useOptions = create<OptionStore>((set) => ({
  ignoreCost: false,
  showCost: false,
  toggleIgnoreCost: () => {
    set((state) => ({ ignoreCost: !state.ignoreCost }));
  },
  toggleShowCost: () => {
    set((state) => ({ showCost: !state.showCost }));
  },
}));

export default useOptions;
