"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell, Menu, MessageCircle } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import axios from "axios";
import { BASE_URL } from "@/constants/baseurl";

export interface TeacherAttendanceType {
  id: string;
  teacherName: string;
  email: string;
  date: string;
  arrivalTime: string;
  leftTime: string;
  workingTime: string;
}

// const FormSchema = z.object({
//   teacher_attendance: z.boolean(),
// });

export const Header = () => {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(true);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) {
      setFeedback("Гарчиг болон агуулга хоёуланг нь бөглөнө үү.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      await axios.post(`${BASE_URL}/notifications`, { title, message });
      setFeedback("Мэдэгдэл амжилттай илгээгдлээ!");
      setTitle("");
      setMessage("");
    } catch (error: any) {
      console.error("Notification send error:", error);
      setFeedback(
        error.response?.data?.error ||
        error.message ||
        JSON.stringify(error) ||
        "Амжилтгүй боллоо."
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("teacher_token");
    setHasToken(!!token);
  }, []);

  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     teacher_attendance: false,
  //   },
  // });

  // const currentTeacherId = "1";

  // const handleAttendanceChange = (checked: boolean) => {
  //   form.setValue("teacher_attendance", checked, {
  //     shouldDirty: true,
  //     shouldValidate: true,
  //   });

  //   if (checked) {
  //     handleCheckIn(currentTeacherId);
  //     toast("Ирц амжилттай бүртгэгдлээ... Ирсэн");
  //   } else {
  //     handleCheckOut(currentTeacherId);
  //     toast("Ирц амжилттай бүртгэгдлээ... Явсан");
  //   }

  //   console.log("Ирцийн статус:", checked);
  // };

  // const getCurrentTime = () =>
  //   new Date().toLocaleTimeString("en-US", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   });

  // const getCurrentDate = () => new Date().toISOString().split("T")[0];
  // const [data, setData] = useState<TeacherAttendanceType[]>([
  //   {
  //     id: "1",
  //     teacherName: "John Smith",
  //     email: "john@example.com",
  //     date: "",
  //     arrivalTime: "",
  //     leftTime: "",
  //     workingTime: "",
  //   },
  //   {
  //     id: "2",
  //     teacherName: "Sara Lee",
  //     email: "sara@example.com",
  //     date: "",
  //     arrivalTime: "",
  //     leftTime: "",
  //     workingTime: "",
  //   },
  // ]);

  // const handleCheckIn = (id: string) => {
  //   const updatedData = data.map((teacher) =>
  //     teacher.id === id
  //       ? {
  //         ...teacher,
  //         arrivalTime: getCurrentTime(),
  //         date: getCurrentDate(),
  //       }
  //       : teacher
  //   );
  //   setData(updatedData);
  // };

  // const handleCheckOut = (id: string) => {
  //   const updatedData = data.map((teacher) => {
  //     if (teacher.id === id) {
  //       const arrival = new Date(`${teacher.date}T${teacher.arrivalTime}`);
  //       const now = new Date();
  //       const workingHours = (
  //         (now.getTime() - arrival.getTime()) /
  //         (1000 * 60 * 60)
  //       ).toFixed(2);

  //       return {
  //         ...teacher,
  //         leftTime: getCurrentTime(),
  //         workingTime: `${workingHours} hours`,
  //       };
  //     }
  //     return teacher;
  //   });

  //   setData(updatedData);
  // };

  // Extend base columns to add buttons

  const router = useRouter();
  const logOut = () => {
    localStorage.clear(); // бүх localStorage-ийг устгана
    router.push("/login");
  };
  return (
    <div className="fixed bg-blue-100 w-full h-20 py-5 px-10 z-30">
      <div className="flex items-center justify-end">
        {/* <SidebarTrigger  className="flex justify-self-center"/> */}
        <div className="flex gap-6 items-center">
          {/* {hasToken && pathname === "/teacher" && (
            <Form {...form}>
              <form className="w-[400px] max-w-xl space-y-6 ">
                <FormField
                  control={form.control}
                  name="teacher_attendance"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4 shadow-sm h-[50px] bg-white">
                      <div className="space-y-0.5">
                        <FormLabel>Ирц бүртгүүлэх</FormLabel>
                        <FormDescription>
                          Өнөөдрийн ирцийн мэдээлэл бүртгэх.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={handleAttendanceChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )} */}

          <Link href={"/teacher/chat"}>
            <button className="px-5 py-3 cursor-pointer hover:bg-white rounded-3xl bg-transparent border-0">
              <MessageCircle className=" hover:text-black" />
            </button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="px-5 py-3 cursor-pointer hover:bg-gradient-to-tr from-purple-200 via-pink-200 to-blue-200 rounded-3xl transition-all duration-300">
              <Bell className="hover:text-black w-6 h-6" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-5 w-96 rounded-2xl shadow-xl border bg-gradient-to-br from-white via-slate-50 to-slate-100">
              <DropdownMenuLabel className="mb-2 text-lg font-bold text-purple-700 tracking-wide">
                ✉️ Шинэ мэдэгдэл илгээх
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 h-0.5 rounded-full mb-3" />

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="📝 Гарчиг"
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />

                <textarea
                  placeholder="📨 Мэдэгдлийн агуулга"
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm resize-none shadow-sm focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all"
                  rows={3}
                  value={message}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Илгээж байна..." : "🚀 Илгээх"}
                </button>

                {feedback && (
                  <p
                    className={`text-xs font-medium mt-1 ${feedback.includes("амжилттай") ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {feedback}
                  </p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>


          <div className="flex gap-3 bg-white rounded-full w-fit px-3 py-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/teacher">
                  <DropdownMenuItem>Home</DropdownMenuItem>
                </Link>
                <Link href="/teacher/accountsettings">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={"/teacher/password"}>
                  {" "}
                  <DropdownMenuItem>Password change</DropdownMenuItem>
                </Link>

                <DropdownMenuItem
                  className="text-red-500 font-semibold"
                  onClick={logOut}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Багшийн туслах</SheetTitle>
                  <div className="flex flex-col gap-2">
                    <Button>Цаг хэмжигч</Button>
                    <Button>Багт хуваах</Button>
                    <Button>Тооны машин</Button>
                    <Button>Тэмдэглэл</Button>
                    <Button>Оюуны зураглал</Button>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};
