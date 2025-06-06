interface GradeComponents {
    attendance: { name: string; weight: number }
    activity: { name: string; weight: number }
    midterm: { name: string; weight: number }
    final: { name: string; weight: number }
    total: { name: string; weight: number }
  }
  
  interface SemesterGrades {
    attendance: number
    activity: number
    midterm: number
    final: number
  }
  
  export function calculateTotalScore(grades: SemesterGrades, components: GradeComponents): number {
    const attendanceScore = (grades.attendance / components.attendance.weight) * components.attendance.weight
    const activityScore = (grades.activity / components.activity.weight) * components.activity.weight
    const midtermScore = (grades.midterm / components.midterm.weight) * components.midterm.weight
    const finalScore = (grades.final / components.final.weight) * components.final.weight
  
    return attendanceScore + activityScore + midtermScore + finalScore
  }
  
  // Add a new function to get semester scores for all semesters
  
  export function getSemesterScores(
    allSemesterGrades: Record<string, SemesterGrades>,
    components: GradeComponents,
  ): Record<string, number> {
    const result: Record<string, number> = {}
  
    for (const semester in allSemesterGrades) {
      result[semester] = calculateTotalScore(allSemesterGrades[semester], components)
    }
  
    return result
  }
  
  // Update the calculateYearlyAverage function to be more robust
  
  export function calculateYearlyAverage(
    semesterGrades: Record<string, SemesterGrades>,
    components: GradeComponents,
  ): number {
    const semesterScores = Object.values(semesterGrades).map((grades) => calculateTotalScore(grades, components))
  
    if (semesterScores.length === 0) return 0
  
    return semesterScores.reduce((sum, score) => sum + score, 0) / semesterScores.length
  }
  
  // Add a function to sort students by name or score
  
  export function sortStudentsByScore(
    students: any[],
    semester: string,
    components: GradeComponents,
    yearlyAverages: Record<number, number>,
    viewMode: string,
    sortOrder: "asc" | "desc",
  ): any[] {
    return [...students].sort((a, b) => {
      const scoreA =
        viewMode === "semester" ? calculateTotalScore(a.grades[semester] || {}, components) : yearlyAverages[a.id] || 0
  
      const scoreB =
        viewMode === "semester" ? calculateTotalScore(b.grades[semester] || {}, components) : yearlyAverages[b.id] || 0
  
      return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA
    })
  }
  
  export function sortStudentsByName(students: any[], sortOrder: "asc" | "desc"): any[] {
    return [...students].sort((a, b) => {
      const nameA = `${a.lastName} ${a.firstName}`.toLowerCase()
      const nameB = `${b.lastName} ${b.firstName}`.toLowerCase()
  
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
    })
  }
  