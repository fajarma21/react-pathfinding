import { css, keyframes } from '@emotion/css';

const show = keyframes`
to {
    transform: scale(1);
  }
`;

const innerBase = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const hover = css`
  ${innerBase};
  opacity: 0;
  background-color: white;
`;

export const cell = css`
  all: unset;
  position: relative;
  cursor: pointer;
  height: var(--size);
  width: 100%;
  min-width: var(--size);
  color: #073b4c;
  background-color: rgb(55, 192, 94);
  transform-style: preserve-3d;

  &:focus-visible {
    background-color: rgba(179, 245, 255, 0.2);
  }

  &:hover {
    ${`.${hover}`} {
      opacity: 0.2;
    }
  }
`;

export const innerCell = css`
  ${innerBase};
  transform: scale(0);
  will-change: transform;
  animation: ${show} 200ms ease-out var(--delay, 0ms) 1 forwards;
`;

export const isOpened = css`
  background-color: rgba(255, 255, 255, 0.2);
`;

export const isChecked = css`
  background-color: rgba(255, 255, 255, 0.2);
`;

export const isPath = css`
  background-color: rgba(255, 209, 102, 0.7);
`;

export const cost = css`
  ${innerBase};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;

  &[data-ignore] {
    opacity: 0.5;
  }

  &::after {
    content: attr(data-cost);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
  }
`;
