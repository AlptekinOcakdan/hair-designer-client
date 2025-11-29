"use client";

import React, {useActionState, useState} from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {verifyOtpAction} from "@/modules/auth/server/procedures";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";

interface FormState<T> {
    success: boolean;
    message: string;
    errors?: {
        [key: string]: string[];
    };
    payload?: T;
}

export function OtpForm({ email }: { email: string }) {
    const initialState: FormState<void> = {
        success: false,
        message: '',
    };

    const [state, action, isPending] = useActionState(verifyOtpAction, initialState);
    const [otpValue, setOtpValue] = useState("");

    return (
        <form action={action} className="space-y-8 mt-4 animate-in zoom-in-95 fade-in duration-300">
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="otpCode" value={otpValue} />

            <div className="space-y-4 text-center">
                <p className="text-slate-400 text-sm leading-relaxed">
                    <span className="text-amber-500 font-medium">{email}</span> adresine gönderilen 6 haneli kodu giriniz
                </p>

                <div className="flex justify-center py-4">
                    <InputOTP
                        maxLength={6}
                        value={otpValue}
                        onChange={(val: string) => setOtpValue(val)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                {state?.errors?.otpCode && (
                    <p className="text-red-500 text-xs animate-pulse">
                        {state.errors.otpCode.join(", ")}
                    </p>
                )}
            </div>

            {state?.message && !state.success && (
                <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50 text-center shadow-sm">
                    {state.message}
                </div>
            )}

            <Button
                type="submit"
                className="w-full bg-amber-500 text-slate-900 hover:bg-amber-600 font-bold py-6 text-lg transition-all shadow-lg hover:shadow-amber-500/20 disabled:opacity-70"
                disabled={isPending || otpValue.length < 6}
            >
                {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Doğrula ve Giriş Yap"}
            </Button>

            <div className="text-center space-y-2">
                <p className="text-xs text-slate-500">
                    Kod gelmedi mi?
                </p>
                <button type="button" className="text-sm text-amber-500 hover:text-amber-400 hover:underline font-medium transition-colors">
                    Tekrar Gönder
                </button>
            </div>
        </form>
    );
}