import { CSSProperties, ReactNode } from "react";

import classnames from "classnames";

import styles from "./style.module.scss";

const PageLayout = ({
  style,
  children,
  isFixed = false,
}: {
  children: ReactNode;
  style?: CSSProperties;
  isFixed?: boolean;
}) => {
  return (
    <div
      style={style}
      className={classnames(styles.pageLayout, { [styles.fixed]: isFixed })}
    >
      {children}
    </div>
  );
};

export default PageLayout;
