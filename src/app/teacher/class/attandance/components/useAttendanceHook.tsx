"use client"
import { useState, useCallback } from "react"
import { attendanceApi } from "./StudentApi"

export const useAttendance = () => {
  const [attendanceData, setAttendanceData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchAttendance = useCallback(async (year: string, semester: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await attendanceApi.get(year, semester)
      setAttendanceData(data)
      return data
    } catch (err: any) {
      setError(err.message)
      console.error("Error fetching attendance:", err)
      return {}
    } finally {
      setLoading(false)
    }
  }, [])

  const saveAttendance = async (year: string, semester: string, data: any) => {
    try {
      setSaving(true)
      setError(null)

      const payload = {
        year,
        semester,
        attendanceData: data,
      }

      await attendanceApi.save(payload)
      setAttendanceData(data)

      return { success: true, message: "Ирцийн мэдээлэл амжилттай хадгалагдлаа!" }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setSaving(false)
    }
  }

  const getAttendanceStats = async (year: string, semester: string) => {
    try {
      const stats = await attendanceApi.getStats(year, semester)
      return stats
    } catch (err: any) {
      setError(err.message)
      console.error("Error fetching attendance stats:", err)
      return []
    }
  }

  return {
    attendanceData,
    loading,
    error,
    saving,
    fetchAttendance,
    saveAttendance,
    getAttendanceStats,
    setAttendanceData,
  }
}
