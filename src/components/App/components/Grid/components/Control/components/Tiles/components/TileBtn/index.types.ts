import type { InputHTMLAttributes } from 'react';

export interface TileBtnProps extends InputHTMLAttributes<HTMLInputElement> {
  groupName: string;
  text: string;
}
