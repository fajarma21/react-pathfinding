import { css } from '@emotion/css';

export const section = css`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 8px;
    margin-bottom: 8px;
  }
`;

export const sectionTitle = css`
  margin: 0 0 8px;
  color: white;
  font-weight: normal;
`;

export const sectionContent = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
