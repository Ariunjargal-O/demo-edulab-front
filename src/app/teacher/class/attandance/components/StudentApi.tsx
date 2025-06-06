import { BASE_URL } from "@/constants/baseurl"

class ApiError extends Error {
  status: number; // ✅ Add this line

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype); // ✅ Ensures instanceof works correctly
  }
}

const apiRequest = async (endpoint: string, options: any = {}) => {
  const url = `${BASE_URL}${endpoint}`
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(data.error || "API request failed", response.status)
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError("Network error occurred", 500)
  }
}

export const studentsApi = {
  // Get all students
  getAll: () => apiRequest("/students"),

  // Create new student
  create: (studentData: any) =>
    apiRequest("/students", {
      method: "POST",
      body: JSON.stringify(studentData),
    }),

  // Update student
  update: (id: string, studentData: any) =>
    apiRequest(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(studentData),
    }),

  // Delete student
  delete: (id: string) =>
    apiRequest(`/students/${id}`, {
      method: "DELETE",
    }),
}

export const attendanceApi = {
  // Get attendance data
  get: (year: string, semester: string) => apiRequest(`/attendance?year=${year}&semester=${semester}`),

  // Save attendance data
  save: (attendanceData: any) =>
    apiRequest("/attendance", {
      method: "POST",
      body: JSON.stringify(attendanceData),
    }),

  // Get attendance statistics
  getStats: (year: string, semester: string) => apiRequest(`/attendance/stats?year=${year}&semester=${semester}`),
}
