import { css } from '@emotion/css';

export const content = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  height: 40px;
  padding: 0 12px;
  border-radius: 4px;
  transition: background-color 200ms;
`;

export const input = css`
  position: absolute;
  opacity: 0;
  cursor: pointer;

  &:checked {
    & + div {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  &:focus-visible {
    & + div {
      outline: solid 2px lightgrey;
    }
  }
`;

export const container = css`
  cursor: pointer;
  position: relative;
`;

export const text = css`
  margin: 0;
  user-select: none;
  text-transform: capitalize;
`;
