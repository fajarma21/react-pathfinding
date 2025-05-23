export interface ControlProps {
  cellType: number;
  diagonal: boolean;
  resetDisabled: boolean;
  searchDisabled: boolean;
  onClickDiagonal: () => void;
  onClickGenerate: () => void;
  onClickType: (param: number) => void;
  onClickReset: () => void;
  onClickSearch: () => void;
}
