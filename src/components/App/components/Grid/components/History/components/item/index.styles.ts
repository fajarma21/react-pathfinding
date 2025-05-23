import { css } from '@emotion/css';

export const list = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  padding: 4px 12px;

  button {
    display: none;
  }

  &:hover,
  &[data-active] {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:hover {
    button {
      display: flex;
    }
  }
`;

export const btnContainer = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;
