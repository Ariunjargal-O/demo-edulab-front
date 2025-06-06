"use client"
import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { MyClassAppSidebar } from "./components/app-sidebar"
import { Header } from "../../(dashboard)/components/Header"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MyClassAppSidebar/>
      <Header/>
      <main className="flex flex-col w-screen bg-gray-200" >
        {children }
      </main>
    </SidebarProvider>
  )
}
