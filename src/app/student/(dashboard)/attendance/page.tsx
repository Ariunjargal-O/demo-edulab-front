"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "./components/DataTable";
import { columns, User } from "./components/Column";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<User[]>([
    {
      id: 1,
      date: new Date("2025.05.11"),
      reason: "uvchtei",
    },
    {
      id: 2,
      date: new Date("2025.05.11"),
      reason: "zavgui",
    },
  ]);

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Хамгийн багадаа 5 тэмдэгт байх ёстой",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newEntry: User = {
      id: data.length + 1,
      date: new Date(),
      reason: values.username,
    };
    setData([...data, newEntry]);
    setOpen(false);
    form.reset();
  }

  return (
    <div className="pt-30 px-10 pb-10 bg-gray-200">
      <div className="bg-white flex justify-between p-5 rounded-2xl">
        <div>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Хичээл сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Монгол хэл">Монгол хэл</SelectItem>
              <SelectItem value="Уран зохиол">Уран зохиол</SelectItem>
              <SelectItem value="Математик">Математик</SelectItem>
              <SelectItem value="Физик">Физик</SelectItem>
              <SelectItem value="Хими">Хими</SelectItem>
              <SelectItem value="Биологи">Биологи</SelectItem>
              <SelectItem value="Газар зүй">Газар зүй</SelectItem>
              <SelectItem value="Нийгмийн ухаан">Нийгмийн ухаан</SelectItem>
              <SelectItem value="Англи хэл">Англи хэл</SelectItem>
              <SelectItem value="Биеийн тамир">Биеийн тамир</SelectItem>
              <SelectItem value="Мэдээлэл зүй">Мэдээлэл зүй</SelectItem>
              <SelectItem value="Технологи ">Технологи </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)}>Чөлөө хүсэх</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Та чөлөө хүсэж буй шалтгаанаа бичнэ үү?
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Шалтгаан" {...field} />
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
                      className="cursor-pointer border-2 hover:bg-white hover:text-black hover:border-2 hover:border-black"
                    >
                      Хүсэлт илгээх
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-7">
        <Card>
          <CardContent>
            <div className="flex justify-between">
              <CardHeader className="font-bold text-2xl flex justify-between items-center">
                Ирц
              </CardHeader>
              <div></div>
            </div>
            <div className="p-4">
              <DataTable columns={columns} data={data} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
