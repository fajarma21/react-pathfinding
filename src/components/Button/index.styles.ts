import { css } from '@emotion/css';

export const btn = css`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 4px;
  padding: 0 12px;
  border-bottom-width: 5px;
  border-bottom-style: solid;
  transition: all 200ms;

  &[data-color='red'] {
    color: white;
    background-color: #ff4128;
    border-color: #ba2916;
  }
  &[data-color='orange'] {
    color: white;
    background-color: #ff7900;
    border-color: #e44800;
  }
  &[data-color='yellow'] {
    color: #343434;
    background-color: #ffd900;
    border-color: #ff9d00;
  }

  &:disabled {
    cursor: not-allowed;
    color: gray;
    background-color: gainsboro;
    border-bottom: 5px solid rgb(146, 146, 146);
  }
  &:focus-visible {
    outline: 2px solid turquoise;
  }
`;
