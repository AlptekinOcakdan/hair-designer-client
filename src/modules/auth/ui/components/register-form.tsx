"use client";

import React, { useEffect, useActionState } from "react";
import { Loader2 } from "lucide-react";
// ÖNEMLİ: Gerçek projede bu importları Shadcn UI yollarıyla değiştirin
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {registerAction} from "@/modules/auth/server/procedures";

export function RegisterForm({ onSuccessAction }: { onSuccessAction: (email: string) => void }) {
    const initialState = {
        success: false,
        message: '',
    };

    const [state, action, isPending] = useActionState(registerAction, initialState);

    useEffect(() => {
        if (state?.success && state.payload?.email) {
            onSuccessAction(state.payload.email);
        }
    }, [state, onSuccessAction]);

    return (
        <form action={action} className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstname">Ad</Label>
                    <Input id="firstname" name="firstname" placeholder="Adınız" required />
                    {state?.errors?.firstname && (
                        <p className="text-red-500 text-xs">{state.errors.firstname.join(", ")}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastname">Soyad</Label>
                    <Input id="lastname" name="lastname" placeholder="Soyadınız" required />
                    {state?.errors?.lastname && (
                        <p className="text-red-500 text-xs">{state.errors.lastname.join(", ")}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="register-email">E-posta Adresi</Label>
                <Input id="register-email" name="email" type="email" placeholder="ornek@mail.com" required />
                {state?.errors?.email && (
                    <p className="text-red-500 text-xs">{state.errors.email.join(", ")}</p>
                )}
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="tos" name="TOSAccepted" className="border-slate-500 data-[state=checked]:bg-amber-500" required />
                <Label htmlFor="tos" className="text-xs text-slate-400">
                    <span className="text-amber-500 hover:underline cursor-pointer">Kullanım Koşullarını</span> kabul ediyorum.
                </Label>
            </div>
            {state?.errors?.TOSAccepted && (
                <p className="text-red-500 text-xs">{state.errors.TOSAccepted.join(", ")}</p>
            )}

            {state?.message && !state.success && (
                <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded border border-red-900/50">
                    {state.message}
                </div>
            )}

            <Button type="submit" className="w-full bg-amber-500 text-slate-900 hover:bg-amber-600 font-bold" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Kayıt Ol"}
            </Button>
        </form>
    );
}