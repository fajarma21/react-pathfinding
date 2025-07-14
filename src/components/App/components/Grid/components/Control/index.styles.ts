import { css } from '@emotion/css';

export const row = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  margin: 8px 0;
  @media only screen and (min-width: 640px) {
    flex-direction: row;
  }
`;

export const filledRow = css`
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
`;

export const actionWrapper = css`
  flex: none;
  @media only screen and (min-width: 640px) {
    margin-left: auto;
  }
`;
