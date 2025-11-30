"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    Store
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {DashboardSidebar} from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Genel Bakış", href: "/dashboard", icon: LayoutDashboard },
    ];

    return (
        <SidebarProvider className="bg-slate-950 font-sans text-slate-200 selection:bg-amber-500 selection:text-slate-900">
            <DashboardSidebar menuItems={menuItems} pathname={pathname} />

            {/* Main Content Wrapper */}
            <div className="flex flex-col flex-1 h-dvh overflow-hidden bg-slate-950 min-w-0">
                {/* Header with Trigger */}
                <header className="h-16 flex items-center gap-2 px-4 border-b border-slate-800 bg-slate-900 shrink-0 sticky top-0 z-10">
                    <SidebarTrigger className="text-slate-400 hover:text-white hover:bg-slate-800" />
                    <div className="h-6 w-px bg-slate-800 mx-2 hidden md:block" />
                    <span className="font-bold text-white">Dashboard</span>
                </header>

                {/* Content Area with ScrollArea */}
                <ScrollArea className="max-h-[calc(100vh-4rem)]">
                    <main className="p-4 md:p-8 h-full">
                        {children}
                    </main>
                </ScrollArea>
            </div>
        </SidebarProvider>
    );
}

