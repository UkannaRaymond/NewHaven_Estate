import { create } from "zustand";

interface CreatePropertyModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreatePropertModalStore = create<CreatePropertyModalStore>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }),
);
