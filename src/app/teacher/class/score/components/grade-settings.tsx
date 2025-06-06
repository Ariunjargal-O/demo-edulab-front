"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
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

interface GradeSettingsProps {
  components: GradeComponentsSettings
  onSave: (components: GradeComponentsSettings) => void
  onCancel: () => void
}

export function GradeSettings({ components, onSave, onCancel }: GradeSettingsProps) {
  const [settings, setSettings] = useState<GradeComponentsSettings>({ ...components })
  const [error, setError] = useState<string | null>(null)

  const handleWeightChange = (component: keyof GradeComponentsSettings, value: string) => {
    const numValue = Number.parseInt(value) || 0

    setSettings((prev) => ({
      ...prev,
      [component]: {
        ...prev[component],
        weight: numValue,
      },
    }))
  }

  const handleNameChange = (component: keyof GradeComponentsSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [component]: {
        ...prev[component],
        name: value,
      },
    }))
  }

  const validateSettings = () => {
    const sum = settings.attendance.weight + settings.activity.weight + settings.midterm.weight + settings.final.weight

    if (sum !== 100) {
      setError(`Үнэлгээний нийлбэр 100% байх ёстой. Одоо: ${sum}%`)
      return false
    }

    setError(null)
    return true
  }

  const handleSave = () => {
    if (validateSettings()) {
      onSave(settings)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Үнэлгээний бүрэлдэхүүн тохируулах</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="attendance-name">Ирцийн нэр:</Label>
            <Input
              id="attendance-name"
              value={settings.attendance.name}
              onChange={(e) => handleNameChange("attendance", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="attendance-weight">Ирцийн хувь (%):</Label>
            <Input
              id="attendance-weight"
              type="number"
              min="0"
              max="100"
              value={settings.attendance.weight}
              onChange={(e) => handleWeightChange("attendance", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="activity-name">Идэвхийн нэр:</Label>
            <Input
              id="activity-name"
              value={settings.activity.name}
              onChange={(e) => handleNameChange("activity", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="activity-weight">Идэвхийн хувь (%):</Label>
            <Input
              id="activity-weight"
              type="number"
              min="0"
              max="100"
              value={settings.activity.weight}
              onChange={(e) => handleWeightChange("activity", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="midterm-name">Явцын шалгалтын нэр:</Label>
            <Input
              id="midterm-name"
              value={settings.midterm.name}
              onChange={(e) => handleNameChange("midterm", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="midterm-weight">Явцын шалгалтын хувь (%):</Label>
            <Input
              id="midterm-weight"
              type="number"
              min="0"
              max="100"
              value={settings.midterm.weight}
              onChange={(e) => handleWeightChange("midterm", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="final-name">Улирлын шалгалтын нэр:</Label>
            <Input
              id="final-name"
              value={settings.final.name}
              onChange={(e) => handleNameChange("final", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Label htmlFor="final-weight">Улирлын шалгалтын хувь (%):</Label>
            <Input
              id="final-weight"
              type="number"
              min="0"
              max="100"
              value={settings.final.weight}
              onChange={(e) => handleWeightChange("final", e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>

       
        <div className="flex gap-5 mt-6 justify-end">
                    <DialogClose className="px-3 rounded-md text-sm bg-transparent border-2 border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-black cursor-pointer">
                      Цуцлах
                    </DialogClose>{" "}
                    <Button
                      type="submit"
                      className="cursor-pointer border-2 hover:bg-white hover:text-black hover:border-2 hover:border-black"
                    >
                      Хадгалах
                    </Button>
                  </div>
        
      </DialogContent>
    </Dialog>
  )
}
