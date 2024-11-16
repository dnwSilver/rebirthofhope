import { getCookie } from "@/helpers/cookies";
import { useEffect, useState } from "react";

const useCall = () => {
  const [call, setCall] = useState<string | undefined>();

  const updateCall = () => {
    setCall(getCookie("call"));
  };

  useEffect(() => {
    setCall(getCookie("call"));
  }, [call]);

  return { call, updateCall };
};

export default useCall;
