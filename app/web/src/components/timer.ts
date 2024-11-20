"use client";

import { EXAMPLE_TIME_AVAILABLE } from "@/db/domain";
import { useEffect, useState } from "react";

const Timer = ({ start }: { start: Date }) => {
  const [leftTime, setLeftTime] = useState(Date.now() - new Date(start).getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLeftTime(Date.now() - new Date(start).getTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (leftTime > EXAMPLE_TIME_AVAILABLE) {
    return new Date(EXAMPLE_TIME_AVAILABLE).toISOString().slice(11, 19);
  }

  return new Date(leftTime).toISOString().slice(11, 19);
};

export default Timer;
