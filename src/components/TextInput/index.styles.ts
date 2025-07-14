import { css } from '@emotion/css';

export const inputGroup = css`
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &[data-horizontal] {
    display: flex;
    gap: 8px;
  }
`;

export const labelModifier = css`
  display: block;
  margin-bottom: 4px;
`;

export const inputModifier = css`
  all: unset;
  display: block;
  box-sizing: border-box;
  cursor: text;
  height: 30px;
  width: 100%;
  padding: 0 8px;
  border-radius: 6px;
  color: #343434;
  background-color: white;

  &:focus-visible {
    outline: solid 2px #ff7900;
  }
`;
