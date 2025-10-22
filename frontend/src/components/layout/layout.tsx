"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { Navigation } from "./navigation";
import { Sidebar } from "./sidebar";

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isCollapsed, toggleSidebar, setIsCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation
        onSidebarToggle={toggleSidebar}
        sidebarCollapsed={isCollapsed}
      />
      <Sidebar isCollapsed={isCollapsed} onCollapsedChange={setIsCollapsed} />

      {/* Main Content with left margin for sidebar */}
      <div
        className={`pt-16 transition-all duration-300 min-h-screen ${
          isCollapsed ? "ml-12" : "ml-64"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
          {children}
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
