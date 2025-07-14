import { COL } from '@/constants';
import type { GridValue } from '@/types';
import { useEffect, useRef, useState } from 'react';

import Grid from './components/Grid';
import { initGrid } from './index.helpers';
import * as css from './index.styles';

// TODO: fixing note

const App = () => {
  const [gridValue, setGridValue] = useState<GridValue[][]>();
  const resetValue = useRef<GridValue[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResetGrid = () => {
    const reset = resetValue.current.length ? resetValue.current : initGrid();
    setGridValue(reset);
  };

  useEffect(() => {
    if (!gridValue) handleResetGrid();
  }, [gridValue]);

  return (
    <div ref={containerRef} className={css.container}>
      <h1 className={css.title}>Pathfinding</h1>
      {containerRef.current && gridValue && (
        <Grid
          grid={gridValue}
          cellSize={containerRef.current.offsetWidth / COL}
        />
      )}
    </div>
  );
};

export default App;
