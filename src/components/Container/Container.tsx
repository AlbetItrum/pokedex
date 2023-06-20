import { FC } from "react";
import { ContainerProps } from "../../types/componentsProps";

import styles from "./Container.module.scss";

export const Container: FC<ContainerProps> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
