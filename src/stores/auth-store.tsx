import { create } from "zustand";
import { persist } from "zustand/middleware";

// School бүтэц
interface School {
  id: string;
  name: string;
  phoneNumber: string;
  city: string;
  address: string;
}

// Teacher-тай холбоотой бүтцүүд
interface Grade {
  id: string;
  gradeNumber: string;
  schoolId: string;
  teacherId: string;
  personalGradeTeacherId: string;
  students?: Student[];
}

interface Group {
  id: string;
  groupName: string;
  gradeId: string;
  teacherId: string;
  schoolId: string;
  students?: Student[];
}

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber1: string;
  profilePhoto?: string;
  birthday?: string;
  sex?: string;
  gradeGroupId: string;
}

interface Subject {
  id: string;
  name: string;
  globalSubject?: {
    id: string;
    name: string;
  };
}

interface Lesson {
  id: string;
  lessonName: string;
  day: string;
  subject: Subject;
  group: {
    id: string;
    groupName: string;
  };
}

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: Subject;
  group?: Group;
  grade?: Grade;
}

interface Score {
  id: string;
  score: number;
  lesson: {
    id: string;
    lessonName: string;
    schoolSubject: {
      id: string;
      name: string;
    };
  };
  season: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
  };
}

interface Attendance {
  id: string;
  date: string;
  status: string;
}

// Teacher бүтэц
interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber1?: string;
  phoneNumber2?: string;
  profilePhoto?: string;
  birthday?: string;
  sex?: string;
  personalGrades?: Grade[];
  personalGroups?: Group[];
  teachingGrades?: Grade[];
  teachingGroups?: Group[];
  subjects?: Subject[];
  lessons?: Lesson[];
  schedule?: Schedule[];
}

// Student бүтэц - Login response-с ирж байгаа бүтэцтэй тохирох
interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber1: string;
  profilePhoto?: string;
  birthday?: string;
  sex?: string;
  gradeGroupId: string;
  grade: Grade;
  group: Group;
  teacher: Teacher;
  scores: Score[];
  attendance: Attendance[];
  schedule: Schedule[];
}

// Parent бүтэц
interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber1?: string;
  phoneNumber2?: string;
  relation: string;
  email: string;
  children: StudentProfile[];
}

// Admin бүтэц
interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profilePhoto?: string;
}

// SchoolAdmin бүтэц
interface SchoolAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  profilePhoto?: string;
  birthday?: string;
  sex?: string;
}

// JWT Token payload interface
interface TokenPayload {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  studentId?: string;
  schoolId?: string;
  schoolName?: string;
  gradeGroupId?: string;
  adminId?: string;
  iat: number;
  exp: number;
  schoolAdminId?: string;
  teacherId?: string;
  parentId?: string;
}

interface AuthState {
  // Үндсэн утгууд
  token: string;
  role: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;

  // School утгууд
  school?: School;
  schoolName?: string;

  // Role-specific утгууд
  teacher?: Teacher;

  parent?: Parent;
  admin?: Admin;
  schoolAdmin?: SchoolAdmin;
  student?: StudentProfile; // student хэрэглэгчийн хувьд
  students?: StudentProfile[]; // parent хэрэглэгчийн хувьд олон хүүхэд
  // JWT Token payload-аас ирсэн утгууд
  schoolId?: string;
  teacherId?: string;
  studentId?: string;
  parentId?: string;
  adminId?: string;
  schoolAdminId?: string;
  gradeGroupId?: string;

  // Token expiration
  tokenExpiration?: number;

  // Functions
  clearAuth: () => void;
  setAuth: (data: Partial<AuthData>) => void;
  setAuthFromLogin: (loginResponse: LoginResponse) => void;

  // Helper functions
  isAuthenticated: () => boolean;
  isTokenValid: () => boolean;
  hasRole: (role: string) => boolean;
  getFullName: () => string;
  getSchoolInfo: () => School | undefined;
  getSchoolName: () => string | undefined;
  getTeacherInfo: () => Teacher | undefined;
  getStudentInfo: () => StudentProfile | undefined;
  getParentInfo: () => Parent | undefined;
  getAdminInfo: () => Admin | undefined;
  getSchoolAdminInfo: () => SchoolAdmin | undefined;
  isAdmin: () => boolean;
  isSchoolAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
  isParent: () => boolean;

  // Student specific helpers
  getStudentGrade: () => Grade | undefined;
  getStudentGroup: () => Group | undefined;
  getStudentTeacher: () => Teacher | undefined;
  getStudentScores: () => Score[];
  getStudentAttendance: () => Attendance[];
}

// Login response type - Login response-н бодит бүтэцтэй тохирох
interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    schoolName?: string;
    student?: StudentProfile;
    teacher?: Teacher;
    parent?: Parent;
    admin?: Admin;
    schoolAdmin?: SchoolAdmin;
    school?: School;
  };
}

// AuthState-аас functions-ийг хассан data type
type AuthData = Omit<
  AuthState,
  | "clearAuth"
  | "setAuth"
  | "setAuthFromLogin"
  | "isAuthenticated"
  | "isTokenValid"
  | "hasRole"
  | "getFullName"
  | "getSchoolInfo"
  | "getSchoolName"
  | "getTeacherInfo"
  | "getStudentInfo"
  | "getParentInfo"
  | "getAdminInfo"
  | "getSchoolAdminInfo"
  | "isAdmin"
  | "isSchoolAdmin"
  | "isTeacher"
  | "isStudent"
  | "isParent"
  | "getStudentGrade"
  | "getStudentGroup"
  | "getStudentTeacher"
  | "getStudentScores"
  | "getStudentAttendance"
>;

// JWT Token decode хийх функц
const decodeJWT = (token: string): TokenPayload | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
};

