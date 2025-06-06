"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, X, Loader2 } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { BASE_URL } from "@/constants/baseurl"
import { useAuthStore } from "@/stores/auth-store"
import { useSeasonStore } from "@/stores/season-store"

const seasonFormSchema = z
  .object({
    SeasonName: z.string().min(1, "Улирлын нэрийг оруулна уу").max(100, "Улирлын нэр хэтэрхий урт байна"),
    startDate: z.string().min(1, "Эхлэх огноог оруулна уу"),
    endDate: z.string().min(1, "Дуусах огноог оруулна уу"),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true
      return new Date(data.startDate) < new Date(data.endDate)
    },
    {
      message: "Эхлэх огноо дуусах огнооноос өмнө байх ёстой",
      path: ["endDate"],
    },
  )

type SeasonFormValues = z.infer<typeof seasonFormSchema>

interface Season {
  id: string
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  createdAt: string
}

interface AddSeasonDialogProps {
  isOpen: boolean
  editingSeason?: Season | null
  onCancel: () => void
  schoolId: string
  onSuccess: () => void
  // Required props for lesson scheduling
  schoolSubjectId: string
  day: string
  startTime: string
  endTime: string
  gradeId: string
  groupId: string
  teacherId: string
  lessonId: string
  // Optional props
  globalSubjectId?: string
  gradeGroupId?: string
  studentId?: string
  seasonId?: string
}

export const AddSeasonDialog = ({ 
  isOpen, 
  editingSeason, 
  onCancel, 
  schoolId, 
  onSuccess,
  schoolSubjectId,
  globalSubjectId,
  day,
  startTime,
  endTime,
  gradeId,
  groupId,
  teacherId,
  lessonId, // Changed from lessonName to lessonId
  gradeGroupId,
  studentId,
  seasonId
}: AddSeasonDialogProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { activeSeason } = useSeasonStore();

  const form = useForm<SeasonFormValues>({
    resolver: zodResolver(seasonFormSchema),
    defaultValues: {
      SeasonName: "",
      startDate: "",
      endDate: "",
      isActive: false,
    },
  })

  useEffect(() => {
    if (editingSeason) {
      form.reset({
        SeasonName: editingSeason.name,
        startDate: editingSeason.startDate,
        endDate: editingSeason.endDate,
        isActive: editingSeason.isActive,
      })
    } else {
      form.reset({
        SeasonName: "",
        startDate: "",
        endDate: "",
        isActive: false,
      })
    }
  }, [editingSeason, form])

  const createSeason = async (data: {
    name: string
    startDate: string
    endDate: string
    isActive: boolean
    schoolId: string
    schoolSubjectId?: string
    globalSubjectId?: string
    day?: string
    startTime?: string
    endTime?: string
    gradeId?: string
    groupId?: string
    teacherId?: string
    lessonId?: string // Changed from lessonName to lessonId
    gradeGroupId?: string
    studentId?: string
    seasonId?: string
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/seasons/${schoolId}/addSeason`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Улирал үүсгэхэд алдаа гарлаа")
      }

      return result.data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Улирал үүсгэхэд алдаа гарлаа"
      throw new Error(errorMessage)
    }
  }

  const updateSeason = async (season: {
    id: string
    name: string
    startDate: string
    endDate: string
    isActive: boolean
    schoolSubjectId?: string
    globalSubjectId?: string
    day?: string
    startTime?: string
    endTime?: string
    gradeId?: string
    groupId?: string
    teacherId?: string
    lessonId?: string // Changed from lessonName to lessonId
    gradeGroupId?: string
    studentId?: string
    seasonId?: string
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/seasons/${schoolId}/update${season.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: season.name,
          startDate: season.startDate,
          endDate: season.endDate,
          isActive: season.isActive,
          schoolSubjectId: season.schoolSubjectId,
          globalSubjectId: season.globalSubjectId,
          day: season.day,
          startTime: season.startTime,
          endTime: season.endTime,
          gradeId: season.gradeId,
          groupId: season.groupId,
          teacherId: season.teacherId,
          lessonId: season.lessonId, // Changed from lessonName to lessonId
          gradeGroupId: season.gradeGroupId,
          studentId: season.studentId,
          seasonId: season.seasonId,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Улирал шинэчлэхэд алдаа гарлаа")
      }

      return result.data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Улирал шинэчлэхэд алдаа гарлаа"
      throw new Error(errorMessage)
    }
  }

  const handleSubmit = async (data: SeasonFormValues) => {
    try {
      setSubmitting(true)
      setError(null)

      // Get seasonId from activeSeason
      const { activeSeason } = useSeasonStore();
      const currentSeasonId = activeSeason?.id || seasonId;

      // Check required fields
      const requiredFields = {
        schoolSubjectId,
        day,
        startTime,
        endTime,
        gradeId,
        groupId,
        teacherId,
        schoolId,
        lessonId
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        throw new Error(`Дараах талбарууд заавал шаардлагатай: ${missingFields.join(', ')}`);
      }

      // Transform the form data to match Season interface
      const seasonData = {
        name: data.SeasonName,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
        schoolId: schoolId,
        schoolSubjectId,
        globalSubjectId,
        day,
        startTime,
        endTime,
        gradeId,
        groupId,
        teacherId,
        lessonId, // Changed from lessonName to lessonId
        gradeGroupId,
        studentId,
        seasonId: currentSeasonId,
      }

      if (editingSeason) {
        await updateSeason({
          id: editingSeason.id,
          ...seasonData,
        })
      } else {
        await createSeason(seasonData)
      }

      onSuccess() // Call the success callback to refresh the seasons list
      resetForm()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Алдаа гарлаа")
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    form.reset()
    setError(null)
    onCancel()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {editingSeason ? "Улирал засах" : "Шинэ улирал нэмэх"}
            </h2>
            <button onClick={resetForm} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
              <X size={24} />
            </button>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">{error}</div>}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="SeasonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 block mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      Улирлын нэр
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="жишээ: 2025-2026 оны эхний улирал"
                        {...field}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 block mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-green-600" />
                      Эхлэх огноо
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 block mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-red-600" />
                      Дуусах огноо
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500 transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium text-gray-700">Идэвхтэй улирал болгох</FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  onClick={resetForm}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-red-400 text-gray-400 bg-white font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer hover:text-gray-700 hover:bg-white "
                >
                  Цуцлах
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none cursor-pointer"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Түр хүлээнэ үү...
                    </div>
                  ) : editingSeason ? (
                    "Шинэчлэх"
                  ) : (
                    "Хадгалах"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}