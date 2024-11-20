import { getCookie } from "@/helpers/cookies";
import { useEffect, useState } from "react";

const useCall = (time = 0) => {
  const [call, setCall] = useState<string | undefined | null>();

  const updateCall = () => {
    setCall(getCookie("call"));
  };

  useEffect(() => {
    setTimeout(() => setCall(getCookie("call") || null), time);
  }, [call]);

  return { call, updateCall };
};

export default useCall;
