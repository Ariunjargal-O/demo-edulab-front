"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ExamDialogProps } from "@/constants/type";


export const ExamDialog = ({
  type,
  title,
  formData,
  setFormData,
  handleInputChange,
  handleSubmit,
  loading,
  dialogOpen,
  setDialogOpen,
}: ExamDialogProps) => {
  return (
    <Dialog
      open={dialogOpen[type]}
      onOpenChange={(open) =>
        setDialogOpen((prev) => ({ ...prev, [type]: open }))
      }
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-red-500 rounded-2xl hover:bg-red-900 transition-colors text-white"
          onClick={() =>
            setDialogOpen((prev) => ({ ...prev, [type]: true }))
          }
        >
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-6 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="pb-2 text-xl font-bold">
            Шинэ {title} үүсгэх
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-base">Шалгалтын сэдэв *</label>
            <Input
              value={formData.subject}
              onChange={(e) =>
                handleInputChange("subject", e.target.value)
              }
              placeholder="Шалгалтын сэдэв"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-base">
              Үргэлжлэх хугацаа (минут)
            </label>
            <Input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                handleInputChange("duration", e.target.value)
              }
              placeholder="90"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-base">
              Шалгалтын агуулга *
            </label>
            <Input
              value={formData.content}
              onChange={(e) =>
                handleInputChange("content", e.target.value)
              }
              placeholder="Агуулга"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-base">Нийт оноо</label>
            <Input
              type="number"
              value={formData.totalMarks}
              onChange={(e) =>
                handleInputChange("totalMarks", e.target.value)
              }
              placeholder="100"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button
            variant="outline"
            onClick={() =>
              setDialogOpen((prev) => ({ ...prev, [type]: false }))
            }
          >
            Цуцлах
          </Button>
          <Button
            onClick={() => handleSubmit(type)}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {loading ? "Үүсгэж байна..." : "Шалгалт үүсгэх"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
