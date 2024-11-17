import { useSavior } from "@/store/store";
import { useEffect } from "react";

const useCurrentSaviour = () => {
  const { currentSavior, actualize } = useSavior();

  useEffect(() => {
    actualize();
  }, []);

  return { currentSavior, actualize };
};

export default useCurrentSaviour;
