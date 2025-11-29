"use client";

import React from "react";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
    const reviews = [
        { name: "Ahmet Y.", comment: "Yıllardır aradığım kaliteyi burada buldum. Ortam çok nezih, ustalar çok ilgili.", rating: 5 },
        { name: "Mehmet K.", comment: "Sakal tasarımında bir numara. Sıcak havlu hizmeti harika bir detay.", rating: 5 },
        { name: "Caner T.", comment: "Randevu sistemi çok pratik, beklemeden tıraş oldum. Teşekkürler GoldenCut.", rating: 5 },
    ];

    return (
        <section className="py-20 bg-amber-500/5 relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Müşteri Yorumları</h2>
                    <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl relative">
                            <div className="text-amber-500 mb-4 flex">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-gray-300 italic mb-6">"{review.comment}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                                    {review.name.charAt(0)}
                                </div>
                                <div className="font-bold text-white">{review.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};