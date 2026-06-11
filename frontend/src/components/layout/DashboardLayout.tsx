import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({
  children,
  title,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="border-b border-slate-800 px-8 py-5">
          <h1 className="text-3xl font-bold text-white">
            {title || "Dashboard"}
          </h1>
        </div>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;