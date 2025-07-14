import { css } from '@emotion/css';

export const dialogModifier = css`
  width: 400px;
  max-width: calc(100% - 32px);
`;

export const btnModifier = css`
  margin: 0 auto;
`;

export const container = css`
  position: relative;
  padding-top: 32px;
`;

export const preview = css`
  position: absolute;
  top: -90px;
  left: calc(50% - 50px);
  height: 100px;
  width: 100px;
  border-radius: 10px;
  border: 4px solid white;
`;
