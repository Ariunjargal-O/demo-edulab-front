// useTeacherFormStore.ts
import { create } from "zustand";

interface TeacherFormStore {
  subjects: string[]; // Зөвхөн ID-үүдийн array
  setSubjects: (subjects: string[]) => void;
  clearSubjects: () => void;
}

export const useTeacherFormStore = create<TeacherFormStore>((set) => ({
  subjects: [],
  setSubjects: (subjects: string[]) => set({ subjects }),
  clearSubjects: () => set({ subjects: [] }),
}));