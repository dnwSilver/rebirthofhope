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