"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddTeacherButton() {
    return (
        <DialogTrigger asChild>
            <Button variant="outline" className="px-8 py-3 bg-black text-white rounded-2xl flex justify-self-end my-5 cursor-pointer border-2 hover:bg-white hover:text-black hover:border-2 hover:border-black"><Plus/> Багш нэмэх</Button>
        </DialogTrigger>
    );
}