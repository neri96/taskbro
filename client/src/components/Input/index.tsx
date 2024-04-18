import { CSSProperties, ChangeEvent, KeyboardEvent, ReactNode } from "react";

import { UseFormRegister, RegisterOptions } from "react-hook-form";

import Icon from "../Icon";
import styles from "./style.module.scss";

const Input = ({
  fieldType = "text",
  register,
  rules,
  name,
  label,
  value,
  style,
  parentStyle,
  error,
  placeholder,
  isTextarea,
  readonly,
  icon,
  iconOnClick,
  handleFocus,
  handleChange,
  handleClick,
  handleKeyDown,
  isDatePicker,
  children,
}: {
  name: string;
  fieldType?: "text" | "password" | "file";
  register?: UseFormRegister<any>;
  rules?: Pick<
    RegisterOptions<any>,
    "maxLength" | "minLength" | "validate" | "required"
  >;
  label?: string;
  value?: string;
  error?: string;
  style?: CSSProperties;
  parentStyle?: CSSProperties;
  readonly?: boolean;
  placeholder?: string;
  isTextarea?: boolean;
  icon?: string | null;
  iconOnClick?: () => void;
  handleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFocus?: () => void;
  handleClick?: () => void;
  handleKeyDown?: (e: KeyboardEvent) => void;
  isDatePicker?: boolean;
  children?: ReactNode;
}) => {
  const Component = isTextarea ? "textarea" : "input";

  return (
    <div className={styles.field} style={parentStyle}>
      {label ? <label htmlFor={name}>{label}</label> : null}
      {error ? <span className={styles.fieldError}>{error}</span> : null}
      {isDatePicker ? (
        children
      ) : (
        <>
          <Component
            id={name}
            type={fieldType}
            value={value}
            placeholder={placeholder}
            style={style}
            readOnly={readonly}
            onFocus={handleFocus}
            onClick={handleClick || undefined}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...(register && register(name, rules))}
          />
          {icon ? (
            <Icon
              src={icon}
              alt={name}
              style={{
                position: "absolute",
                top: "22px",
                right: "20px",
                height: "18px",
              }}
              handleClick={iconOnClick || undefined}
            />
          ) : null}
          {children}
        </>
      )}
    </div>
  );
};

export default Input;
