import { css } from '@emotion/css';

export const dot = css`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: white;
`;

export const checkbox = css`
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

  input[type='checkbox']:checked {
    & + label {
      background-color: rgba(255, 255, 255, 0.2);

      ${`.${dot}`} {
        background-color: rgb(55, 192, 94);
      }
    }
  }

  &:disabled,
  &:disabled * {
    cursor: not-allowed;
  }
  &:disabled * {
    background-color: gray;
  }
`;
