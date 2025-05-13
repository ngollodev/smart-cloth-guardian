import { AppSidebar } from "app/components/layout/app-sidebar";
import { ProfileDropdown } from "app/components/layout/profile-dropdown";
import { ModeToggle } from "app/components/mode-toggle";
import { SidebarProvider, SidebarTrigger } from "app/components/ui/sidebar";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container py-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Smart Cloth Guardian</h1>
              <div className="flex items-center gap-3">
                <ModeToggle />
                <ProfileDropdown />
                <SidebarTrigger />
              </div>
            </div>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
