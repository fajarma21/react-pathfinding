import type { InputHTMLAttributes } from 'react';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  horizontal?: boolean;
  label?: string;
  type: 'text' | 'password' | 'email' | 'number';
}
