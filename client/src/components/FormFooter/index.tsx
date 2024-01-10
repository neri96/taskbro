import { ReactNode, CSSProperties } from "react";

import styles from "./style.module.scss";

const FormFooter = ({
  style,
  children,
}: {
  style?: CSSProperties;
  children: ReactNode;
}) => {
  return (
    <div style={style} className={styles.formFooter}>
      {children}
    </div>
  );
};

export default FormFooter;
