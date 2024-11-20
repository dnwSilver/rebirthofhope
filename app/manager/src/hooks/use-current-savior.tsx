import { useSavior } from "@/store/store";
import { useEffect } from "react";

const useCurrentSavior = () => {
  const { currentSavior, actualize } = useSavior();

  useEffect(() => {
    actualize();
  }, []);

  return { currentSavior, actualize };
};

export default useCurrentSavior;
