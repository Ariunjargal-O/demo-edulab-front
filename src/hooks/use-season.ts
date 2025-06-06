// stores/season-store.ts
import { BASE_URL } from '@/constants/baseurl'
import { create } from 'zustand'

// API Base URL - энийг өөрийн backend server-ийн URL-ээр солино


interface Season {
  id: string
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
}

interface CreateSeasonData {
  name: string
  startDate: string
  endDate: string
  isActive?: boolean
  schoolId: string // schoolId нэмэв
}

interface SeasonStore {
  seasons: Season[]
  loading: boolean
  error: string | null
  submitting: boolean
  
  // Actions
  fetchSeasons: (schoolId: string) => Promise<void>
  createSeason: (data: CreateSeasonData) => Promise<void>
  updateSeason: (season: Season) => Promise<void>
  deleteSeason: (seasonId: string) => Promise<void>
  activateSeason: (seasonId: string) => Promise<void>
  deactivateSeason: (seasonId: string) => Promise<void>
  clearError: () => void
}

// API helper functions
const api = {
  async get(endpoint: string) {
    const response = await fetch(`${BASE_URL}/${endpoint}/allSeason`)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed')
    }
    
    return data
  },

  async post(endpoint: string, body: any) {
    const response = await fetch(`${BASE_URL}/${endpoint}/addSeason`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed')
    }
    
    return data
  },

  async put(endpoint: string, body?: any) {
    const response = await fetch(`${BASE_URL}/${endpoint}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed')
    }
    
    return data
  },

  async delete(endpoint: string) {
    const response = await fetch(`${BASE_URL}/${endpoint}/`, {
      method: 'DELETE',
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed')
    }
    
    return data
  },
}

export const useSeasonStore = create<SeasonStore>((set, get) => ({
  seasons: [],
  loading: false,
  error: null,
  submitting: false,

  fetchSeasons: async (schoolId: string) => {
    try {
      set({ loading: true, error: null })
      
      const response = await api.get(`/seasons/${schoolId}`)
      
      set({ 
        seasons: response.data || [],
        loading: false 
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Улирлуудыг ачааллахад алдаа гарлаа',
        loading: false 
      })
    }
  },

  createSeason: async (data: CreateSeasonData) => {
    try {
      set({ submitting: true, error: null })
      
      // schoolId-г endpoint болон body-д дамжуулах
      const response = await api.post(`/seasons/${data.schoolId}`, {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
        schoolId: data.schoolId // body дотор ч дамжуулах
      })
      
      // Add new season to the list
      set(state => ({
        seasons: [...state.seasons, response.data],
        submitting: false
      }))
      
      // If the new season is active, update other seasons to inactive
      if (data.isActive) {
        set(state => ({
          seasons: state.seasons.map(season => 
            season.id === response.data.id 
              ? season 
              : { ...season, isActive: false }
          )
        }))
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Улирал үүсгэхэд алдаа гарлаа'
      set({ 
        error: errorMessage,
        submitting: false 
      })
      throw new Error(errorMessage)
    }
  },

  updateSeason: async (season: Season) => {
    try {
      set({ submitting: true, error: null })
      
      const response = await api.put(`/seasons/${season.id}`, {
        name: season.name,
        startDate: season.startDate,
        endDate: season.endDate,
        isActive: season.isActive,
      })
      
      // Update season in the list
      set(state => ({
        seasons: state.seasons.map(s => 
          s.id === season.id ? response.data : s
        ),
        submitting: false
      }))
      
      // If this season is now active, update other seasons to inactive
      if (season.isActive) {
        set(state => ({
          seasons: state.seasons.map(s => 
            s.id === season.id 
              ? s 
              : { ...s, isActive: false }
          )
        }))
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Улирал шинэчлэхэд алдаа гарлаа'
      set({ 
        error: errorMessage,
        submitting: false 
      })
      throw new Error(errorMessage)
    }
  },

  deleteSeason: async (seasonId: string) => {
    try {
      set({ submitting: true, error: null })
      
      await api.delete(`/seasons/${seasonId}`)
      
      // Remove season from the list
      set(state => ({
        seasons: state.seasons.filter(season => season.id !== seasonId),
        submitting: false
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Улирал устгахад алдаа гарлаа'
      set({ 
        error: errorMessage,
        submitting: false 
      })
      throw new Error(errorMessage)
    }
  },

  activateSeason: async (seasonId: string) => {
    try {
      set({ submitting: true, error: null })
      
      const response = await api.put(`/seasons/${seasonId}/activate`)
      
      // Update all seasons - deactivate others, activate this one
      set(state => ({
        seasons: state.seasons.map(season => ({
          ...season,
          isActive: season.id === seasonId
        })),
        submitting: false
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Улирал идэвхжүүлэхэд алдаа гарлаа'
      set({ 
        error: errorMessage,
        submitting: false 
      })
      throw new Error(errorMessage)
    }
  },

  deactivateSeason: async (seasonId: string) => {
    try {
      set({ submitting: true, error: null })
      
      const response = await api.put(`/seasons/${seasonId}/deactivate`)
      
      // Update the specific season to inactive
      set(state => ({
        seasons: state.seasons.map(season => 
          season.id === seasonId 
            ? { ...season, isActive: false }
            : season
        ),
        submitting: false
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Улирал зогсоохоד алдаа гарлаа'
      set({ 
        error: errorMessage,
        submitting: false 
      })
      throw new Error(errorMessage)
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))

// Export types for use in components
export type { Season, CreateSeasonData }