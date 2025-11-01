"use client";

import { useEffect, useRef } from "react";
import { Heading } from "@/components/ui/Heading";
import { SITE_CONFIG } from "@/lib/constants";
import styles from "./Team.module.css";

// Système de physique pour les sphères flottantes
class Sphere {
  element: HTMLElement;
  container: HTMLElement;
  isCenter: boolean;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(element: HTMLElement, container: HTMLElement, isCenter = false) {
    this.element = element;
    this.container = container;
    this.isCenter = isCenter;
    this.radius = isCenter ? 200 : 110;

    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - this.radius * 2;
    const maxY = containerRect.height - this.radius * 2;

    this.x = Math.random() * maxX;
    this.y = Math.random() * maxY;

    const speed = 3 + Math.random() * 3;
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    const containerRect = this.container.getBoundingClientRect();
    const maxX = containerRect.width - this.radius * 2;
    const maxY = containerRect.height - this.radius * 2;

    if (this.x <= 0) {
      this.x = 0;
      this.vx = Math.abs(this.vx) * 0.95;
    } else if (this.x >= maxX) {
      this.x = maxX;
      this.vx = -Math.abs(this.vx) * 0.95;
    }

    if (this.y <= 0) {
      this.y = 0;
      this.vy = Math.abs(this.vy) * 0.95;
    } else if (this.y >= maxY) {
      this.y = maxY;
      this.vy = -Math.abs(this.vy) * 0.95;
    }

    this.updatePosition();
  }

  checkCollision(other: Sphere) {
    const dx = this.x + this.radius - (other.x + other.radius);
    const dy = this.y + this.radius - (other.y + other.radius);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = this.radius + other.radius;

    if (distance < minDistance) {
      const angle = Math.atan2(dy, dx);
      const overlap = minDistance - distance;
      const separationX = Math.cos(angle) * overlap * 0.5;
      const separationY = Math.sin(angle) * overlap * 0.5;

      this.x += separationX;
      this.y += separationY;
      other.x -= separationX;
      other.y -= separationY;

      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      const v1x = this.vx * cos + this.vy * sin;
      const v1y = this.vy * cos - this.vx * sin;
      const v2x = other.vx * cos + other.vy * sin;
      const v2y = other.vy * cos - other.vx * sin;

      const damping = 0.85;
      this.vx = (v2x * cos - v1y * sin) * damping;
      this.vy = (v1y * cos + v2x * sin) * damping;
      other.vx = (v1x * cos - v2y * sin) * damping;
      other.vy = (v2y * cos + v1x * sin) * damping;

      return true;
    }
    return false;
  }
}

const ORBIT_POSITIONS = [
  { role: "Frontend Developer", type: "React/Next.js", id: 1 },
  { role: "Backend Developer", type: "Node.js/Python", id: 2 },
  { role: "UI/UX Designer", type: "Product Design", id: 3 },
  { role: "DevOps Engineer", type: "Cloud/CI-CD", id: 4 },
  { role: "Data Analyst", type: "Analytics/BI", id: 5 },
  { role: "Product Manager", type: "Strategy/Vision", id: 6 },
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spheresRef = useRef<Sphere[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current || !centerRef.current) return;

    const container = containerRef.current;
    const centerCard = centerRef.current;
    const orbitCircles = orbitRefs.current.filter(
      (ref): ref is HTMLDivElement => ref !== null
    );

    const spheres: Sphere[] = [];
    spheres.push(new Sphere(centerCard, container, true));
    orbitCircles.forEach((circle) => {
      spheres.push(new Sphere(circle, container, false));
    });

    spheresRef.current = spheres;

    // Animation loop
    const animate = () => {
      spheres.forEach((sphere) => sphere.update());
      for (let i = 0; i < spheres.length; i++) {
        for (let j = i + 1; j < spheres.length; j++) {
          spheres[i].checkCollision(spheres[j]);
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse move particles
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (Math.random() > 0.95) {
        const particle = document.createElement("div");
        particle.className = styles["mouse-particle"];
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className={styles["team-hero"]}>
        <Heading as="h2" accent className={styles["team-title"]}>
          Notre Équipe
        </Heading>
        <p className={styles["team-subtitle"]}>
          Une équipe en construction, avec l'excellence au cœur de notre ADN et
          l'ambition de créer des expériences digitales mesurables.
        </p>
      </div>

      <div className={styles["orbital-container"]} ref={containerRef}>
        {/* Lignes d'orbite */}
        <div className={`${styles["orbit-line"]} ${styles["orbit-line-1"]}`} />
        <div className={`${styles["orbit-line"]} ${styles["orbit-line-2"]}`} />
        <div className={`${styles["orbit-line"]} ${styles["orbit-line-3"]}`} />

        {/* Carte centrale */}
        <div className={styles["center-card"]} ref={centerRef}>
          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', height: '100%' }}
          >
            <div className={styles["center-name"]}>Jean-Baptiste D.</div>
            <div className={styles["center-title"]}>CEO & Designer Produit</div>
            <div className={styles["center-description"]}>
              Conçoit des systèmes clairs où chaque détail sert le parcours.
              Esthétique utile, mesurable, durable.
            </div>
          </a>
        </div>

        {/* Cercles en orbite */}
        {ORBIT_POSITIONS.map((position, index) => (
          <div
            key={position.id}
            className={`${styles["orbit-circle"]} ${styles[`orbit-${position.id}`]}`}
            ref={(el) => {
              orbitRefs.current[index] = el;
            }}
          >
            <a
              href="/contact"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', height: '100%' }}
            >
              <svg className={styles["circular-text"]} viewBox="0 0 220 220">
                <defs>
                  <path
                    id={`circle-${position.id}`}
                    d="M 110, 110 m -95, 0 a 95,95 0 1,1 190,0 a 95,95 0 1,1 -190,0"
                  />
                </defs>
                <text>
                  <textPath href={`#circle-${position.id}`} startOffset="0%">
                    NOUS RECRUTONS • NOUS RECRUTONS •
                  </textPath>
                </text>
              </svg>
              <div className={styles["orbit-role"]}>{position.role}</div>
              <div className={styles["orbit-type"]}>{position.type}</div>
            </a>
          </div>
        ))}

        {/* Particules décoratives */}
        <div className={styles["particle"]} style={{ top: "10%", left: "15%", animationDelay: "0s" }} />
        <div className={styles["particle"]} style={{ top: "80%", left: "20%", animationDelay: "2s" }} />
        <div className={styles["particle"]} style={{ top: "20%", right: "15%", animationDelay: "4s" }} />
        <div className={styles["particle"]} style={{ bottom: "15%", right: "25%", animationDelay: "6s" }} />
        <div className={styles["particle"]} style={{ top: "50%", left: "5%", animationDelay: "1s" }} />
        <div className={styles["particle"]} style={{ top: "40%", right: "8%", animationDelay: "3s" }} />
        <div className={styles["particle"]} style={{ top: "60%", left: "10%", animationDelay: "3.5s" }} />
        <div className={styles["particle"]} style={{ bottom: "30%", right: "15%", animationDelay: "5s" }} />
      </div>
    </>
  );
}
