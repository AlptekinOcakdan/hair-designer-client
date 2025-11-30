"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format, addDays, startOfWeek, endOfWeek, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, Check, AlertCircle, Loader2 } from "lucide-react";
import { userQueries } from "@/modules/users/server/queries";
import { bookAppointment } from "@/modules/users/server/procedures";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface AppointmentSchedulerProps {
    salonId: string;
    staff: any; // StaffProceduresResponseItem
    onSuccess: () => void;
}

export function AppointmentScheduler({ salonId, staff, onSuccess }: AppointmentSchedulerProps) {
    // --- STATE ---
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
    const [appointmentTime, setAppointmentTime] = useState<string>("");
    // Client ID state kaldırıldı

    // --- QUERIES ---
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });

    const { data: availability, isLoading: isAvailLoading } = useQuery(
        userQueries.listStaffAvailability(
            salonId,
            staff.staffId,
            format(weekStart, 'yyyy-MM-dd'),
            format(weekEnd, 'yyyy-MM-dd')
        )
    );

    const dayAvailability = useMemo(() => {
        if (!availability) return null;
        return availability.find(d => isSameDay(new Date(d.date), selectedDate));
    }, [availability, selectedDate]);

    // --- CALCULATIONS ---
    const totals = useMemo(() => {
        let duration = 0;
        let price = 0;
        selectedProcedures.forEach(procId => {
            const proc = staff.procedures.find((p: any) => p.id === procId);
            if (proc) {
                duration += proc.duration || 0;
                price += parseFloat(proc.price || "0");
            }
        });
        return { duration, price };
    }, [selectedProcedures, staff.procedures]);

    // --- MUTATION ---
    const { mutate: createAppointment, isPending } = useMutation({
        mutationFn: bookAppointment,
        onSuccess: () => {
            toast.success("Randevu başarıyla oluşturuldu.");
            onSuccess();
        },
        onError: (error: any) => {
            toast.error(error.message || "Randevu oluşturulamadı.");
        }
    });

    // --- HANDLERS ---
    const handleProcedureToggle = (procId: string) => {
        setSelectedProcedures(prev =>
            prev.includes(procId)
                ? prev.filter(id => id !== procId)
                : [...prev, procId]
        );
    };

    const handleSubmit = () => {
        if (!selectedDate || !appointmentTime || selectedProcedures.length === 0) {
            toast.warning("Lütfen tarih, saat ve en az bir işlem seçiniz.");
            return;
        }

        const [hours, minutes] = appointmentTime.split(':').map(Number);
        const finalDate = new Date(selectedDate);
        finalDate.setHours(hours, minutes, 0, 0);

        createAppointment({
            salonId,
            staffId: staff.staffId,
            procedureIds: selectedProcedures,
            appointmentDate: finalDate.toISOString(),
            // clientId gönderilmiyor, backend token'dan alacak
        });
    };

    const checkAvailabilityStatus = () => {
        if (!appointmentTime || !dayAvailability) return null;

        const [h, m] = appointmentTime.split(":").map(Number);
        const startMin = h * 60 + m;
        const endMin = startMin + totals.duration;

        const isAvailable = dayAvailability.slots.some(slot => {
            const [sH, sM] = slot.start.split(":").map(Number);
            const [eH, eM] = slot.end.split(":").map(Number);
            const slotStart = sH * 60 + sM;
            const slotEnd = eH * 60 + eM;
            return startMin >= slotStart && endMin <= slotEnd;
        });

        if (isAvailable) return { status: "available" };

        const suggestion = dayAvailability.slots.find(slot => {
            const [sH, sM] = slot.start.split(":").map(Number);
            const [eH, eM] = slot.end.split(":").map(Number);
            const slotDuration = (eH * 60 + eM) - (sH * 60 + sM);
            return slotDuration >= totals.duration;
        });

        return {
            status: "unavailable",
            suggestion: suggestion ? `${suggestion.start}` : null
        };
    };

    const status = checkAvailabilityStatus();

    return (
        <div className="flex flex-col gap-6">
            {/* Üst Kısım: Takvim ve Durum */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Takvim */}
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-slate-400">Takvim</h3>
                        <Select
                            value={selectedDate.toISOString()}
                            onValueChange={(val) => setSelectedDate(new Date(val))}
                        >
                            <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 h-8 text-xs text-slate-200">
                                <SelectValue placeholder="Gün Seçiniz" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                                {Array.from({ length: 7 }).map((_, i) => {
                                    const date = addDays(weekStart, i);
                                    return (
                                        <SelectItem key={i} value={date.toISOString()}>
                                            {format(date, "d MMMM EEEE", { locale: tr })}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-md border border-slate-800 bg-slate-950 w-full flex justify-center text-slate-200"
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                </div>

                {/* Müsaitlik Durumu */}
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 flex flex-col h-[380px]">
                    <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2 sticky top-0 bg-slate-900 z-10 pb-2">
                        <Clock size={16} />
                        {format(selectedDate, "d MMMM EEEE", { locale: tr })} Durumu
                    </h3>

                    {isAvailLoading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <Loader2 className="animate-spin text-amber-500" />
                        </div>
                    ) : !dayAvailability?.isAvailable ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-red-400 gap-2">
                            <AlertCircle size={32} />
                            <p className="text-center font-medium">Personel çalışmıyor.</p>
                            <p className="text-xs opacity-70">{dayAvailability?.reason}</p>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                            {dayAvailability.slots.length > 0 ? (
                                dayAvailability.slots.map((slot, idx) => (
                                    <div key={idx} className="bg-slate-800/50 p-3 rounded-md text-sm text-green-400 border border-green-900/30 flex justify-between items-center hover:bg-slate-800 transition-colors cursor-pointer group" onClick={() => setAppointmentTime(slot.start)}>
                                        <span className="font-mono text-base">{slot.start} - {slot.end}</span>
                                        <Badge variant="outline" className="border-green-800 text-green-500 group-hover:bg-green-500 group-hover:text-slate-900 transition-colors">Seç</Badge>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-400 text-sm text-center mt-10">Bugün için uygun boşluk bulunmamaktadır.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Alt Kısım: Randevu Formu */}
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 space-y-6">
                <h3 className="font-semibold text-white border-b border-slate-800 pb-2">Randevu Detayları</h3>

                {/* Prosedür Seçimi */}
                <div className="space-y-3">
                    <Label className="text-slate-300">Yapılacak İşlemler</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {staff.procedures.map((proc: any) => (
                            <div
                                key={proc.id}
                                className={`
                                    flex items-start space-x-3 p-3 rounded border transition-all cursor-pointer
                                    ${selectedProcedures.includes(proc.id)
                                    ? "bg-amber-500/10 border-amber-500/50"
                                    : "bg-slate-950 border-slate-800 hover:border-slate-700"}
                                `}
                                onClick={() => handleProcedureToggle(proc.id)}
                            >
                                <Checkbox
                                    id={proc.id}
                                    checked={selectedProcedures.includes(proc.id)}
                                    onCheckedChange={() => handleProcedureToggle(proc.id)}
                                    className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:text-slate-900 mt-1"
                                />
                                <div className="grid gap-1.5 leading-none w-full">
                                    <label
                                        htmlFor={proc.id}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-200 cursor-pointer"
                                    >
                                        {proc.name}
                                    </label>
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span className="flex items-center gap-1"><Clock size={10}/> {proc.duration} dk</span>
                                        <span className="font-semibold text-amber-500/80">{proc.price} ₺</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Özet ve Saat Seçimi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2">
                        <Label className="text-slate-300">Başlangıç Saati</Label>
                        <div className="relative">
                            <Input
                                type="time"
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                                className="bg-slate-950 border-slate-700 text-white pl-10 h-11"
                            />
                            <Clock className="absolute left-3 top-3 text-slate-500 h-5 w-5" />
                        </div>
                        <p className="text-xs text-slate-500">Müsaitlik tablosundaki bir aralığa tıklayarak da seçebilirsiniz.</p>
                    </div>

                    <div className="bg-slate-950 rounded p-4 border border-slate-800 flex flex-col justify-between h-full">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Toplam Süre:</span>
                                <span className="text-white font-medium">{totals.duration} dk</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Toplam Tutar:</span>
                                <span className="text-amber-500 font-bold text-lg">
                                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(totals.price)}
                                </span>
                            </div>
                        </div>

                        {/* Müsaitlik Uyarısı */}
                        {appointmentTime && status && (
                            <div className="mt-4">
                                {status.status === "available" ? (
                                    <div className="text-green-500 text-xs flex items-center gap-2 bg-green-900/10 p-2 rounded border border-green-900/20">
                                        <Check size={14} />
                                        <span className="font-medium">Seçilen saat uygun.</span>
                                    </div>
                                ) : (
                                    <Alert variant="destructive" className="py-2 bg-red-900/10 border-red-900/20 text-red-400">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle className="text-xs font-bold">Saat Uygun Değil</AlertTitle>
                                        <AlertDescription className="text-xs mt-1">
                                            {status.suggestion ? (
                                                <span className="cursor-pointer underline hover:text-white" onClick={() => setAppointmentTime(status.suggestion!)}>
                                                    Öneri: {status.suggestion} saatini seçebilirsiniz.
                                                </span>
                                            ) : (
                                                "Bu gün için uygun aralık yok. Başka gün seçiniz."
                                            )}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                    <Button
                        onClick={handleSubmit}
                        disabled={isPending || !selectedDate || !appointmentTime || status?.status === "unavailable"}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-900 w-full md:w-auto font-bold h-11 px-8"
                    >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Randevuyu Onayla
                    </Button>
                </div>
            </div>
        </div>
    );
}