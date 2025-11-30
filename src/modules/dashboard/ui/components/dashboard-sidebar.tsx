import {LogOut, Scissors} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarRail
} from "@/components/ui/sidebar";

export const DashboardSidebar = ({ menuItems, pathname }: { menuItems: any[], pathname: string }) => {
    return (
        <Sidebar collapsible="icon" className="border-r-slate-800">
            <SidebarHeader className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-900">
                <div className="flex items-center gap-2 text-amber-500 px-2 w-full transition-all duration-200 overflow-hidden group-data-[collapsible=icon]:justify-center">
                    <Scissors className="h-6 w-6 shrink-0" />
                    <span className="font-bold text-xl text-white tracking-wider group-data-[collapsible=icon]:hidden">
                        GOLDEN<span className="text-amber-500">CUT</span>
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-slate-900">
                <SidebarMenu className="p-2 gap-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={item.name}
                                    className={`
                                        w-full justify-start gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors h-10
                                        ${isActive
                                        ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/15 hover:text-amber-500 ring-1 ring-amber-500/20"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    }
                                    `}
                                >
                                    <Link href={item.href}>
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex items-center gap-3 mb-4 group-data-[collapsible=icon]:justify-center overflow-hidden transition-all">
                    <div className="overflow-hidden flex-1 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium text-white truncate">Admin User</p>
                        <p className="text-xs text-slate-500 truncate">admin@goldencut.com</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-600 bg-transparent group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                >
                    <LogOut size={18} />
                    <span className="group-data-[collapsible=icon]:hidden">Çıkış Yap</span>
                </Button>
            </SidebarFooter>
            <SidebarRail className="hover:bg-amber-500/50" />
        </Sidebar>
    )
}