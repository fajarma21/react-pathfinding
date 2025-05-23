import { useEffect, useState } from 'react';
import getLS from 'fajarma-package/dist/storage/getLS';
import setLS from 'fajarma-package/dist/storage/setLS';
import { HistoryData, HistoryList } from '@/types';

import { UseHistoryParams } from './index.types';
import { LS_HISTORY } from './index.constants';

const useHistory = ({ block, goal, start }: UseHistoryParams) => {
  const [selectedHistory, setSelectedHistory] = useState<number>(0);
  const [historyList, setHistoryList] = useState<HistoryList[]>([]);

  const handleAddHistory = (data?: HistoryData) => {
    const dateNumber = new Date().getTime();

    setSelectedHistory(dateNumber);

    const newData = data || {
      block,
      goal,
      start,
    };

    const validData = {
      dateNumber: dateNumber,
      ...newData,
    };

    setHistoryList((prev) => [validData, ...prev]);

    const prevLS = getLS<HistoryList[]>(LS_HISTORY) || [];
    setLS(LS_HISTORY, [validData, ...prevLS]);
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
    const history_ls = getLS<HistoryList[]>(LS_HISTORY) || [];
    setHistoryList(history_ls);
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
