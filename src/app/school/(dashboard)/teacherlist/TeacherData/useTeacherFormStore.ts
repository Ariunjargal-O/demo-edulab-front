import { create } from "zustand";

type TeacherFormState = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    grade: string;
    group: string;
    subjects: string[];

    setField: (field: string, value: string) => void;
    setSubjects: (subjects: string[]) => void;
    reset: () => void;
};

export const useTeacherFormStore = create<TeacherFormState>((set) => ({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    grade: "",
    group: "",
    subjects: [],

    setField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),

    setSubjects: (subjects) => set({ subjects }),

    reset: () =>
        set({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            grade: "",
            group: "",
            subjects: [],
        }),
}));