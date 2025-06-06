"use client";

import React, { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants/baseurl";
import { Teacher } from "@/constants/type";

interface EditTeacherDialogProps {
  teacher: Teacher;
  onCloseAction: () => void;
  onSavedAction: () => void;
}

export default function EditTeacherDialog({ teacher, onCloseAction, onSavedAction }: EditTeacherDialogProps) {
  const [firstName, setFirstName] = useState(teacher.firstName);
  const [lastName, setLastName] = useState(teacher.lastName);
  const [phoneNumber, setPhoneNumber] = useState(teacher.phoneNumber1);
  const [email, setEmail] = useState(teacher.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 const [schoolAdminId, setSchoolAdminId] = useState<string | null>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);

  // LocalStorage-с мэдээлэл авах
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSchoolAdminId(localStorage.getItem("schoolAdminId"));
      setSchoolId(localStorage.getItem("schoolId"));
    }
  }, []);
  async function handleSave() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token олдсонгүй.");

      const response = await fetch(`${BASE_URL}/teachers/${schoolId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, phoneNumber, email }),
      });

      if (!response.ok) throw new Error("Засах үед алдаа гарлаа.");

      onSavedAction();
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
          <DialogTitle>Багш засах</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Овог"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Нэр"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Утас"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value === "" ? undefined : Number(e.target.value))}
            disabled={loading}
          />
          <Input
            placeholder="Имэйл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          {error && <p className="text-red-600">{error}</p>}
        </div>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCloseAction} disabled={loading}>Цуцлах</Button>
          <Button onClick={handleSave} disabled={loading}>Хадгалах</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
