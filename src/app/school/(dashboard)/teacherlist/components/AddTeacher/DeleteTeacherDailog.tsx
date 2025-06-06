"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants/baseurl";
import { Teacher } from "@/constants/type";
import { useAuthStore } from "@/stores/auth-store";

interface DeleteTeacherDialogProps {
  teacher: Teacher;
  onCloseAction: () => void;
  onDeletedAction: () => void;
}

export default function DeleteTeacherDialog({ teacher, onCloseAction, onDeletedAction }: DeleteTeacherDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { schoolAdminId, adminId } = useAuthStore();

  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token олдсонгүй.");

      // Fixed: Using schoolAdminId from auth store and matching the backend route
      const schoolId = schoolAdminId || adminId;
      if (!schoolId) throw new Error("School ID олдсонгүй.");

      const response = await fetch(`${BASE_URL}/teachers/${schoolId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // Send teacher ID in request body since the route doesn't include it in URL
        body: JSON.stringify({ teacherId: teacher.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Устгах үед алдаа гарлаа.");
      }

      onDeletedAction();
      onCloseAction();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={true} onOpenChange={onCloseAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Багш устгах</DialogTitle>
        </DialogHeader>
        <p>Та {teacher.firstName} {teacher.lastName} багшийг устгахдаа итгэлтэй байна уу?</p>
        {error && <p className="text-red-600">{error}</p>}
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCloseAction} disabled={loading}>
            Цуцлах
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Устгаж байна..." : "Устгах"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}