"use client";

import React from "react";
import { Scissors, Instagram, Twitter, Facebook, MapPin, Phone, Clock } from "lucide-react";

export const ContactFooter = () => {
    return (
        <footer id="contact" className="bg-slate-950 pt-20 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900">
                                <Scissors size={18} />
                            </div>
                            <span className="text-white font-bold text-xl tracking-wider">
                GOLDEN<span className="text-amber-500">CUT</span>
              </span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Stiliniz, imzanızdır. Profesyonel ekibimizle en iyi görünümünüze kavuşun.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500 transition-all">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Hızlı Bağlantılar</h4>
                        <ul className="space-y-3">
                            <li><a href="#hero" className="text-gray-400 hover:text-amber-500 transition-colors">Ana Sayfa</a></li>
                            <li><a href="#services" className="text-gray-400 hover:text-amber-500 transition-colors">Hizmetler</a></li>
                            <li><a href="#gallery" className="text-gray-400 hover:text-amber-500 transition-colors">Galeri</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-amber-500 transition-colors">İletişim</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">İletişim</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="text-amber-500 shrink-0 mt-1" size={20} />
                                <span>Bağdat Caddesi No: 123<br />Kadıköy, İstanbul</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone className="text-amber-500 shrink-0" size={20} />
                                <span>+90 (216) 123 45 67</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Clock className="text-amber-500 shrink-0" size={20} />
                                <span>Haftanın her günü: 10:00 - 22:00</span>
                            </li>
                        </ul>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-full min-h-[200px] bg-slate-900 rounded-xl overflow-hidden relative">
                        <img
                            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2831&auto=format&fit=crop"
                            alt="Map Location"
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="bg-slate-900/80 text-white px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm border border-slate-700 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-all">
                                Haritada Gör
                            </button>
                        </div>
                    </div>
                </div>

                <div className="py-8 border-t border-slate-900 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} GoldenCut Berber Salonu. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
};