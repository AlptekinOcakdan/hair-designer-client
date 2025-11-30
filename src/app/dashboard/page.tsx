"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MapPin, Clock, Scissors } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {salonQueries} from "@/modules/salons/server/queries";
import {userQueries} from "@/modules/users/server/queries";
import {Salon} from "@/modules/salons/server/procedures";
import {CreateAppointmentModal} from "@/modules/dashboard/ui/components/create-appointment-modal";

const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID || "95fef7c9-0d4c-43ec-a117-b8e8bf4cdffc";

export default function DashboardPage() {
    // 1. Organizasyona ait salonları çek
    const {
        data: salons,
        isLoading: isSalonsLoading,
        error: salonsError
    } = useQuery(salonQueries.listByOrganisation(ORGANISATION_ID));

    if (isSalonsLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-amber-500 gap-4">
                <Loader2 className="w-10 h-10 animate-spin" />
                <p className="text-slate-400">Veriler yükleniyor...</p>
            </div>
        );
    }

    if (salonsError) {
        return (
            <div className="p-6 bg-red-900/10 border border-red-900/30 rounded-xl text-red-400 text-center">
                <p className="font-semibold">Bir hata oluştu</p>
                <p className="text-sm opacity-80 mt-1">Salonlar yüklenirken bir sorunla karşılaşıldı.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Genel Bakış</h1>
                    <p className="text-slate-400">Organizasyonunuza bağlı salonların ve personel işlemlerinin durumunu buradan takip edebilirsiniz.</p>
                </div>
                {/* Randevu Oluşturma Butonu/Modalı Buraya Eklendi */}
                <div className="shrink-0">
                    <CreateAppointmentModal />
                </div>
            </div>

            <div className="grid gap-6">
                {salons?.map((salon) => (
                    <SalonCard key={salon.id} salon={salon} />
                ))}

                {salons?.length === 0 && (
                    <div className="text-center py-16 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
                        <Scissors className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-300">Henüz Salon Yok</h3>
                        <p className="text-slate-500 mt-2">Bu organizasyona kayıtlı herhangi bir salon bulunmamaktadır.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function SalonCard({ salon }: { salon: Salon }) {
    // 2. User queries üzerinden getSalonStaffProcedures kullanıyoruz
    const {
        data: staffProcedures,
        isLoading
    } = useQuery(userQueries.listStaffProcedures(salon.id));

    // Toplam prosedür sayısını hesapla (tüm personellerin toplam prosedür sayısı)
    const totalProcedures = staffProcedures?.reduce((acc, staff) => acc + staff.procedures.length, 0) || 0;

    return (
        <Card className="bg-slate-900 border-slate-800 overflow-hidden shadow-lg transition-all hover:border-slate-700">
            <CardHeader className="border-b border-slate-800/50 bg-slate-900/50 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-xl text-amber-500 flex items-center gap-2">
                            <StoreIcon className="w-5 h-5" />
                            {salon.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1.5 mt-2 text-slate-400">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            {salon.location}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-slate-700 text-slate-400 bg-slate-800/50">
                            {isLoading ? "..." : `${staffProcedures?.length || 0} Personel`}
                        </Badge>
                        <Badge variant="outline" className="border-amber-900/30 text-amber-500 bg-amber-500/5">
                            {isLoading ? "..." : `${totalProcedures} İşlem`}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                {isLoading ? (
                    <div className="py-12 flex justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-950/30 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">Personel</th>
                                <th className="px-6 py-4 font-medium">İşlem Adı</th>
                                <th className="px-6 py-4 font-medium">Süre</th>
                                <th className="px-6 py-4 font-medium text-right">Ücret</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                            {/* Her personel için prosedürleri listele */}
                            {staffProcedures?.map((staff) => (
                                staff.procedures.map((proc) => (
                                    <tr key={`${staff.staffId}-${proc.id}`} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-slate-200">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-amber-500 border border-slate-700 shrink-0">
                                                    {staff.firstname.charAt(0)}
                                                </div>
                                                <span className="truncate">{staff.firstname} {staff.lastname}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">{proc.name}</td>
                                        <td className="px-6 py-4 text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {proc.durationMinutes} dk
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                <span className="text-amber-500 font-bold bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
                                    {/* String fiyatı formatlamak gerekebilir, backend string dönüyor */}
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(parseFloat(proc.price))}
                                </span>
                                        </td>
                                    </tr>
                                ))
                            ))}

                            {(!staffProcedures || staffProcedures.length === 0 || totalProcedures === 0) && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">
                                        Bu salona ait personel veya işlem bulunamadı.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function StoreIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
            <path d="M2 7h20" />
            <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 10v-3a2 2 0 0 1-2-2v0" />
        </svg>
    )
}