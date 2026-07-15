import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Region = 'US' | 'MD' | null;

interface RegionState {
  region: Region;
  setRegion: (region: Region) => void;
  currency: string;
  isHydrated: boolean;
  setHydrated: (state: boolean) => void;
}

export const useRegionStore = create<RegionState>()(
  persist(
    (set) => ({
      region: null,
      currency: '$',
      isHydrated: false,
      setRegion: (region) =>
        set({
          region,
          currency: region === 'MD' ? 'MDL' : '$',
        }),
      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: 'region-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(true);
      },
    }
  )
);
