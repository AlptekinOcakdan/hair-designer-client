"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { Salon } from "@/modules/salons/server/procedures";
import {SalonSelection, StaffSelection} from "@/modules/dashboard/ui/components/selection-steps";
import {AppointmentScheduler} from "@/modules/dashboard/ui/components/appointment-scheduler";

export function CreateAppointmentModal() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<"salon" | "staff" | "scheduler">("salon");
    const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<any | null>(null);

    const handleOpenChange = (val: boolean) => {
        setOpen(val);
        if (!val) {
            setTimeout(() => {
                setStep("salon");
                setSelectedSalon(null);
                setSelectedStaff(null);
            }, 300);
        }
    };

    const handleBack = () => {
        if (step === "scheduler") setStep("staff");
        else if (step === "staff") setStep("salon");
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold gap-2">
                    <PlusCircle size={18} />
                    Randevu Oluştur
                </Button>
            </DialogTrigger>
            {/* Modal Content Düzenlemesi: ScrollArea entegrasyonu */}
            <DialogContent className="bg-slate-950 border-slate-800 text-slate-200 min-w-fit p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 border-b border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-2">
                        {step !== "salon" && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-white -ml-2"
                                onClick={handleBack}
                            >
                                <ArrowLeft size={16} />
                            </Button>
                        )}
                        <DialogTitle className="text-xl text-white">Yeni Randevu Oluştur</DialogTitle>
                    </div>
                    <DialogDescription className="text-slate-400">
                        {step === "salon" && "İşlem yapılacak salonu seçiniz."}
                        {step === "staff" && "Hizmet verecek personeli seçiniz."}
                        {step === "scheduler" && `${selectedStaff?.firstname} ${selectedStaff?.lastname} için tarih ve işlem seçiniz.`}
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[80dvh] p-6">
                    <div className="pb-4">
                        {step === "salon" && (
                            <SalonSelection
                                onSelect={(salon) => {
                                    setSelectedSalon(salon);
                                    setStep("staff");
                                }}
                            />
                        )}

                        {step === "staff" && selectedSalon && (
                            <StaffSelection
                                salonId={selectedSalon.id}
                                onSelect={(staff) => {
                                    setSelectedStaff(staff);
                                    setStep("scheduler");
                                }}
                            />
                        )}

                        {step === "scheduler" && selectedSalon && selectedStaff && (
                            <AppointmentScheduler
                                salonId={selectedSalon.id}
                                staff={selectedStaff}
                                onSuccess={() => handleOpenChange(false)}
                            />
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}