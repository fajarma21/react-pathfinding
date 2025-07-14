import type { InputHTMLAttributes } from 'react';

export interface ColorPickerProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
