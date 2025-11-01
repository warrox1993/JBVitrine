"use client";

import { useEffect, useRef } from "react";
import "./AnimatedBackground.css";

interface AnimatedBackgroundProps {
  variant?: "dark" | "light";
}

export function AnimatedBackground({ variant = "dark" }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    function createParticles() {
      const container = containerRef.current;
      if (!container || (container as any).__particlesInitialized) return;

      const particleCount = 20;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'animated-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(particle);
      }

      (container as any).__particlesInitialized = true;
    }

    createParticles();

    // Cleanup on unmount
    return () => {
      const container = containerRef.current;
      if (container) {
        container.querySelectorAll('.animated-particle').forEach(p => p.remove());
        (container as any).__particlesInitialized = false;
      }
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={`animated-bg-container ${variant === "light" ? "light-variant" : "dark-variant"}`}
      data-variant={variant}
    >
      {/* Animated background grid */}
      <div className="animated-bg-grid"></div>

      {/* Glowing orbs */}
      <div className="animated-glow-orb animated-glow-orb-1"></div>
      <div className="animated-glow-orb animated-glow-orb-2"></div>
    </div>
  );
}
