import { CSSProperties, ReactNode } from "react";

import classnames from "classnames";

import styles from "./style.module.scss";

const Icon = ({
  src,
  alt,
  fixedHeight = true,
  style,
  handleClick,
  children,
}: {
  src: string;
  alt: string;
  fixedHeight?: boolean;
  style?: CSSProperties;
  handleClick?: () => void;
  children?: ReactNode;
}) => {
  return (
    <div
      className={classnames(styles.icon, {
        [styles.fixedHeight]: fixedHeight,
      })}
      style={style}
      onClick={handleClick}
    >
      <img src={src} alt={alt} />
      {children}
    </div>
  );
};

export default Icon;
