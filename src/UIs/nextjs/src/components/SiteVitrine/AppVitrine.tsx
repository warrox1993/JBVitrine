"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero/Hero";

// Aggressive dynamic imports for below-the-fold (saves ~100KB initial bundle)
const WhySmidjan = dynamic(() => import("@/components/sections/WhySmidjan").then(mod => ({ default: mod.WhySmidjan })), {
  ssr: true,
});

const Showreel = dynamic(() => import("@/components/sections/Showreel/Showreel").then(mod => ({ default: mod.Showreel })), {
  ssr: true,
});

const Process = dynamic(() => import("@/components/sections/Process/Process").then(mod => ({ default: mod.Process })), {
  ssr: true,
});

const Services = dynamic(() => import("@/components/sections/Services/Services").then(mod => ({ default: mod.Services })), {
  ssr: true,
});

const Proof = dynamic(() => import("@/components/sections/Proof/Proof").then(mod => ({ default: mod.Proof })), {
  ssr: true,
});

const Footer = dynamic(() => import("@/components/sections/Footer/Footer").then(mod => ({ default: mod.Footer })), {
  ssr: true,
});

export default function AppVitrine() {
  return (
    <>
      <Hero />
      <WhySmidjan />
      <Showreel />
      <Process />
      <Services />
      <Proof />
      <Footer />
    </>
  );
}

