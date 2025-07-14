import getLS from 'fajarma-package/dist/storage/getLS';
import setLS from 'fajarma-package/dist/storage/setLS';
import { useEffect } from 'react';

import { CELL_TYPES } from '@/constants';
import type { CellTypeData } from '@/types';

import useAddCell from '@/stores/useCustomCell';
import { LS_CELL_LIST } from './index.constants';
import type { UseAllCellParams } from './index.types';

const useAllCell = ({ addCell, handleClickCellType }: UseAllCellParams) => {
  const cellList = useAddCell((state) => state.cellList);
  const updateCustomCell = useAddCell((state) => state.updateCustomCell);

  const handleAddCutomCell = (value: CellTypeData) => {
    const newCellList = [...cellList, value];
    updateCustomCell(newCellList);
    setLS(LS_CELL_LIST, newCellList);
  };

  const handleDeleteCustomCell = (data: CellTypeData) => {
    const cellIndex = cellList.findIndex((item) => item.value === data.value);
    const newCellList = cellList.filter((item) => item.value !== data.value);
    updateCustomCell(newCellList);
    setLS(LS_CELL_LIST, newCellList);

    const newSelectedCell =
      addCell.value === data.value ? newCellList[cellIndex - 1] : addCell;
    handleClickCellType(newSelectedCell);
  };

  useEffect(() => {
    const cellListLs = getLS<CellTypeData[]>(LS_CELL_LIST) || [];
    updateCustomCell(cellListLs.length ? cellListLs : CELL_TYPES);
  }, []);

  return { cellList, handleAddCutomCell, handleDeleteCustomCell };
};

export default useAllCell;
