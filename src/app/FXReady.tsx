"use client";
import { useEffect } from "react";

export default function FXReady() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.fxReady = 'true';
    }
  }, []);
  return null;
}

