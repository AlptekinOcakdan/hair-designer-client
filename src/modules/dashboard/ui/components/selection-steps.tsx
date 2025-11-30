"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { salonQueries } from "@/modules/salons/server/queries";
import { userQueries } from "@/modules/users/server/queries";
import { Loader2, MapPin, Store, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Salon } from "@/modules/salons/server/procedures";

const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID || "95fef7c9-0d4c-43ec-a117-b8e8bf4cdffc";

interface SalonSelectionProps {
    onSelect: (salon: Salon) => void;
}

export function SalonSelection({ onSelect }: SalonSelectionProps) {
    const { data: salons, isLoading } = useQuery(salonQueries.listByOrganisation(ORGANISATION_ID));

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-amber-500" /></div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {salons?.map((salon) => (
                <Card
                    key={salon.id}
                    className="p-4 bg-slate-900 border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all hover:bg-slate-800/50 group"
                    onClick={() => onSelect(salon)}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-slate-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors">
                            <Store size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white group-hover:text-amber-500 transition-colors">{salon.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-slate-400">
                                <MapPin size={12} />
                                {salon.location}
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

interface StaffSelectionProps {
    salonId: string;
    onSelect: (staff: any) => void;
}

export function StaffSelection({ salonId, onSelect }: StaffSelectionProps) {
    // Bu query hem personeli hem de prosedürlerini getirir
    const { data: staffList, isLoading } = useQuery(userQueries.listStaffProcedures(salonId));

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-amber-500" /></div>;

    if (!staffList || staffList.length === 0) {
        return <div className="text-center p-8 text-slate-400">Bu salonda kayıtlı personel bulunamadı.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffList.map((staff) => (
                <Card
                    key={staff.staffId}
                    className="p-4 bg-slate-900 border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all hover:bg-slate-800/50 group"
                    onClick={() => onSelect(staff)}
                >
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-300 group-hover:border-amber-500 group-hover:text-amber-500">
                            <User size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">{staff.firstname} {staff.lastname}</h3>
                            <p className="text-xs text-slate-400">{staff.procedures.length} İşlem Yapıyor</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}