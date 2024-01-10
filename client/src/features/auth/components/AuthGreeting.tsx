import { ReactNode } from "react";

import styles from "./AuthGreeting.module.scss";

const AuthGreeting = ({ children }: { children: ReactNode }) => {
  return <div className={styles.authGreeting}>{children}</div>;
};

export default AuthGreeting;
