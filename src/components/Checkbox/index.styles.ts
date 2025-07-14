import { css } from '@emotion/css';

export const box = css`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: white;
`;

export const content = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const input = css`
  position: absolute;
  opacity: 0;
  cursor: pointer;

  + div {
    ${`.${box}`} {
      &::before,
      &::after {
        content: none;
        display: block;
        position: absolute;
        bottom: 20%;
        width: 4px;
        border-radius: 2px;
        background-color: #343434;
        transform-origin: bottom;
      }

      &::before {
        height: 10px;
        border-top-left-radius: 0;
        left: calc(35% - 1px);
        transform: rotate(-30deg);
      }

      &::after {
        height: 18px;
        border-top-right-radius: 0;
        left: calc(35% - 3px);
        transform: rotate(45deg);
      }
    }
  }

  &:checked {
    + div {
      ${`.${box}`} {
        &::before,
        &::after {
          content: '';
        }
      }
    }
  }
  &:focus-visible {
    + div {
      ${`.${box}`} {
        outline: solid 2px #ff7900;
      }
    }
  }
`;

export const container = css`
  cursor: pointer;
  position: relative;
  display: inline-flex;
`;

export const text = css`
  margin: 0;
  user-select: none;
  text-transform: capitalize;
`;
