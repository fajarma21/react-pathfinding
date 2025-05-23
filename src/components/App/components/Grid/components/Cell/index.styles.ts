import { css, keyframes } from '@emotion/css';

const show = keyframes`
to {
    transform: scale(1);
  }
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
`;

export const innerCell = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: scale(0);
  will-change: transform;
  animation: ${show} 200ms ease-out var(--delay) 1 forwards;
`;

export const isOpened = css`
  background-color: rgb(38, 168, 75);
`;

export const isChecked = css`
  background-color: rgb(25, 143, 58);
`;

export const isPath = css`
  background-color: #ffd166;
`;
