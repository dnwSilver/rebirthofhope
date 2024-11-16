import { ISavior } from "@/db/domain";
import { readCurrentSavior } from "@/server-functions/read-current-savior";
import { useProgress } from "@/store/store";
import { useState, useEffect } from "react";

const useCurrentSaviour = () => {
  const [currentSavior, setCurrentSavior] = useState<ISavior | null>();

  const verify = () => {
    readCurrentSavior().then((savior) => setCurrentSavior(JSON.parse(savior)));
  };

  useEffect(() => {
    verify();
  }, []);

  return { currentSavior, verify };
};

export default useCurrentSaviour;
