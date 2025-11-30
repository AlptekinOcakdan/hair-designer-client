import React from "react";
import {DashboardLayout} from "@/modules/dashboard/ui/layouts/dahsboard-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}