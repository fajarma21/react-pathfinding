import { ReactNode } from "react";

export interface RadioBtnProps {
  checked: boolean;
  children?: ReactNode;
  text: string;
  onClick: () => void;
}
