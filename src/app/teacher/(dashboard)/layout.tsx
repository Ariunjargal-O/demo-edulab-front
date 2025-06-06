// layout.tsx эсвэл App.tsx зэрэг үндсэн файлдаа

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Header } from "./components/Header";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Header />
      <main className="flex flex-col from-slate-50 via-blue-50 to-indigo-100 w-full">
        {children}
      </main>
     
    </SidebarProvider>
  );
}
