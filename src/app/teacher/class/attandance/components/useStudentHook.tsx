"use client";
import { useState, useEffect } from "react";
import { studentsApi } from "./StudentApi";

interface Student {
  _id: string;
  name: string;
  age: number;
  // Extend with other fields as needed
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentsApi.getAll();
      setStudents(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (studentData: Partial<Student>): Promise<Student> => {
    try {
      const newStudent = await studentsApi.create(studentData);
      setStudents((prev) => [...prev, newStudent]);
      return newStudent;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateStudent = async (id: string, studentData: Partial<Student>): Promise<Student> => {
    try {
      const updatedStudent = await studentsApi.update(id, studentData);
      setStudents((prev) =>
        prev.map((student) => (student._id === id ? updatedStudent : student))
      );
      return updatedStudent;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await studentsApi.delete(id);
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    error,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
};
