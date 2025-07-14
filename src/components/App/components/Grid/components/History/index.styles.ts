import { css } from '@emotion/css';

export const section = css`
  position: relative;
  margin-bottom: 32px;

  @media only screen and (max-width: 639px) {
    margin-bottom: 150px;
  }
`;

export const container = css`
  overflow: hidden;
  width: 100%;
  padding: 4px 4px 16px;
  margin: 0;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: height 500ms linear;
`;

export const endLine = css`
  margin: 16px 0 0;
  opacity: 0.7;
  text-align: center;
`;

export const showMore = css`
  all: unset;
  cursor: pointer;
  position: absolute;
  bottom: -15px;
  left: calc(50% - 15px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: #376cc0;
  transform: rotate(45deg);

  &::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    border: 2px solid white;
    border-top-width: 0;
    border-left-width: 0;
    transform: translate(-2px, -2px);
  }
`;
