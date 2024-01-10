import { CSSProperties, ReactNode } from "react";

import styles from "./style.module.scss";

const Icon = ({
  src,
  alt,
  style,
  handleClick,
  children,
}: {
  src: string;
  alt: string;
  style?: CSSProperties;
  handleClick?: () => void;
  children?: ReactNode;
}) => {
  return (
    <div className={styles.icon} style={style} onClick={handleClick}>
      <img src={src} alt={alt} />
      {children}
    </div>
  );
};

export default Icon;
