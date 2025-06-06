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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Extended props interface to handle both exam and result dialogs
interface ExtendedExamDialogProps {
  type: string;
  title: string;
  formData: any;
  loading: boolean;
  dialogOpen: any;
  form: any;
  students?: any[];
  onExamSubmitSuccess?: () => void;
  examData?: any;
  setFormDataAction: (data: any) => void;
  setDialogOpenAction: (updater: (prev: any) => any) => void;
  handleSubmitAction: (type: string) => Promise<void>;
}

// Эхний Dialog - Шалгалтын мэдээлэл оруулах
export const ExamDialog = ({
  type,
  title,
  formData,
  setFormDataAction,
  handleSubmitAction,
  loading,
  dialogOpen,
  setDialogOpenAction,
  form,
  students = [],
  onExamSubmitSuccess,
}: ExtendedExamDialogProps) => {
  
  const handleExamSubmit = async () => {
    try {
      await handleSubmitAction(type);
      // Амжилттай болсон бол эхний dialog хааж, хоёр дахь dialog нээх
      setDialogOpenAction((prev: any) => ({ 
        ...prev, 
        [type]: false,
        [`${type}Result`]: true // Хоёр дахь dialog нээх
      }));
      
      // Callback функц дуудах (хэрэв байвал)
      onExamSubmitSuccess?.();
    } catch (error) {
      console.error("Шалгалт хадгалахад алдаа гарлаа:", error);
    }
  };

  return (
    <Dialog
      open={dialogOpen[type]}
      onOpenChange={(open) =>
        setDialogOpenAction((prev: any) => ({ ...prev, [type]: open }))
      }
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-red-500 rounded-2xl hover:bg-red-900 transition-colors text-white"
          onClick={() => setDialogOpenAction((prev: any) => ({ ...prev, [type]: true }))}
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleExamSubmit)} className="space-y-4">
            {/* Шалгалтын нэр */}
            <FormField
              control={form.control}
              name="examName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Шалгалтын нэр
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Математик - 1-р шалгалт"
                      {...field}
                      className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Шалгалтын төрөл */}
            <FormField
              control={form.control}
              name="examType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Шалгалтын төрөл
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        setFormDataAction({ ...formData, examType: value });
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                        <SelectValue placeholder="Төрөл сонгох" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="midterm">Дунд шалгалт</SelectItem>
                        <SelectItem value="final">Төгсгөлийн шалгалт</SelectItem>
                        <SelectItem value="quiz">Богино шалгалт</SelectItem>
                        <SelectItem value="assignment">Даалгавар</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Огноо */}
            <FormField
              control={form.control}
              name="examDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Шалгалтын огноо
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="flex gap-3 justify-end pt-4">
          <Button
            variant="outline"
            onClick={() =>
              setDialogOpenAction((prev: any) => ({ ...prev, [type]: false }))
            }
          >
            Цуцлах
          </Button>
          <Button
            type="submit"
            onClick={handleExamSubmit}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {loading ? "Хадгалж байна..." : "Дараагийнх руу"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Хоёр дахь Dialog - Дүн оруулах
export const ExamResultDialog = ({
  type,
  title,
  formData,
  setFormDataAction,
  handleSubmitAction,
  loading,
  dialogOpen,
  setDialogOpenAction,
  form,
  students = [],
  examData,
}: ExtendedExamDialogProps) => {
  
  const resultType = `${type}Result`;

  const handleResultSubmit = async () => {
    try {
      await handleSubmitAction(resultType);
      // Бүх process дууссан тул dialog хаах
      setDialogOpenAction((prev: any) => ({ 
        ...prev, 
        [resultType]: false 
      }));
    } catch (error) {
      console.error("Дүн хадгалахад алдаа гарлаа:", error);
    }
  };

  return (
    <Dialog
      open={dialogOpen[resultType]}
      onOpenChange={(open) =>
        setDialogOpenAction((prev: any) => ({ ...prev, [resultType]: open }))
      }
    >
      <DialogContent className="gap-6 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="pb-2 text-xl font-bold">
            {examData?.examName || title} - Дүн оруулах
          </DialogTitle>
          {examData && (
            <p className="text-sm text-gray-600">
              {examData.examType} • {examData.examDate}
            </p>
          )}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleResultSubmit)} className="space-y-4">
            {/* Сурагч сонгох */}
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Сурагч сонгох
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        // Fixed: Create new object with proper structure
                        const updatedFormData = { 
                          ...formData, 
                          studentId: value 
                        };
                        setFormDataAction(updatedFormData);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200">
                        <SelectValue placeholder="Сурагчийн нэр" />
                      </SelectTrigger>
                      <SelectContent>
                        {students?.map((student) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.lastName} {student.firstName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Дүн оруулах */}
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Дүн оруулах
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0 - 100"
                      min="0"
                      max="100"
                      {...field}
                      className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Тайлбар (сонголттой) */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Тайлбар (сонголттой)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Нэмэлт тайлбар..."
                      {...field}
                      className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="flex gap-3 justify-end pt-4">
          <Button
            variant="outline"
            onClick={() =>
              setDialogOpenAction((prev: any) => ({ ...prev, [resultType]: false }))
            }
          >
            Цуцлах
          </Button>
          <Button
            type="submit"
            onClick={handleResultSubmit}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {loading ? "Хадгалж байна..." : "Дүүргэх"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Хоёуланг нь нэгтгэсэн wrapper компонент
export const ConnectedExamDialogs = ({
  type = "exam",
  title = "Шалгалт",
  formData,
  setFormDataAction,
  handleSubmitAction,
  loading,
  dialogOpen,
  setDialogOpenAction,
  examForm,
  resultForm,
  students = [],
}: {
  type?: string;
  title?: string;
  formData: any;
  setFormDataAction: (data: any) => void;
  handleSubmitAction: (type: string) => Promise<void>;
  loading: boolean;
  dialogOpen: any;
  setDialogOpenAction: (updater: (prev: any) => any) => void;
  examForm: any;
  resultForm: any;
  students?: any[];
}) => {
  return (
    <>
      <ExamDialog
        type={type}
        title={title}
        formData={formData}
        setFormDataAction={setFormDataAction}
        handleSubmitAction={handleSubmitAction}
        loading={loading}
        dialogOpen={dialogOpen}
        setDialogOpenAction={setDialogOpenAction}
        form={examForm}
        students={students}
      />
      
      <ExamResultDialog
        type={type}
        title={title}
        formData={formData}
        setFormDataAction={setFormDataAction}
        handleSubmitAction={handleSubmitAction}
        loading={loading}
        dialogOpen={dialogOpen}
        setDialogOpenAction={setDialogOpenAction}
        form={resultForm}
        students={students}
        examData={formData}
      />
    </>
  );
};