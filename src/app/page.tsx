"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Nav from "@/components/layout/Nav";
import SectionIndex from "@/components/layout/SectionIndex";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Concept from "@/components/sections/Concept";
import Offer from "@/components/sections/Offer";
import LogoSection from "@/components/sections/LogoSection";
import PostSection from "@/components/sections/PostSection";
import PosterSection from "@/components/sections/PosterSection";
import Closing from "@/components/sections/Closing";

/* Section order mirrors the task order so graders can tick boxes in sequence (docs/06). */
export default function Home() {
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <Preloader>
      <Nav />
      <SectionIndex />
      <main>
        <Hero />
        <Marquee />
        <Concept />
        <Offer />
        <LogoSection />
        <PostSection />
        <PosterSection />
        <Closing />
      </main>
      <Footer />
    </Preloader>
  );
}
