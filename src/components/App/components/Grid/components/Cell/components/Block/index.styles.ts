import { css, keyframes } from '@emotion/css';

const popup = keyframes`
  100% {
    transform: scale(1);
  }
`;

export const blockWrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  will-change: transform;
  transform: scale(0);
  animation: ${popup} 200ms ease-out var(--delay, 0ms) 1 forwards;
`;

export const side = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const top = css`
  transform: translateZ(25px);
  background-color: #0b6a2b;
  &:hover {
    background-color: #0e7831;
  }
`;

export const left = css`
  width: 25px;
  transform-origin: left;
  transform: rotateY(90deg) translateX(-25px);
  background-color: #074c1e;
`;

export const right = css`
  left: unset;
  right: 0;
  width: 25px;
  transform-origin: right;
  transform: rotateY(-90deg) translateX(25px);
  background-color: #074c1e;
`;

export const front = css`
  top: unset;
  bottom: 0;
  height: 25px;
  transform-origin: bottom;
  transform: rotateX(-90deg);
  background-color: #074c1e;
`;
