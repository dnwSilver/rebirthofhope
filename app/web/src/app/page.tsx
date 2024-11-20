"use client";

import Button from "@/components/button";
import EntryPoint from "@/components/entrypoint";
import useCall from "@/hooks/use-call";
import { joinSavior } from "@/server-functions/join-savior";
import { useProgress } from "@/store/store";
import { useState, useEffect } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [fullHouse, setIsFullHouse] = useState(false);
  const { call, updateCall } = useCall();
  const { toggle, show } = useProgress();

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  if (loading) {
    return false;
  }

  const handleJoinClick = async () => {
    setLoading(true);
    const isSuccess = await joinSavior();
    if (!isSuccess) {
      setIsFullHouse(true);
    }
    updateCall();
    show();
    toggle();
    setLoading(false);
  };

  if (fullHouse) {
    return (
      <p style={{ color: "whitesmoke" }}>
        🃏 Полная посадка.
        <br />
        Похоже, что сервера пыхтят на максимум.
      </p>
    );
  }

  return (
    <section style={{ margin: "1rem" }}>
      {fullHouse && (
        <p style={{ color: "whitesmoke" }}>
          🃏 Полная посадка.
          <br />
          Похоже, что сервера пыхтят на максимум.
        </p>
      )}
      {call && <EntryPoint />}
      {!call && !fullHouse && (
        <Button
          style={{
            position: "fixed",
            width: "27rem",
            top: "1rem",
            left: "calc(50vw - 13.5rem)",
          }}
          onClick={handleJoinClick}
        >
          Попытаться побороть инфраструктуру
        </Button>
      )}
    </section>
  );
};

export default Home;
