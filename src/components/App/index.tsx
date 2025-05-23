import { useEffect, useRef, useState } from 'react';
import { COL } from '@/constants';
import type { GridValue } from '@/types';

import { initGrid } from './index.helpers';
import Grid from './components/Grid';
import * as css from './index.styles';

const App = () => {
  const [gridValue, setGridValue] = useState<GridValue[][]>();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleResetGrid = () => {
    const arr = initGrid();
    setGridValue(arr);
  };

  useEffect(() => {
    if (!gridValue) handleResetGrid();
  }, [gridValue]);

  return (
    <div ref={containerRef} className={css.container}>
      <h1 className={css.title}>A* Pathfinding</h1>
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
