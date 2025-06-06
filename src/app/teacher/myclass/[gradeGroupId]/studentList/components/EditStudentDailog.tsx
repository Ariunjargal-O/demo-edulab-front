"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Phone, Mail, UserPlus, Trash2 } from "lucide-react";
import { User as StudentUser } from "../page";

interface Parent {
  firstName: string;
  lastName: string;
  phoneNumber1: string;
  phoneNumber2?: string;
  email?: string;
}

interface EditStudentDialogProps {
  student: StudentUser;
  onSubmitAction: (studentData: any) => Promise<{ success: boolean; error?: string }>;
  onCloseAction: () => void;
  gradeGroupId: string;
}

export default function EditStudentDialog({
  student,
  onSubmitAction,
  onCloseAction,
  gradeGroupId,
}: EditStudentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Student form data
  const [firstName, setFirstName] = useState(student.firstname);
  const [lastName, setLastName] = useState(student.lastname);
  const [email, setEmail] = useState(student.email);
  const [phoneNumber, setPhoneNumber] = useState(student.contact?.toString() || "");
  
  // Parents data
  const [parents, setParents] = useState<Parent[]>([
    {
      firstName: "",
      lastName: "",
      phoneNumber1: student.emergency?.toString() || "",
      phoneNumber2: "",
      email: "",
    },
  ]);

  const handleAddParent = () => {
    if (parents.length < 3) {
      setParents([
        ...parents,
        {
          firstName: "",
          lastName: "",
          phoneNumber1: "",
          phoneNumber2: "",
          email: "",
        },
      ]);
    }
  };

  const handleRemoveParent = (index: number) => {
    if (parents.length > 1) {
      setParents(parents.filter((_, i) => i !== index));
    }
  };

  const handleParentChange = (index: number, field: keyof Parent, value: string) => {
    const updatedParents = [...parents];
    updatedParents[index] = { ...updatedParents[index], [field]: value };
    setParents(updatedParents);
  };

  const validateForm = () => {
    if (!firstName.trim()) return "Сурагчийн нэрийг оруулна уу";
    if (!lastName.trim()) return "Сурагчийн овгийг оруулна уу";
    if (!email.trim()) return "И-мэйл хаягийг оруулна уу";
    if (!phoneNumber.trim()) return "Утасны дугаарыг оруулна уу";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "И-мэйл хаягийн формат буруу байна";

    // Phone validation (assuming Mongolian format)
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) return "Утасны дугаар 8 оронтой байх ёстой";

    // Validate at least first parent's phone
    if (!parents[0].phoneNumber1.trim()) {
      return "Эцэг эхийн утасны дугаарыг оруулна уу";
    }
    if (!phoneRegex.test(parents[0].phoneNumber1)) {
      return "Эцэг эхийн утасны дугаар 8 оронтой байх ёстой";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const studentData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        parents: parents.filter(parent => 
          parent.firstName.trim() || parent.lastName.trim() || parent.phoneNumber1.trim()
        ),
      };

      const result = await onSubmitAction(studentData);
      
      if (result.success) {
        onCloseAction();
      } else {
        setError(result.error || "Сурагчийн мэдээлэл засахад алдаа гарлаа");
      }
    } catch (error) {
      setError("Сурагчийн мэдээлэл засахад алдаа гарлаа");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => onCloseAction()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50/30 border border-white/60 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            Сурагчийн мэдээлэл засах
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-base">
            {student.firstname} {student.lastname}-ын мэдээллийг шинэчлэх
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Сурагчийн мэдээлэл
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                    Нэр *
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Сурагчийн нэр"
                    className="bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                    Овог *
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Сурагчийн овог"
                    className="bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    И-мэйл хаяг *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="pl-10 bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium text-slate-700">
                    Утасны дугаар *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="88888888"
                      className="pl-10 bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parents Information */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-green-600" />
                  Эцэг эхийн мэдээлэл
                </CardTitle>
                {parents.length < 3 && (
                  <Button
                    type="button"
                    onClick={handleAddParent}
                    variant="outline"
                    size="sm"
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Эцэг эх нэмэх
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {parents.map((parent, index) => (
                <div key={index} className="p-4 bg-white/80 rounded-lg border border-white/60 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-slate-700">
                      Эцэг эх #{index + 1} {index === 0 && "*"}
                    </h4>
                    {parents.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveParent(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Нэр
                      </Label>
                      <Input
                        value={parent.firstName}
                        onChange={(e) => handleParentChange(index, "firstName", e.target.value)}
                        placeholder="Эцэг эхийн нэр"
                        className="bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Овог
                      </Label>
                      <Input
                        value={parent.lastName}
                        onChange={(e) => handleParentChange(index, "lastName", e.target.value)}
                        placeholder="Эцэг эхийн овог"
                        className="bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Утасны дугаар {index === 0 && "*"}
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          value={parent.phoneNumber1}
                          onChange={(e) => handleParentChange(index, "phoneNumber1", e.target.value)}
                          placeholder="88888888"
                          className="pl-10 bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Нэмэлт утас
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <Input
                          value={parent.phoneNumber2 || ""}
                          onChange={(e) => handleParentChange(index, "phoneNumber2", e.target.value)}
                          placeholder="99999999"
                          className="pl-10 bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      И-мэйл хаяг
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        type="email"
                        value={parent.email || ""}
                        onChange={(e) => handleParentChange(index, "email", e.target.value)}
                        placeholder="parent@email.com"
                        className="pl-10 bg-white/80 border-white/60 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <DialogFooter className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCloseAction}
              disabled={isSubmitting}
              className="bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Цуцлах
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Хадгалж байна...
                </>
              ) : (
                "Хадгалах"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}