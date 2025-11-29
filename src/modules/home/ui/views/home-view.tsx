"use client";

import React from "react";
import {HomeNavbar} from "@/modules/home/ui/components/home-navbar";
import {HeroSection} from "@/modules/home/ui/sections/hero-section";
import {ServicesSection} from "@/modules/home/ui/sections/services-section";
import {TestimonialsSection} from "@/modules/home/ui/sections/testimonials-section";
import {ContactFooter} from "@/modules/home/ui/sections/contact-footer";
export const HomeView = () => {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500 selection:text-slate-900 font-sans">
            <HomeNavbar />
            <HeroSection />
            <ServicesSection />
            <TestimonialsSection />
            <ContactFooter />
        </main>
    );
};