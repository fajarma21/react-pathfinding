import { css } from '@emotion/css';

export const container = css`
  margin: 0 auto;
`;

export const gridWrapper = css`
  perspective: 1000px;
  perspective-origin: bottom;
`;

export const grid = css`
  border-radius: 8px;
  background-color: rgb(55, 192, 94);
  border-bottom: 10px solid rgb(17, 111, 44);
  transform-style: preserve-3d;
  transform: rotateX(15deg);
`;

export const row = css`
  display: flex;
  transform-style: preserve-3d;
`;
