"use client";

import { EXAMPLE_TIME_AVAILABLE } from "@/db/domain";
import { useEffect, useState } from "react";

const Timer = ({ start }: { start: Date }) => {
  const [leftTime, setLeftTime] = useState(Date.now() - start.getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLeftTime(Date.now() - start.getTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (leftTime > EXAMPLE_TIME_AVAILABLE) {
    return `🏁`;
  }

  return new Date(EXAMPLE_TIME_AVAILABLE - leftTime).toISOString().slice(14, 19);
};

export default Timer;
