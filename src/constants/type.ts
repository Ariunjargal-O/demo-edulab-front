export interface DecodedTokenType {
  user: { email: string; password: string; role: string; id: string };
}

export enum UserRole {
  teacher = "teacher",
  student = "student",
  parent = "parent",
  school = "school",
  admin = "admin",
}

export enum UserSex {
  male = "male",
  female = "female",
}

export enum Day {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export interface Exam {
  id: number | string;
  subject: string;
  content: string;
  duration?: string;
  totalMarks?: string;
  type: "midterm" | "seasonal";
  createdAt: string;
}

export interface FormData {
  subject: string;
  content: string;
  duration: string;
  totalMarks: string;
}

export interface ExamDialogProps {
  type: "midterm" | "seasonal";
  title: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleSubmit: (type: "midterm" | "seasonal") => void;
  loading: boolean;
  dialogOpen: { midterm: boolean; seasonal: boolean };
  setDialogOpen: React.Dispatch<
    React.SetStateAction<{ midterm: boolean; seasonal: boolean }>
  >;
}

export interface FormData {
  subject: string;
  content: string;
  duration: string;
  totalMarks: string;
}


export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  teacherId?: string;
  studentId?: string;
  parentId?: string;
  schoolId?: string;
}

export interface Admin {
  id: string;
  email: string;
  password: string;
}

export interface SchoolUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  phoneNumber?: number;
  phoneNumber2?: number;
  profilePhoto?: string;
  birthday?: string; // ISO date string
  address: string;
  createdAt: string; // ISO date string
  schoolInfoId?: string;
  schoolAdminId: string;
}

export interface SchoolInfo {
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
  website: string | null;
  description: string | null;
  admins: SchoolAdmin[];
}

export interface SchoolAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber?: number;
  phoneNumber2?: number;
  profilePhoto?: string;
  birthday?: string; // ISO date string
}

export interface CreateClassData {
  gradeNumber: string;
  groupName: string;
  teacherId?: string;  // Заавал биш, optional болгосон
  schoolId: string;
  schoolAdminId: string;
} 

export interface ClassData {
  id: string; // Ангиудын ID
  grade: string; // Түвшин (жишээ нь 1-р анги, 2-р анги гэх мэт)
  group: string; // Группын нэр (жишээ нь "Групп 1", "Групп А" гэх мэт)
  teacherLast:  string
  teacherFirst: string; // Багшийн нэр
  teacherEmail: string; // Багшийн имэйл
  studentIds: string[]; // Сурагчдын ID (ангид бүртгэлтэй сурагчид)
}


export interface TeacherType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber?: number;
  phoneNumber2?: number;
  profilePhoto?: string;
  birthday?: string; // ISO date string
  sex?: UserSex;
  gradeId?: string;
  schoolUserId?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber1?: number;
  phoneNumber2?: number;
  profilePhoto?: string;
  birthday?: string; // ISO date string
  sex?: UserSex;
  gradeId?: string;
  schoolUserId?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  profilePhoto?: string;
  birthday?: string; // ISO date string
  address?: string;
  password?: string;
  gender?: UserSex | string; // UserSex биш бол string болгох боломжтой
  teacherId?: string;
  teacher?: string;           // Ангийн багшийн нэр
  teacherPhone?: string;      // Багшийн утасны дугаар
  groupId?: string;
  group?: string;             // Бүлгийн нэр
  gradeId?: string;
  class?: string;             // Анги
  parentId?: string;
  schoolId?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


;

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber1?: number;
  phoneNumber2?: number;
  address?: string;
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface Subject {
  id: number;
  name: string;
}

export interface Lesson {
  id: string;
  name: string;
  teacherId: string;
  day: Day;
  groupId?: string;
  seasonId?: string;
  subjectId?: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Score {
  id: string;
  studentId: string;
  lessonId: string;
  seasonId?: string;
  attendance?: number;
  activity?: number;
  midterm?: number;
  final?: number;
  totalScore?: number;
}

export interface Attendance {
  id: string;
  date: string; // ISO date string
  present: boolean;
  studentId: string;
}

export interface Season {
  id: string;
  name: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface MidExam {
  id: number;
  title: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  lessonId: string;
}

export interface FinalExam {
  id: number;
  title: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  lessonId: string;
}

export interface Result {
  id: number;
  studentId: string;
  examType: string;
  score: number;
  midExamId?: number;
  finalExamId?: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  gradeId?: string;
  groupId?: string;
}

export interface SchoolInfo {
  id: string;
  info: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}



export interface AttendanceRecord {
  id?: string;
  date: string;
  arrivalTime?: string;
  departureTime?: string;
  totalHours?: number;
}

export interface MonthlyStats {
  totalHours: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
}

export interface CreateScheduleRequest {
  schoolId: string;
  teacherId: string;
  groupId: string;
  lessonId: string;
  subjectId: string;
  day: Day;
  startTime: string;
  endTime: string;
  gradeId?: string;
  gradeGroupId?: string;
  studentId?: string;
}

export interface UpdateScheduleRequest extends Partial<CreateScheduleRequest> {
  id: string;
}

export interface ScheduleQuery {
  schoolId?: string;
  teacherId?: string;
  groupId?: string;
  gradeId?: string;
  studentId?: string;
  day?: Day;
  week?: string;
  date?: string;
}

export interface BulkCreateScheduleRequest {
  schedules: CreateScheduleRequest[];
}

export interface Schedule {
  groupName: string;
  gradeNumber: string;
  id: string;
  schoolId: string;
  teacherId: string;
  groupId: string;
  lessonId?: string;
  subjectId: string;
  gradeId: string | null;
  day: string;
  startTime: string;
  endTime: string;
  seasonId: string;

  // Nested objects
  teacher?: {
    firstName: string;
    lastName: string;
    email?: string;
  };
  lesson?: {
    title: string;
    description?: string;
  };
  group?: {
    groupName: string;
  };
  grade?: {
    gradeNumber: string;
  };
  globalSubject?: {
    name: string;
    code?: string;
  };
  schoolSubject?: {
    name: string;
    code?: string;
  };
}


export interface ScheduleFormData {
  lessonName?: string;
  day: string;
  startTime: string;
  endTime: string;
  gradeNumber?: string;
  groupName: string;
  groupId: string;
  teacherId: string;
  subjectId: string;
  seasonId?: string;
}

// For API responses
export interface ScheduleResponse {
  data: Schedule[];
  total: number; 
  page: number;
  limit: number;
}

// For creating/updating schedules
export interface CreateSchedulePayload {
  day: string;
  startTime: string;
  endTime: string;
  groupId: string;
  teacherId: string;
  subjectId: string;
  seasonId?: string;
}

// For dropdown options
export interface ScheduleOption {
  value: string;
  label: string;
}

// For the days of week
export const DAYS: ScheduleOption[] = [
  { value: "MONDAY", label: "Даваа" },
  { value: "TUESDAY", label: "Мягмар" },
  { value: "WEDNESDAY", label: "Лхагва" },
  { value: "THURSDAY", label: "Пүрэв" },
  { value: "FRIDAY", label: "Баасан" },
  { value: "SATURDAY", label: "Бямба" },
  { value: "SUNDAY", label: "Ням" },
];
