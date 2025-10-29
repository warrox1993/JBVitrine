"use client";

import React, { useEffect, useState } from "react";

type IdleWindow = typeof window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number;
};

export default function LazyCursorGlow() {
  const [ReadyComp, setReadyComp] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    const schedule = (cb: () => void) => {
      if (typeof window !== "undefined") {
        const idleWin = window as IdleWindow;
        if (typeof idleWin.requestIdleCallback === "function") {
          idleWin.requestIdleCallback(() => cb());
          return;
        }
      }
      setTimeout(cb, 200);
    };

    schedule(async () => {
      const mod = await import("./CursorGlow");
      setReadyComp(() => mod.CursorGlow);
    });
  }, []);

  return ReadyComp ? <ReadyComp /> : null;
}
