import { ReactNode, CSSProperties } from "react";

import classname from "classnames";

import styles from "./style.module.scss";

export enum BtnType {
  Button = "button",
  Submit = "submit",
}

export enum BtnColor {
  Success,
  Danger,
  Default,
}

const Button = ({
  children,
  btnType = BtnType.Button,
  color = BtnColor.Success,
  disabled,
  style,
  handleClick,
}: {
  children: ReactNode;
  btnType?: BtnType;
  color?: BtnColor;
  disabled?: boolean;
  style?: CSSProperties;
  handleClick?: () => void;
}) => {
  return (
    <button
      type={btnType}
      className={classname(styles.button, {
        [styles.success]: color === BtnColor.Success,
        [styles.danger]: color === BtnColor.Danger,
        [styles.disabled]: disabled,
      })}
      style={style}
      onClick={disabled ? undefined : handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
