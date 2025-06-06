"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BASE_URL } from "@/constants/baseurl";
import type { SchoolInfo } from "@/constants/type";

interface EditSchoolDialogProps {
  school: SchoolInfo | null;
  open: boolean;
  onCloseAction: () => void;
  onSaveAction: (updatedSchool: SchoolInfo) => void;
}

export function EditSchoolDialog({
  school,
  open,
  onCloseAction,
  onSaveAction,
}: EditSchoolDialogProps) {
  const [formData, setFormData] = useState<SchoolInfo | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (school) {
      setFormData(school);
    }
  }, [school]);

  // ✅ Token авах (ЖИШЭЭ: localStorage ашиглах)
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  if (!formData) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  }

  function handleAdminEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    setFormData((prev) => {
      if (!prev) return null;
      const updatedAdmins =
        prev.admins && prev.admins.length > 0
          ? [{ ...prev.admins[0], email }]
          : [{ id: "", firstName: "", lastName: "", email }];
      return { ...prev, admins: updatedAdmins };
    });
  }

  async function handleSave(updatedSchool: SchoolInfo) {
    setIsSaving(true);

    const currentToken = getToken();

    // ✅ Зөвхөн update-д шаардлагатай талбаруудыг JSON-д оруулна
    const updatePayload = {
      name: updatedSchool.name,
      address: updatedSchool.address,
      city: updatedSchool.city,
      phoneNumber: updatedSchool.phoneNumber,
      website: updatedSchool.website,
      adminEmail:
        updatedSchool.admins && updatedSchool.admins.length > 0
          ? updatedSchool.admins[0].email
          : "",
    };

    try {
      const response = await fetch(`${BASE_URL}/school/${updatedSchool.id}`, {
        method: "PUT",
        headers: currentToken
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentToken}`,
            }
          : {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(updatePayload),
      });

      if (response.status === 401) {
        toast.error("Нэвтрэх хугацаа дууссан байна. Дахин нэвтэрнэ үү.");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Шинэчлэхэд алдаа гарлаа");
      }

      const data = await response.json();
      toast.success("Сургуулийн мэдээлэл амжилттай шинэчлэгдлээ");
      onSaveAction({ ...updatedSchool, ...data }); // merge local and updated data
      onCloseAction();
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "Алдаа гарлаа.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData) return;

    const adminEmail =
      formData.admins && formData.admins.length > 0
        ? formData.admins[0].email
        : "";

    // Validation
    if (!formData.name?.trim()) return toast.error("Сургуулийн нэр оруулна уу.");
    if (!formData.address?.trim()) return toast.error("Хаяг оруулна уу.");
    if (!formData.city?.trim()) return toast.error("Хот оруулна уу.");
    if (!formData.phoneNumber?.trim()) return toast.error("Утасны дугаар оруулна уу.");
    if (!adminEmail?.trim()) return toast.error("Админы имэйл оруулна уу.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail))
      return toast.error("Зөв имэйл хаяг оруулна уу.");

    handleSave(formData);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onCloseAction();
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Сургуулийн мэдээлэл засах</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Сургуулийн нэр <span className="text-red-500">*</span></Label>
            <Input name="name" value={formData.name || ""} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="address">Хаяг <span className="text-red-500">*</span></Label>
            <Input name="address" value={formData.address || ""} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="city">Хот <span className="text-red-500">*</span></Label>
            <Input name="city" value={formData.city || ""} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Утас <span className="text-red-500">*</span></Label>
            <Input name="phoneNumber" value={formData.phoneNumber || ""} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="website">Вебсайт</Label>
            <Input name="website" value={formData.website || ""} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="adminEmail">Админы имэйл <span className="text-red-500">*</span></Label>
            <Input
              id="adminEmail"
              name="adminEmail"
              type="email"
              value={formData.admins?.[0]?.email || ""}
              onChange={handleAdminEmailChange}
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <DialogClose asChild>
              <Button type="button" variant="ghost" onClick={onCloseAction} disabled={isSaving}>
                Цуцлах
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Хадгалж байна..." : "Хадгалах"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
