"use client";

import React from "react";
import { Star, Calendar, MapPin } from "lucide-react";

export const HeroSection = () => {
    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
                    alt="Barber Shop Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/80 to-slate-900/40"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-amber-500 mb-6 animate-fade-in-up">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-semibold tracking-wide uppercase">Şehrin En İyisi</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                    Tarzını <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-600">Keşfet</span><br />
                    Özgüvenini Tazele
                </h1>

                <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Modern kesim teknikleri, klasik berber kültürü ve birinci sınıf bakım ürünleri ile kendinizin en iyi versiyonuna dönüşün.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20">
                        <Calendar size={20} />
                        Hemen Randevu Al
                    </button>
                    <button className="bg-transparent border-2 border-white/20 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                        <MapPin size={20} />
                        Konumumuz
                    </button>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-400">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-gray-400 rounded-full mt-2"></div>
                </div>
            </div>
        </section>
    );
};