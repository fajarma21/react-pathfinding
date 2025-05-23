import { css } from '@emotion/css';

export const start = css`
  transform: scale(1);
  background-color: #c09636;
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #8d6b1d;
  }
`;

export const goal = css`
  transform: scale(1);
  background-color: white;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    background-color: #323232;
  }

  &::before {
    top: 0;
    left: 0;
  }

  &::after {
    bottom: 0;
    right: 0;
  }
`;

export const block = css`
  transform: scale(1);
  background-color: #074c1e;
`;
