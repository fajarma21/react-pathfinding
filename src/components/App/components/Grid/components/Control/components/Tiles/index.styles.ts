import { css } from '@emotion/css';

export const radioTile = css`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  overflow: hidden;
`;

export const addTileBtn = css`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  width: 24px;
  height: 24px;
  margin: 0 16px;
  border-radius: 50%;
  border: 2px solid white;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: white;
  }

  &::before {
    width: 10px;
    height: 2px;
    top: calc(50% - 1px);
    left: calc(50% - 5px);
  }

  &::after {
    width: 2px;
    height: 10px;
    top: calc(50% - 5px);
    left: calc(50% - 1px);
  }

  &:focus-visible {
    outline: 2px solid turquoise;
  }
`;

export const deleteBtn = css`
  all: unset;
  cursor: pointer;
  box-sizing: border-box;
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  top: -6px;
  right: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #a20c0c;
  z-index: 1;

  &::before {
    content: '';
    width: 10px;
    height: 2px;
    background-color: white;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const tileBtnModif = css`
  &:hover {
    ${`.${deleteBtn}`} {
      display: flex;
    }
  }
`;
