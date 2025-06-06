"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ClassData } from "@/constants/type";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/constants/baseurl";

const editClassFormSchema = z.object({
  grade: z
    .number({ invalid_type_error: "Анги тоо байх ёстой" })
    .min(1, { message: "Анги эерэг тоо байх ёстой" }),
  group: z.string().min(1, { message: "Бүлэг оруулах шаардлагатай" }),
  teacherEmail: z
    .string()
    .email({ message: "Багшийн имэйл буруу байна" })
    .optional()
    .or(z.literal("")),
});

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingClass: ClassData | null;
  onSaveSuccess: () => void;
}

const EditClassDialog: React.FC<EditClassDialogProps> = ({
  open,
  onOpenChange,
  editingClass,
  onSaveSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof editClassFormSchema>>({
    resolver: zodResolver(editClassFormSchema),
    defaultValues: {
      grade: 1,
      group: "",
      teacherEmail: "",
    },
  });

  // editingClass өөрчлөгдөх үед form утгуудыг шинэчлэх
  useEffect(() => {
    if (editingClass && open) {
      form.reset({
        grade: Number(editingClass.grade),
        group: editingClass.group,
        teacherEmail: editingClass.teacherEmail || "",
      });
      setErrorMessage(null);
    }
  }, [editingClass, open, form]);

  const handleSave = async (data: z.infer<typeof editClassFormSchema>) => {
    if (!editingClass) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // Supervisor багшийн email-аар ID-г backend-с хайх
      let supervisorId: string | undefined = undefined;
      if (data.teacherEmail && data.teacherEmail.trim() !== "") {
        try {
          const res = await fetch(
            `${BASE_URL}/teachers/byEmail?email=${encodeURIComponent(data.teacherEmail)}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!res.ok) {
            setErrorMessage("Тухайн багшийн имэйл олдсонгүй.");
            return;
          }
          const teacherData = await res.json();
          supervisorId = teacherData.id;
        } catch (e) {
          setErrorMessage("Багшийн мэдээлэл авах үед алдаа гарлаа.");
          return;
        }
      }

      // Grade update хийх
      const updateData = {
        gradeNumber: Number(data.grade),
        teacherEmail: data.teacherEmail || "",
      };

      const res = await fetch(`${BASE_URL}/grades/${editingClass.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.text();
        setErrorMessage(`Хадгалах явцад алдаа гарлаа: ${res.status} - ${errorData}`);
        return;
      }

      onSaveSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Edit error:", error);
      setErrorMessage("Хадгалах явцад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Анги засах</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Анги</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1-р анги"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      min={1}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Бүлэг</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1-Бүлэг"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacherEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Багшийн Имэйл (заавал биш)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="teacher@example.com"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Болих
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Хадгалж байна..." : "Хадгалах"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClassDialog;