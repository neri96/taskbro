import { ReactNode } from "react";

import styles from "./style.module.scss";

const Error = ({ children }: { children: ReactNode }) => {
  return <div className={styles.serverError}>{children}</div>;
};

export default Error;
