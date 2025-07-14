import type { GridValue, HistoryList } from '@/types';
import getLS from 'fajarma-package/dist/storage/getLS';
import setLS from 'fajarma-package/dist/storage/setLS';
import { useEffect, useState } from 'react';

import { LS_HISTORY } from './index.constants';

const useHistory = (cells: GridValue[]) => {
  const [selectedHistory, setSelectedHistory] = useState<number>(0);
  const [historyList, setHistoryList] = useState<HistoryList[]>([]);

  const handleAddHistory = (data?: GridValue[]) => {
    const dateNumber = new Date().getTime();

    setSelectedHistory(dateNumber);

    const newData = data || cells;

    const validData = {
      dateNumber: dateNumber,
      cells: newData,
    };

    const newHistoryList = [validData, ...historyList];
    setHistoryList(newHistoryList);
    setLS(LS_HISTORY, newHistoryList);
  };

  const handleDeleteHistory = (dateNumber: number) => {
    const newHistoryList = historyList.filter(
      (item) => item.dateNumber !== dateNumber
    );
    setHistoryList(newHistoryList);
    setLS(LS_HISTORY, newHistoryList);
    if (selectedHistory === dateNumber) setSelectedHistory(0);
  };

  useEffect(() => {
    const historyLs = getLS<HistoryList[]>(LS_HISTORY) || [];
    setHistoryList(historyLs);
  }, []);

  return {
    historyList,
    selectedHistory,
    handleAddHistory,
    handleDeleteHistory,
    setSelectedHistory,
  };
};

export default useHistory;
