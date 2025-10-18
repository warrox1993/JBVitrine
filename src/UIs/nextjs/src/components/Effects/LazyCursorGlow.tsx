"use client";
import React, { useEffect, useState } from 'react';

export default function LazyCursorGlow() {
  const [ReadyComp, setReadyComp] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const schedule = (cb: () => void) => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(cb);
      } else {
        setTimeout(cb, 200);
      }
    };
    schedule(async () => {
      const mod = await import('./CursorGlow');
      setReadyComp(() => mod.CursorGlow);
    });
  }, []);

  return ReadyComp ? <ReadyComp /> : null;
}

