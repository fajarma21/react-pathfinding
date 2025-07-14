import { css } from '@emotion/css';

export const list = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  padding: 4px 12px;

  button {
    display: none;
    span {
      display: inline-block;
      margin-right: 4px;
    }
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

  @media (max-width: 400px) {
    height: 60px;
  }

  @media (max-width: 768px) {
    button {
      display: unset;
      span {
        display: none;
      }
    }
  }
`;

export const text = css`
  margin: 0;
  @media (max-width: 400px) {
    width: 120px;
  }
`;

export const btnContainer = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;
