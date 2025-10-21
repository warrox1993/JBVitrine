"use client";

import { useEffect, useRef } from "react";
import { Heading } from "@/components/ui/Heading";
import { TIMELINE_ITEMS } from "@/lib/aboutTimelineData";
import "./timeline.css";

// Swiper (ESM)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Timeline() {
  const swiperRef = useRef<any>(null);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="timeline-container" aria-label="Parcours SMIDJAN">
      <Heading as="h2" accent className="mb-4">Mon Histoire</Heading>
      <div
        className="timeline"
        onMouseEnter={() => {
          const s = swiperRef.current;
          if (s && s.autoplay && typeof s.autoplay.stop === "function") s.autoplay.stop();
        }}
        onMouseLeave={() => {
          const s = swiperRef.current;
          if (s && s.autoplay && typeof s.autoplay.start === "function") s.autoplay.start();
        }}
      >
        <div className="timeline-button-prev" aria-label="Précédent" />
        <div className="timeline-button-next" aria-label="Suivant" />
        <div className="timeline-pagination" />

        <Swiper
          className="timeline-swiper"
          modules={[Navigation, Pagination, A11y, Autoplay]}
          direction={"vertical"}
          loop={false}
          speed={1600}
          autoplay={prefersReduced ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSwiper={(s) => (swiperRef.current = s)}
          pagination={{
            el: ".timeline-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              const year = TIMELINE_ITEMS[index]?.year ?? "";
              return `<span class="${className}">${year}</span>`;
            },
          }}
          navigation={{
            nextEl: ".timeline-button-next",
            prevEl: ".timeline-button-prev",
          }}
          breakpoints={{
            768: { direction: "horizontal" },
          }}
        >
          {TIMELINE_ITEMS.map((item, idx) => (
            <SwiperSlide
              key={item.year + idx}
              data-year={item.year}
              aria-label={`${item.year} — ${item.title}`}
            >
              <div
                className="slide-bg"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
                role="img"
                aria-label=""
              />
              <div className="swiper-slide-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-h3">{item.title}</h3>
                <p className="timeline-text">{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
