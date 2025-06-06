"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: "Математикийн олимпиадад бэлтгэх нэмэлт цаг",
    time: "14:00 - 16:00",
    description:
      "Математикийн олимпиадад оролцох сурагчдын нэмэлт бэлтгэл хичээл болно. Бүх сонирхсон сурагчдыг хүрэлцэн ирэхийг урьж байна.",
  },
  {
    id: 2,
    title: "Уран зохиолын дугуйлангийн уулзалт",
    time: "16:30 - 17:30",
    description:
      "Уран зохиолын дугуйлангийн ээлжит уулзалт болох бөгөөд бид энэ долоо хоногт 'Дэлхийн сонгодог зохиол' сэдвээр хэлэлцүүлэг өрнүүлнэ.",
  },
  {
    id: 3,
    title: "Англи хэлний ярианы клуб",
    time: "17:00 - 18:00",
    description:
      "Англи хэлний ярианы клубт хүрэлцэн ирж, чөлөөтэй ярилцаж, харилцааны чадвараа сайжруулаарай.",
  },
  {
    id: 4,
    title: "Биеийн тамирын секц - Сагсан бөмбөг",
    time: "15:30 - 17:00",
    description:
      "Сагсан бөмбөгийн секцийн бэлтгэл хичээл болно. Бүх сурагчдыг идэвхтэй оролцохыг уриалж байна.",
  },
  {
    id: 5,
    title: "Роботикийн ангийн нээлттэй хичээл",
    time: "10:00 - 12:00",
    description:
      "Роботикийн ангийн нээлттэй хичээлд хүрэлцэн ирж, робот угсрах болон програмчлахын талаар сонирхолтой мэдээлэл аваарай.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  // useEffect(() => {
  // const data = await fetch("/api/v1/events");
  // }
  // const data = await prisma.event.findMany({
  //   where: {
  //     startTime: {
  //       gte: new Date(date.setHours(0, 0, 0, 0)),
  //       lte: new Date(date.setHours(23, 59, 59, 999)),
  //     },
  //   },
  // });

  return (
    <div className="flex gap-10 flex-col">
      {/* <Card>
        <CardContent>
        <Calendar onChange={onChange} value={value}  className="w-full"/>
        </CardContent>
      </Card> */}

      <Card className="pt-0">
      <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-t-xl">
            <CardTitle className="text-xl font-bold leading-8 text-slate-800 p-6">
              Ангийн үйл ажилгаа
            </CardTitle>
          </CardHeader>
        <CardContent className="">
         
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <div
                className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
                key={event.id}
              >
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-black">{event.title}</h1>
                  <span className="text-gray-500 text-normal">
                    {event.time}
                  </span>
                </div>
                <p className="mt-2 text-gray-500 text-sm">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;
