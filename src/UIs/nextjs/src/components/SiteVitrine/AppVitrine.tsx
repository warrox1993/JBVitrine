"use client";
import React from "react";
import { Hero } from "@/components/sections/Hero/Hero";
import { Proof } from "@/components/sections/Proof/Proof";
import { Showreel } from "@/components/sections/Showreel/Showreel";
import { Process } from "@/components/sections/Process/Process";
import { Services } from "@/components/sections/Services/Services";
import { WhySmidjan } from "@/components/sections/WhySmidjan";
import { Footer } from "@/components/sections/Footer/Footer";

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

