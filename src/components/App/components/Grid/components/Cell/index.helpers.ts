import type { CSSProperties } from 'react';

export const getDelay = (counter: number) => {
  return { '--delay': `${counter * 20}ms` } as CSSProperties;
};
