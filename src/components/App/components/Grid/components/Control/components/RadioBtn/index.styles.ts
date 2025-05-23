import { css } from '@emotion/css';

export const radio = css`
  all: unset;

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    height: 40px;
    padding: 0 12px;
    border-radius: 4px;
    transition: background-color 200ms;
  }

  input[type='radio']:checked + label {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
