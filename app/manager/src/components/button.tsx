"use client";
import { CSSProperties, FC, PropsWithChildren } from "react";
import styles from "./button.module.css";

const Button: FC<PropsWithChildren & { style?: CSSProperties | undefined; onClick: () => Promise<void> }> = ({
  children,
  style,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ borderRadius: "4rem", fontSize: "1.5rem", ...style }}
      className={styles["glow-on-hover"]}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
