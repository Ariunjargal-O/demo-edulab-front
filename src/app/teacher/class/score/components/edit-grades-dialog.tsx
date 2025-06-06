"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface GradeComponent {
  name: string
  weight: number
}

interface GradeComponentsSettings {
  attendance: GradeComponent
  activity: GradeComponent
  midterm: GradeComponent
  final: GradeComponent
  total: GradeComponent
}

interface SemesterGrades {
  attendance: number
  activity: number
  midterm: number
  final: number
}

interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  grades: Record<string, SemesterGrades>
}

interface EditGradesDialogProps {
  student: Student
  semester: string
  gradeComponents: GradeComponentsSettings
  onSave: (updatedGrades: SemesterGrades) => void
  onCancel: () => void
}

export function EditGradesDialog({ student, semester, gradeComponents, onSave, onCancel }: EditGradesDialogProps) {
  const [grades, setGrades] = useState<SemesterGrades>(
    student.grades[semester] || {
      attendance: 0,
      activity: 0,
      midterm: 0,
      final: 0,
    },
  )

  const handleGradeChange = (field: keyof SemesterGrades, value: string) => {
    const numValue = Number.parseInt(value) || 0
    const maxValue = gradeComponents[field].weight

    // Ensure the value doesn't exceed the maximum
    const validValue = Math.min(numValue, maxValue)

    setGrades((prev) => ({
      ...prev,
      [field]: validValue,
    }))
  }

  const calculateTotal = () => {
    return grades.attendance + grades.activity + grades.midterm + grades.final
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {student.lastName} {student.firstName} - {semester}-р улирлын дүн засах
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="attendance">
              {gradeComponents.attendance.name} (0-{gradeComponents.attendance.weight}):
            </Label>
            <Input
              id="attendance"
              type="number"
              min="0"
              max={gradeComponents.attendance.weight}
              value={grades.attendance}
              onChange={(e) => handleGradeChange("attendance", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="activity">
              {gradeComponents.activity.name} (0-{gradeComponents.activity.weight}):
            </Label>
            <Input
              id="activity"
              type="number"
              min="0"
              max={gradeComponents.activity.weight}
              value={grades.activity}
              onChange={(e) => handleGradeChange("activity", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="midterm">
              {gradeComponents.midterm.name} (0-{gradeComponents.midterm.weight}):
            </Label>
            <Input
              id="midterm"
              type="number"
              min="0"
              max={gradeComponents.midterm.weight}
              value={grades.midterm}
              onChange={(e) => handleGradeChange("midterm", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="final">
              {gradeComponents.final.name} (0-{gradeComponents.final.weight}):
            </Label>
            <Input
              id="final"
              type="number"
              min="0"
              max={gradeComponents.final.weight}
              value={grades.final}
              onChange={(e) => handleGradeChange("final", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label>Нийт дүн:</Label>
            <div className="font-medium">
              {calculateTotal()}/{gradeComponents.total.weight}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Цуцлах
          </Button>
          <Button onClick={() => onSave(grades)}>Хадгалах</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
