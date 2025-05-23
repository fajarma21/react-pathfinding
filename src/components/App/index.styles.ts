import { css } from '@emotion/css';

export const container = css`
  margin: 0 auto;
  width: 80%;

  @media only screen and (min-width: 1024px) {
    width: 800px;
  }
`;

export const title = css`
  text-align: center;
  font-size: 2.5rem;
  color: rgb(255, 235, 81);
  filter: drop-shadow(0 4px 0 #323232);
  margin-bottom: 0;

  @media only screen and (min-width: 1024px) {
    font-size: 3rem;
  }
`;
