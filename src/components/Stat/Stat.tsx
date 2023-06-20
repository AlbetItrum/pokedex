import { FC } from "react";
import { StatProps } from "../../types/componentsProps";

import styles from "./Stat.module.scss";

export const Stat: FC<StatProps> = ({ name, value }) => (
  <div className={styles.wrapper}>
    <div>{name}</div>
    <div>{value}</div>
  </div>
);
