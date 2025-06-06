"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import React from "react";
import Calendar from "react-calendar";
import { Button } from "@/components/ui/button";
import { Exam } from "@/constants/type";


interface ExamCardProps {
  exam: Exam;
  type: "midterm" | "seasonal";
  deleteExam: (id: number | string, type: "midterm" | "seasonal") => void;
}

export const ExamCard = ({ exam, type, deleteExam }: ExamCardProps) => (
  <Card className="w-full border border-gray-200 hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-gray-800">{exam.subject}</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-50"
            onClick={() => deleteExam(exam.id, type)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-2">{exam.content}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{new Date(exam.createdAt).toLocaleDateString("mn-MN")}</span>
        </div>
        {exam.duration && (
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{exam.duration} мин</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
