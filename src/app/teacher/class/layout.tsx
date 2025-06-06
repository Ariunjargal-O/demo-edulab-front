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
      <main className="flex flex-col w-screen h-screen bg-gray-200">
        {children}
      </main>
    </SidebarProvider>
  );
}
