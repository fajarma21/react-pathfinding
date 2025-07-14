import { css } from '@emotion/css';

export const inputGroup = css`
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &[data-horizontal] {
    display: flex;
    gap: 8px;
  }
`;

export const labelModifier = css`
  display: block;
  margin-bottom: 4px;
`;

export const inputRow = css`
  display: flex;
  gap: 8px;
`;

export const inputColorModifier = css`
  flex: none;
  height: 30px;
`;

export const inputTextModifier = css`
  width: 100%;
`;
