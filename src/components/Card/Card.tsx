import { FC } from "react";
import { CardProps } from "../../types/componentsProps";

import styles from "./Card.module.scss";

export const Card: FC<CardProps> = ({ className = "", children, onClick }) => (
  <div className={`${styles.card} ${className}`} onClick={onClick}>
    {children}
  </div>
);
