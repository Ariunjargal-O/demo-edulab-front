"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// 📚 Сургалтын мэдээлэл шалгах validation schema
const educationSchema = z.object({
  profession: z.string().min(2, "Сургалтын нэр шаардлагатай"),
  school: z.string().min(2, "Сургалтын газрын нэр шаардлагатай"),
  duration: z
    .string()
    .min(4, "Хугацаа шаардлагатай")
    .regex(/^\d{4}\s*-\s*\d{4}$/, "Формат: 2019 - 2023"),
});

export const EduInfo = () => {
  const [submittedData, setSubmittedData] = useState<
    z.infer<typeof educationSchema>[]
  >([]);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      profession: "",
      school: "",
      duration: "",
    },
  });

  const onSubmit = (values: z.infer<typeof educationSchema>) => {
    setSubmittedData((prev) => [...prev, values]);
    setOpen(false);
    form.reset();
  };

  return (
    <Card className="w-full">
      <CardContent>
        <CardHeader className="text-2xl font-bold leading-8 mb-5 px-0">
          🎓 Сургуулиас гадуурх сургалт, дамжаа
        </CardHeader>
        <div className="grid">
          <div className="flex flex-col gap-5">
            {submittedData.length === 0 ? (
              <div className="text-gray-500">Сургалт оруулаагүй байна</div>
            ) : (
              submittedData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 justify-between gap-5"
                >
                  <div className="flex flex-col gap-3">
                    <p>Ямар сургалт</p>
                    <Textarea value={item.profession} disabled />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>Сургалтын газар</p>
                    <Textarea value={item.school} disabled />
                  </div>
                  <div className="col-span-2 flex flex-col gap-3">
                    <p>Суралцсан хугацаа</p>
                    <Textarea value={item.duration} disabled />
                  </div>
                </div>
              ))
            )}

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
              <Button className="mt-6 cursor-pointer border-2 hover:bg-white hover:text-black hover:border-2 hover:border-black">
                  ➕ Шинэ сургалт нэмэх
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>📋 Сургалт нэмэх</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                  >
                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ямар сургалт</FormLabel>
                          <FormControl>
                            <Input placeholder="Жишээ: UI/UX дизайн" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="school"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Сургалтын газар</FormLabel>
                          <FormControl>
                            <Input placeholder="Жишээ: Nest Academy" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Суралцсан хугацаа</FormLabel>
                          <FormControl>
                            <Input placeholder="Жишээ: 2022 - 2023" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-5 mt-6 justify-end">
                      <DialogClose className="px-3 rounded-md text-sm bg-transparent border-2 border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-black cursor-pointer">
                        Цуцлах
                      </DialogClose>
                      <Button
                        type="submit"
                        className="cursor-pointer border-2 hover:bg-white hover:text-black hover:border-black"
                      >
                        Хадгалах
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
