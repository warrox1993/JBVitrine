/**
 * Behavioral Tracking System
 *
 * Système de tracking avancé pour suivre le comportement des visiteurs
 * et calculer des scores d'engagement et d'intention d'achat.
 */

"use client";

import { BehavioralData } from "./types";

export class BehavioralTracker {
  private sessionId: string;
  private startTime: number;
  private data: BehavioralData;
  private eventBuffer: any[] = [];
  private scrollTimer: any;
  private hoverTimer: any;
  private flushInterval: any;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.startTime = Date.now();
    this.data = this.initializeData();

    // Only setup listeners if in browser
    if (typeof window !== "undefined") {
      this.setupEventListeners();
    }
  }

  private initializeData(): BehavioralData {
    const isBrowser = typeof window !== "undefined";

    return {
      sessionId: this.sessionId,
      sessionStart: this.startTime,
      sessionDuration: 0,
      visitedPages: [],
      interactions: [],
      wizardStarted: false,
      wizardStep: 0,
      wizardBackClicks: 0,
      infoBubbleOpened: [],
      landingPage: isBrowser ? window.location.pathname : "/",
      referrer: isBrowser ? document.referrer : undefined,
      device: isBrowser ? this.detectDevice() : "desktop",
      browser: isBrowser ? this.detectBrowser() : "unknown",
      os: isBrowser ? this.detectOS() : "unknown",
      engagementScore: 0,
      intentScore: 0,
      ...(isBrowser ? this.parseUTMParams() : {}),
    };
  }

  // Setup event listeners
  private setupEventListeners() {
    if (typeof window === "undefined") return;

    // Page view tracking
    this.trackPageView();

    // Scroll tracking (debounced)
    window.addEventListener("scroll", () => {
      clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.trackScroll();
      }, 100);
    });

    // Click tracking
    document.addEventListener("click", (e) => {
      this.trackClick(e.target as HTMLElement);
    });

    // Form focus tracking
    document.addEventListener("focusin", (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        this.trackFormFocus(target);
      }
    });

    // Mousemove/hover tracking (debounced)
    document.addEventListener("mousemove", (e) => {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = setTimeout(() => {
        this.trackHover(e.target as HTMLElement);
      }, 500);
    });

    // Page visibility (tab switching)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.trackTabSwitch();
      }
    });

    // Before unload (save session)
    window.addEventListener("beforeunload", () => {
      this.saveSession();
    });

    // Periodic flush (every 30 seconds)
    this.flushInterval = setInterval(() => {
      this.flushEvents();
    }, 30000);
  }

  // Track page view
  trackPageView() {
    if (typeof window === "undefined") return;

    const currentPage = {
      path: window.location.pathname,
      title: document.title,
      timeSpent: 0,
      scrollDepth: 0,
      enteredAt: Date.now(),
    };

    this.data.visitedPages.push(currentPage);

    // Send to GA4 if available
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as any).gtag("event", "page_view", {
        page_path: currentPage.path,
        page_title: currentPage.title,
        session_id: this.sessionId,
      });
    }

    // Update session duration
    this.data.sessionDuration = Date.now() - this.startTime;
  }

  // Track scroll depth
  private trackScroll() {
    if (typeof window === "undefined") return;

    const scrollPercentage = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100,
    );

    const currentPage =
      this.data.visitedPages[this.data.visitedPages.length - 1];
    if (currentPage) {
      currentPage.scrollDepth = Math.max(
        currentPage.scrollDepth,
        scrollPercentage,
      );
    }

    // Milestone tracking (25%, 50%, 75%, 100%)
    const milestones = [25, 50, 75, 100];
    milestones.forEach((milestone) => {
      if (
        scrollPercentage >= milestone &&
        !this.hasTrackedMilestone(`scroll_${milestone}`)
      ) {
        this.trackInteraction("scroll", `milestone_${milestone}`);

        if (typeof window !== "undefined" && "gtag" in window) {
          (window as any).gtag("event", "scroll", {
            percent_scrolled: milestone,
            page_path: window.location.pathname,
          });
        }
      }
    });
  }

  // Track click
  private trackClick(element: HTMLElement) {
    const elementInfo = this.getElementInfo(element);
    this.trackInteraction("click", elementInfo);

    // Special tracking for wizard elements
    if (element.closest("[data-wizard-step]")) {
      const step = element
        .closest("[data-wizard-step]")
        ?.getAttribute("data-wizard-step");
      this.data.wizardStep = parseInt(step || "0");
    }

    if (element.closest("[data-wizard-back]")) {
      this.data.wizardBackClicks++;
    }

    if (element.closest("[data-info-bubble]")) {
      const infoType = element
        .closest("[data-info-bubble]")
        ?.getAttribute("data-info-type");
      if (infoType && !this.data.infoBubbleOpened.includes(infoType)) {
        this.data.infoBubbleOpened.push(infoType);
      }
    }

    // Track CTA clicks
    if (element.matches('button, a[href*="contact"]')) {
      if (typeof window !== "undefined" && "gtag" in window) {
        (window as any).gtag("event", "cta_click", {
          cta_text: element.textContent?.trim(),
          cta_location: window.location.pathname,
        });
      }
    }
  }

  // Track form focus
  private trackFormFocus(element: HTMLElement) {
    const fieldName =
      element.getAttribute("name") || element.getAttribute("id") || "unknown";
    this.trackInteraction("form_focus", fieldName);

    if (typeof window !== "undefined" && "gtag" in window) {
      (window as any).gtag("event", "form_start", {
        form_field: fieldName,
      });
    }
  }

  // Track hover
  private trackHover(element: HTMLElement) {
    // Only track important elements
    if (element.matches("button, a, [data-track-hover]")) {
      this.trackInteraction("hover", this.getElementInfo(element));
    }
  }

  // Track tab switch
  private trackTabSwitch() {
    this.trackInteraction("scroll", "user_left_tab");
  }

  // Generic interaction tracker
  private trackInteraction(
    type: BehavioralData["interactions"][0]["type"],
    element: string,
  ) {
    this.data.interactions.push({
      type,
      element,
      timestamp: Date.now(),
    });

    this.eventBuffer.push({
      type,
      element,
      timestamp: Date.now(),
    });
  }

  // Calculate engagement score (0-100)
  calculateEngagementScore(): number {
    let score = 0;

    // Time on site (0-25 pts)
    const minutes = this.data.sessionDuration / 60000;
    if (minutes >= 10) score += 25;
    else if (minutes >= 5) score += 20;
    else if (minutes >= 3) score += 15;
    else if (minutes >= 1) score += 10;

    // Pages visited (0-20 pts)
    const pagesCount = this.data.visitedPages.length;
    if (pagesCount >= 5) score += 20;
    else if (pagesCount >= 3) score += 15;
    else if (pagesCount >= 2) score += 10;
    else score += 5;

    // Scroll depth average (0-15 pts)
    const avgScrollDepth =
      this.data.visitedPages.reduce((sum, page) => sum + page.scrollDepth, 0) /
      (this.data.visitedPages.length || 1);
    if (avgScrollDepth >= 75) score += 15;
    else if (avgScrollDepth >= 50) score += 10;
    else if (avgScrollDepth >= 25) score += 5;

    // Interactions count (0-20 pts)
    const interactionsCount = this.data.interactions.length;
    if (interactionsCount >= 20) score += 20;
    else if (interactionsCount >= 10) score += 15;
    else if (interactionsCount >= 5) score += 10;
    else score += 5;

    // Wizard engagement (0-20 pts)
    if (this.data.wizardStarted) {
      score += 5;
      if (this.data.wizardStep >= 3) score += 10;
      if (this.data.infoBubbleOpened.length >= 2) score += 5;
    }

    return Math.min(score, 100);
  }

  // Calculate intent score (0-100)
  calculateIntentScore(): number {
    let score = 0;

    // High-intent pages visited (0-30 pts)
    const highIntentPages = ["/contact", "/services", "/portfolio", "/tarifs"];
    const visitedHighIntent = this.data.visitedPages.filter((page) =>
      highIntentPages.some((hip) => page.path.includes(hip)),
    ).length;
    score += Math.min(visitedHighIntent * 10, 30);

    // Wizard started (0-20 pts)
    if (this.data.wizardStarted) {
      score += 10;
      score += Math.min(this.data.wizardStep * 2, 10);
    }

    // Direct/Organic traffic (0-15 pts)
    if (!this.data.referrer || this.data.utm_source === "organic") {
      score += 15;
    } else if (
      this.data.utm_source === "google" ||
      this.data.utm_source === "bing"
    ) {
      score += 10;
    }

    // Return visitor (0-15 pts)
    const previousVisits = this.getPreviousVisitsCount();
    if (previousVisits >= 3) score += 15;
    else if (previousVisits === 2) score += 10;
    else if (previousVisits === 1) score += 5;

    // Info bubbles opened (0-10 pts)
    score += Math.min(this.data.infoBubbleOpened.length * 3, 10);

    // Back clicks (negative signal)
    score -= Math.min(this.data.wizardBackClicks * 2, 10);

    // CTA clicks (0-10 pts)
    const ctaClicks = this.data.interactions.filter(
      (i) => i.type === "click" && i.element.includes("btn"),
    ).length;
    score += Math.min(ctaClicks * 2, 10);

    return Math.max(0, Math.min(score, 100));
  }

  // Helper methods
  private getElementInfo(element: HTMLElement): string {
    return (
      element.getAttribute("data-track") ||
      element.getAttribute("id") ||
      element.getAttribute("class")?.split(" ")[0] ||
      element.tagName.toLowerCase()
    );
  }

  private hasTrackedMilestone(milestone: string): boolean {
    return this.data.interactions.some((i) => i.element === milestone);
  }

  private getOrCreateSessionId(): string {
    if (typeof window === "undefined") return `server-${Date.now()}`;

    let sessionId = sessionStorage.getItem("smidjan_session_id");
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("smidjan_session_id", sessionId);
    }
    return sessionId;
  }

  private getPreviousVisitsCount(): number {
    if (typeof window === "undefined") return 0;

    const visits = parseInt(localStorage.getItem("smidjan_visit_count") || "0");
    localStorage.setItem("smidjan_visit_count", (visits + 1).toString());
    return visits;
  }

  private detectDevice(): "mobile" | "tablet" | "desktop" {
    if (typeof window === "undefined") return "desktop";

    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  private detectBrowser(): string {
    if (typeof navigator === "undefined") return "unknown";

    const ua = navigator.userAgent;
    if (ua.includes("Chrome")) return "chrome";
    if (ua.includes("Safari")) return "safari";
    if (ua.includes("Firefox")) return "firefox";
    if (ua.includes("Edge")) return "edge";
    return "other";
  }

  private detectOS(): string {
    if (typeof navigator === "undefined") return "unknown";

    const ua = navigator.userAgent;
    if (ua.includes("Win")) return "windows";
    if (ua.includes("Mac")) return "macos";
    if (ua.includes("Linux")) return "linux";
    if (ua.includes("Android")) return "android";
    if (ua.includes("iOS")) return "ios";
    return "other";
  }

  private parseUTMParams() {
    if (typeof window === "undefined") return {};

    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
    };
  }

  // Flush events to backend
  private async flushEvents() {
    if (this.eventBuffer.length === 0) return;

    try {
      await fetch("/api/leadScoring/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: this.sessionId,
          events: this.eventBuffer,
        }),
      });

      this.eventBuffer = [];
    } catch (error) {
      console.error("Failed to flush events:", error);
    }
  }

  // Save session data
  private saveSession() {
    this.data.sessionDuration = Date.now() - this.startTime;
    this.data.engagementScore = this.calculateEngagementScore();
    this.data.intentScore = this.calculateIntentScore();

    if (typeof window === "undefined") return;

    // Save to localStorage for persistence
    try {
      localStorage.setItem(
        `smidjan_session_${this.sessionId}`,
        JSON.stringify(this.data),
      );
    } catch (error) {
      console.error("Failed to save session:", error);
    }

    // Send to backend using sendBeacon
    if ("sendBeacon" in navigator) {
      navigator.sendBeacon(
        "/api/leadScoring/session",
        JSON.stringify({
          sessionId: this.sessionId,
          data: this.data,
        }),
      );
    }
  }

  // Public getters
  getData(): BehavioralData {
    this.data.sessionDuration = Date.now() - this.startTime;
    this.data.engagementScore = this.calculateEngagementScore();
    this.data.intentScore = this.calculateIntentScore();
    return this.data;
  }

  // Mark wizard as started
  markWizardStarted() {
    this.data.wizardStarted = true;
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as any).gtag("event", "wizard_started", {
        session_id: this.sessionId,
      });
    }
  }

  // Cleanup
  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.saveSession();
  }
}

// Global instance
let globalTracker: BehavioralTracker | null = null;

export function getTracker(): BehavioralTracker {
  if (!globalTracker) {
    globalTracker = new BehavioralTracker();
  }
  return globalTracker;
}

export function resetTracker() {
  if (globalTracker) {
    globalTracker.destroy();
    globalTracker = null;
  }
}
