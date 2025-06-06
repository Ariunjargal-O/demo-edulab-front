"use client";
import React from "react";
import { useRouter } from "next/navigation";
// Таны UI-н Button-г эндээс авчирна уу, жишээ:
import { Button } from "@/components/ui/button";

export const Header = () => {
  const router = useRouter();

  const logOut = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-end p-4 bg-blue-100 shadow-md">
      <Button
        className="bg-blue-400 hover:bg-blue-700 cursor-pointer"
        onClick={logOut}
      >
        Log Out
      </Button>
    </div>
  );
};
