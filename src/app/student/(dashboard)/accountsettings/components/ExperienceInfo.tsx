"use client";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
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
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Шагналын схем
export const awardSchema = z.object({
  awards: z.array(
    z.object({
      awardName: z.string().min(2, "Шагналын нэр шаардлагатай"),
      organization: z.string().min(2, "Олгосон байгууллагын нэр шаардлагатай"),
    })
  ),
});

export const ExperienceInfo = () => {
  const [submittedData, setSubmittedData] = useState<z.infer<
    typeof awardSchema
  > | null>(null);

  const form = useForm<z.infer<typeof awardSchema>>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      awards: [
        {
          awardName: "",
          organization: "",
        },
      ],
    },
  });

  const { fields: awardFields, append: addAward } = useFieldArray({
    control: form.control,
    name: "awards",
  });

  const onSubmit = (values: z.infer<typeof awardSchema>) => {
    setSubmittedData(values);
    console.log("Submitted data:", values);
  };

  return (
    <Card>
      <CardContent>
        <CardHeader className="text-2xl font-bold leading-8 mb-5 px-0">
          🏅 Сурагчийн авсан шагнал болон гавьяа
        </CardHeader>
        <div className="grid ">
          <div className="flex flex-col gap-5">
            {/* ✅ Шагнал байхгүй үед харуулах хэсэг */}
            {!submittedData || submittedData.awards.length === 0 ? (
              <div className="text-gray-500">Шагнал оруулаагүй байна</div>
            ) : (
              submittedData.awards.map((award, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 justify-between gap-5"
                >
                  <div className="flex flex-col gap-3">
                    <p>Шагналын нэр</p>
                    <Textarea value={award.awardName} disabled />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>Олгосон байгууллага</p>
                    <Textarea value={award.organization} disabled />
                  </div>
                </div>
              ))
            )}

            {/* 🎯 Шагнал нэмэх dialog хэсэг (өөрчлөлтгүйгээр ашиглаж болно) */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-6 cursor-pointer border-2 hover:bg-white hover:text-black hover:border-2 hover:border-black">
                  ➕ Шинэ шагнал нэмэх
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>🏆 Шагналын мэдээлэл нэмэх / засах</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                  >
                    {awardFields.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name={`awards.${index}.awardName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Шагналын нэр</FormLabel>
                              <FormControl>
                                <Input placeholder="Шагналын нэр" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`awards.${index}.organization`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Олгосон байгууллага</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Байгууллагын нэр"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() =>
                        addAward({ awardName: "", organization: "" })
                      }
                    >
                      Шагнал нэмэх
                    </Button>
                    <div className="flex gap-5 mt-6 justify-end">
                      <DialogClose className="px-3 rounded-md text-sm bg-transparent border-2 border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-black cursor-pointer">
                        Цуцлах
                      </DialogClose>
                      <Button
                        type="submit"
                        className="cursor-pointer border-2 hover:bg-white hover:text-black hover:border-2 hover:border-black"
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
