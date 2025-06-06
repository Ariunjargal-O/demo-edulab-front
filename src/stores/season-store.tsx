import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Season {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

interface SeasonStore {
  // State
  activeSeason: Season | null;
  seasons: Season[];
  
  // Actions
  setActiveSeason: (season: Season | null) => void;
  setSeasons: (seasons: Season[]) => void;
  updateSeasonStatus: (seasonId: string, isActive: boolean) => void;
  getActiveSeasonId: () => string | null;
  clearSeasonData: () => void;
  removeSeason: (seasonId: string) => void;
}

export const useSeasonStore = create<SeasonStore>()(
  persist(
    (set, get) => ({
      // Initial state
      activeSeason: null,
      seasons: [],

      // Set active season
      setActiveSeason: (season) => {
        set({ activeSeason: season });
      },

      // Set all seasons and automatically find the active one
      setSeasons: (seasons) => {
        const activeSeason = seasons.find(season => season.isActive) || null;
        set({ 
          seasons,
          activeSeason 
        });
      },

      // Update season status and set as active if needed
      updateSeasonStatus: (seasonId, isActive) => {
        set((state) => {
          const updatedSeasons = state.seasons.map(season => {
            if (season.id === seasonId) {
              return { ...season, isActive };
            }
            // If this season is being activated, deactivate others
            if (isActive) {
              return { ...season, isActive: false };
            }
            return season;
          });

          const newActiveSeason = isActive 
            ? updatedSeasons.find(s => s.id === seasonId) || null
            : updatedSeasons.find(s => s.isActive) || null;

          return {
            seasons: updatedSeasons,
            activeSeason: newActiveSeason
          };
        });
      },

      // Get active season ID (helper function)
      getActiveSeasonId: () => {
        const { activeSeason } = get();
        return activeSeason?.id || null;
      },

      // Clear all season data
      clearSeasonData: () => {
        set({
          activeSeason: null,
          seasons: []
        });
      },

      // Remove season from store
      removeSeason: (seasonId) => {
        set((state) => {
          const updatedSeasons = state.seasons.filter(s => s.id !== seasonId);
          const newActiveSeason = state.activeSeason?.id === seasonId 
            ? null 
            : state.activeSeason;
          
          return {
            seasons: updatedSeasons,
            activeSeason: newActiveSeason
          };
        });
      }
    }),
    {
      name: 'season-storage', // localStorage key
      partialize: (state) => ({
        activeSeason: state.activeSeason,
        seasons: state.seasons
      })
    }
  )
);