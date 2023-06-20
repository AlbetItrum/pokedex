import { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export interface StatProps {
  name: string;
  value: number;
}
