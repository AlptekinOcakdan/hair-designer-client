"use client";

import React, { useState, useEffect } from "react";
// ÖNEMLİ: Gerçek projede bu importları Shadcn UI yollarıyla değiştirin
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { OtpForm } from "./otp-form";

export function AuthModal({
                              open,
                              onOpenChangeAction
                          }: {
    open: boolean;
    onOpenChangeAction: (open: boolean) => void
}) {
    const [activeTab, setActiveTab] = useState<"login" | "register">("register");
    const [authStep, setAuthStep] = useState<"form" | "otp">("form");
    const [userEmail, setUserEmail] = useState("");

    // Tab değiştiğinde formu resetle
    useEffect(() => {
        if (!open) {
            // Modal kapandığında state'i temizle
            setTimeout(() => {
                setAuthStep("form");
                setActiveTab("register");
                setUserEmail("");
            }, 300);
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChangeAction}>
            <DialogContent className="sm:max-w-[425px] bg-slate-950 text-slate-200 border-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-amber-500">
                        {authStep === "otp" ? "Doğrulama" : "Hoş Geldiniz"}
                    </DialogTitle>
                    <DialogDescription className="text-center text-slate-400">
                        {authStep === "otp"
                            ? "Lütfen e-posta adresinize gönderilen kodu giriniz."
                            : "Randevu almak ve işlemlerinizi yönetmek için giriş yapın."}
                    </DialogDescription>
                </DialogHeader>

                {authStep === "form" ? (
                    <Tabs
                        value={activeTab}
                        onValueChange={(v) => setActiveTab(v as "login" | "register")}
                        className="w-full mt-4"
                    >
                        <TabsList className="grid w-full grid-cols-2 bg-slate-900">
                            <TabsTrigger value="login">Giriş Yap</TabsTrigger>
                            <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
                        </TabsList>

                        <div className="mt-6">
                            <TabsContent value="login">
                                <LoginForm
                                    onSuccessAction={(email) => {
                                        setUserEmail(email);
                                        setAuthStep("otp");
                                    }}
                                />
                            </TabsContent>

                            <TabsContent value="register">
                                <RegisterForm
                                    onSuccessAction={(email) => {
                                        setUserEmail(email);
                                        setAuthStep("otp");
                                    }}
                                />
                            </TabsContent>
                        </div>
                    </Tabs>
                ) : (
                    <OtpForm email={userEmail} />
                )}
            </DialogContent>
        </Dialog>
    );
}