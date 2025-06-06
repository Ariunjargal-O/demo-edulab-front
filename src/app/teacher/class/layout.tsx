import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { AppSidebar2 } from "./components/app-sidebar-2";
import { Header } from "../(dashboard)/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <AppSidebar2 />
      <Header />
      <main className="flex flex-col from-slate-50 via-blue-50 to-indigo-100 w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
