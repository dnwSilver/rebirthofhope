import { ISavior } from "@/db/domain";
import { readCurrentSavior } from "@/server-functions/read-current-savior";
import { useState, useEffect } from "react";

const useCurrentSaviour = () => {
  const [currentSavior, setCurrentSavior] = useState<ISavior | null>();

  useEffect(() => {
    readCurrentSavior().then((savior) => setCurrentSavior(JSON.parse(savior)));
  }, []);

  return currentSavior;
};

export default useCurrentSaviour;
