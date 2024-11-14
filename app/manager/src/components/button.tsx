"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import styles from "./button.module.css";
import { joinSavior } from "@/server-functions/join-savior";
import { getCookie } from "@/helpers/cookies";
import EntryPoint from "./entrypoint";

const Button: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [fullHouse, setIsFullHouse] = useState(false);
  const [call, setCall] = useState<string | undefined>();

  const handleJoinClick = async () => {
    const isSuccess = await joinSavior();
    if (!isSuccess) {
      setIsFullHouse(true);
    }
    setLoading(true);
  };

  useEffect(() => {
    setCall(getCookie("call"));
    setLoading(false);
  }, [loading, call]);

  if (loading) {
    return false;
  }

  if (fullHouse) {
    return (
      <p style={{ color: "whitesmoke" }}>
        🃏 Полная посадка.
        <br />
        Похоже что сервера пыхтят на максимум.
      </p>
    );
  }

  if (call) {
    return <EntryPoint />;
  }

  return (
    <button
      onClick={handleJoinClick}
      style={{ width: "100%", fontSize: "1.5rem" }}
      className={styles["glow-on-hover"]}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
