import { ReactNode } from "react";

export interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  text: string;
  onClick: () => void;
}
