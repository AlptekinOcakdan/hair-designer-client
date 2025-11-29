"use client";

import React, { useEffect, useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {loginAction} from "@/modules/auth/server/procedures";

export function LoginForm({ onSuccessAction }: { onSuccessAction: (email: string) => void }) {
    // Initial state prosedürlere uygun olmalı
    const initialState = {
        success: false,
        message: '',
    };

    // Gerçek server action kullanımı
    const [state, action, isPending] = useActionState(loginAction, initialState);

    useEffect(() => {
        // İşlem başarılıysa ve payload içinde email varsa bir sonraki adıma geç
        if (state?.success && state.payload?.email) {
            onSuccessAction(state.payload.email);
        }
    }, [state, onSuccessAction]);

    return (
        <form action={action} className="space-y-4 animate-in slide-in-from-left-4 fade-in duration-300">
            <div className="space-y-2">
                <Label htmlFor="login-email">E-posta Adresi</Label>
                <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="ornek@mail.com"
                    required
                    className="border-slate-700 focus-visible:ring-amber-500"
                />
                {state?.errors?.email && (
                    <p className="text-red-500 text-xs">
                        {state.errors.email.join(", ")}
                    </p>
                )}
            </div>

            {state?.message && !state.success && (
                <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded border border-red-900/50">
                    {state.message}
                </div>
            )}

            <Button type="submit" className="w-full bg-amber-500 text-slate-900 hover:bg-amber-600 font-bold" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Giriş Yap"}
            </Button>
        </form>
    );
}