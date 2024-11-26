import { ISavior, SHORT_POLLING_INTERVAL } from "@/db/domain";
import { readSaviors } from "@/server-functions/read-saviors";
import { useEffect, useState } from "react";

const useSaviors = () => {
  const [saviors, setSaviors] = useState<ISavior[]>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      readSaviors().then((result) => setSaviors(JSON.parse(result)));
    }, SHORT_POLLING_INTERVAL);

    readSaviors().then((result) => setSaviors(JSON.parse(result)));
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { saviors };
};

export default useSaviors;
