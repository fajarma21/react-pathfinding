import type { CellTypeData } from '@/types';

export interface AddDialogProps {
  display: boolean;
  onClose: () => void;
  onClickAddCutomCell: (arg: CellTypeData) => void;
}
