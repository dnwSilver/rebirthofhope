"use client";
import { CSSProperties, FC, PropsWithChildren } from "react";
import styles from "./button.module.css";

const Button: FC<
  { disabled: boolean } & PropsWithChildren & { style?: CSSProperties | undefined; onClick: () => Promise<void> }
> = ({ children, disabled, style, onClick }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{ borderRadius: "4rem", fontSize: "1.5rem", ...style }}
      className={disabled ? "" : styles["glow-on-hover"]}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
