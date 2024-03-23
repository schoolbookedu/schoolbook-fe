import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMaterialStore = create()(
  persist(
    (set) => ({
      material: undefined,
      setMaterial: (values) => set({ material: values }),
    }),
    {
      name: "materialState",
    }
  )
);
