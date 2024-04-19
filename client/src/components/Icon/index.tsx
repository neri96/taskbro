import { CSSProperties, ReactNode } from "react";

import classnames from "classnames";

import styles from "./style.module.scss";

const Icon = ({
  src,
  alt,
  fixedHeight = true,
  style,
  handleClick,
  handleToggle,
  children,
}: {
  src: string;
  alt: string;
  fixedHeight?: boolean;
  style?: CSSProperties;
  handleClick?: () => void;
  handleToggle?: () => void;
  children?: ReactNode;
}) => {
  return (
    <div
      className={classnames(styles.icon, {
        [styles.fixedHeight]: fixedHeight,
      })}
      style={style}
      onClick={handleClick}
      onMouseEnter={handleToggle}
      onMouseLeave={handleToggle}
    >
      <img src={src} alt={alt} />
      {children}
    </div>
  );
};

export default Icon;
