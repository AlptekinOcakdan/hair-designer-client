"use client";

import React from "react";
import { Scissors, Star, CheckCircle2 } from "lucide-react";

export const ServicesSection = () => {
    const services = [
        {
            title: "Saç Kesimi & Şekillendirme",
            desc: "Yüz şeklinize en uygun modern ve klasik kesimler.",
            icon: <Scissors className="w-8 h-8 text-amber-500" />,
            image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2074&auto=format&fit=crop"
        },
        {
            title: "Sakal Tasarımı & Tıraş",
            desc: "Sıcak havlu kompresi ile geleneksel ustura tıraşı.",
            icon: <Star className="w-8 h-8 text-amber-500" />,
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Cilt Bakımı & Maske",
            desc: "Özel losyonlar ve maskeler ile cildinizi canlandırın.",
            icon: <CheckCircle2 className="w-8 h-8 text-amber-500" />,
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"
        }
    ];

    return (
        <section id="services" className="py-20 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hizmetlerimiz</h2>
                    <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Size özel VIP hizmetlerimizle rahatlayın ve yenilenin.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div key={idx} className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 relative">
                                <div className="absolute -top-10 right-8 bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-lg group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};