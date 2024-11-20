import { COOKIE_IDENTIFIER_KEY } from "@/db/domain";
import { getCookie } from "@/helpers/cookies";
import { useEffect, useState } from "react";

const useCall = (time = 0) => {
  const [call, setCall] = useState<string | undefined | null>();

  const updateCall = () => {
    setCall(getCookie(COOKIE_IDENTIFIER_KEY));
  };

  useEffect(() => {
    setTimeout(() => setCall(getCookie(COOKIE_IDENTIFIER_KEY) || null), time);
  }, [call]);

  return { call, updateCall };
};

export default useCall;