// ... (таны бүх интерфэйсүүд өмнөхтэй адил хэвээр үлдэнэ)

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: "",
      role: "",
      userId: "",
      email: "",
      firstName: "",
      lastName: "",

      school: undefined,
      schoolName: undefined,
      teacher: undefined,
      student: undefined,
      parent: undefined,
      admin: undefined,
      schoolAdmin: undefined,

      schoolId: undefined,
      teacherId: undefined,
      studentId: undefined,
      parentId: undefined,
      adminId: undefined,
      schoolAdminId: undefined,
      gradeGroupId: undefined,
      tokenExpiration: undefined,

      clearAuth: () =>
        set({
          token: "",
          role: "",
          userId: "",
          email: "",
          firstName: "",
          lastName: "",
          school: undefined,
          schoolName: undefined,
          teacher: undefined,
          student: undefined,
          parent: undefined,
          admin: undefined,
          schoolAdmin: undefined,
          schoolId: undefined,
          teacherId: undefined,
          studentId: undefined,
          parentId: undefined,
          adminId: undefined,
          schoolAdminId: undefined,
          gradeGroupId: undefined,
          tokenExpiration: undefined,
        }),

      setAuth: (data: Partial<AuthData>) => {
        console.log("setAuth called with:", data);
        set((state) => ({ ...state, ...data }));
      },

      setAuthFromLogin: (loginResponse: LoginResponse) => {
        console.log("setAuthFromLogin called with:", loginResponse);

        if (!loginResponse.success || !loginResponse.token) {
          console.error("Invalid login response");
          return;
        }

        const { token, user } = loginResponse;
        const tokenPayload = decodeJWT(token);

        if (!tokenPayload) {
          console.error("Failed to decode JWT token");
          return;
        }

        let schoolName: string | undefined;
        if (user.schoolName) {
          schoolName = user.schoolName;
        } else if (user.school?.name) {
          schoolName = user.school.name;
        } else if (tokenPayload.schoolName) {
          schoolName = tokenPayload.schoolName;
        }

        set({
          token,
          role: user.role,
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,

          school: user.school,
          schoolName,

          teacher: user.teacher,
          student: user.student,

          parent: user.parent,
          admin: user.admin,
          schoolAdmin: user.schoolAdmin,

          schoolId: tokenPayload.schoolId,
          studentId: tokenPayload.studentId,
          gradeGroupId: tokenPayload.gradeGroupId,
          tokenExpiration: tokenPayload.exp,

          teacherId:
            user.role === "teacher"
              ? tokenPayload.teacherId || user.teacher?.id
              : undefined,
          parentId:
            user.role === "parent"
              ? tokenPayload.parentId || user.parent?.id
              : undefined,
          adminId:
            user.role === "admin"
              ? tokenPayload.adminId || user.admin?.id
              : undefined,
          schoolAdminId:
            user.role === "school"
              ? tokenPayload.schoolAdminId || user.schoolAdmin?.id
              : undefined,
        });
      },

      isAuthenticated: () => {
        const state = get();
        return !!state.token && !!state.role && state.isTokenValid();
      },

      isTokenValid: () => {
        const state = get();
        if (!state.token || !state.tokenExpiration) return false;
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime < state.tokenExpiration;
      },

      hasRole: (role: string) => get().role === role,
      getFullName: () => `${get().firstName} ${get().lastName}`.trim(),
      getSchoolInfo: () => get().school,
      getSchoolName: () => get().schoolName,
      getTeacherInfo: () => get().teacher,
      getStudentInfo: () => get().student,
      getParentInfo: () => get().parent,
      getAdminInfo: () => get().admin,
      getSchoolAdminInfo: () => get().schoolAdmin,
      isAdmin: () => get().role === "admin",
      isSchoolAdmin: () => get().role === "school",
      isTeacher: () => get().role === "teacher",
      isStudent: () => get().role === "student",
      isParent: () => get().role === "parent",
      getStudentGrade: () => get().student?.grade,
      getStudentGroup: () => get().student?.group,
      getStudentTeacher: () => get().student?.teacher,
      getStudentScores: () => get().student?.scores || [],
      getStudentAttendance: () => get().student?.attendance || [],
    }),
    {
      name: "auth-storage",
      partialize: (state) => {
        return {
          token: state.token,
          role: state.role,
          userId: state.userId,
          email: state.email,
          firstName: state.firstName,
          lastName: state.lastName,

          school: state.school,
          schoolName: state.schoolName,
          teacher: state.teacher,
          student: state.student,
          parent: state.parent,
          admin: state.admin,
          schoolAdmin: state.schoolAdmin,

          schoolId: state.schoolId,
          teacherId: state.teacherId,
          studentId: state.studentId,
          parentId: state.parentId,
          adminId: state.adminId,
          schoolAdminId: state.schoolAdminId,
          gradeGroupId: state.gradeGroupId,
          tokenExpiration: state.tokenExpiration,
        };
      },
    }
  )
);

// Login функцэд ашиглах тохиргоо
export const handleLoginSuccess = (loginResponse: LoginResponse) => {
  const { setAuthFromLogin } = useAuthStore.getState();
  setAuthFromLogin(loginResponse);
};

export const checkTokenExpiration = () => {
  const { isTokenValid, clearAuth } = useAuthStore.getState();
  if (!isTokenValid()) {
    console.log("Token expired, clearing auth");
    clearAuth();
    return false;
  }
  return true;
};

// Export interfaces for use in other components
export type {
  AuthState,
  LoginResponse,
  StudentProfile,
  Teacher,
  Parent,
  Admin,
  SchoolAdmin,
  School,
  Grade,
  Group,
  Subject,
  Lesson,
  Schedule,
  Score,
  Attendance,
  TokenPayload,
};
