"use client";

import React, { useState, useEffect } from "react";
import { Scissors, Menu, X } from "lucide-react";
import { AuthModal } from "@/modules/auth/ui/components/auth-modal";

export const HomeNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false); // Auth Modal State

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Ana Sayfa", href: "#hero" },
        { name: "Hizmetler", href: "#services" },
        { name: "İletişim", href: "#contact" },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="shrink-0 flex items-center gap-2">
                            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-slate-900">
                                <Scissors size={24} />
                            </div>
                            <span className="text-white font-bold text-xl tracking-wider">
                GOLDEN<span className="text-amber-500">CUT</span>
              </span>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-gray-300 hover:text-amber-500 transition-colors px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
                            >
                                Randevu Al
                            </button>
                        </div>

                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-slate-900 shadow-xl absolute w-full border-t border-slate-800">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-amber-500 block px-3 py-4 rounded-md text-base font-medium text-center border-b border-slate-800 last:border-0"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 pb-2 flex justify-center">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsAuthOpen(true);
                                    }}
                                    className="w-full max-w-xs bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-full"
                                >
                                    Randevu Al
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Auth Modal Bileşeni */}
            <AuthModal open={isAuthOpen} onOpenChangeAction={setIsAuthOpen} />
        </>
    );
};