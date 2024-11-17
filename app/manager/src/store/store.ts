import { ISavior } from "@/db/domain";
import { readCurrentSavior } from "@/server-functions/read-current-savior";
import { create } from "zustand";

type Progress = {
  hide: boolean;
  open: boolean;
  show: () => void;
  toggle: () => void;
};

export const useProgress = create<Progress>()((set) => ({
  hide: true,
  open: false,
  show: () =>
    set(() => ({
      hide: false,
    })),
  toggle: () => set((state) => ({ open: !state.open })),
}));

type Savior = {
  currentSavior: ISavior | undefined;
  actualize: () => void;
};

export const useSavior = create<Savior>((set) => ({
  currentSavior: undefined,
  actualize: async () => {
    const savior = await readCurrentSavior();

    set((state) => ({ currentSavior: JSON.parse(savior) }));
  },
}));
