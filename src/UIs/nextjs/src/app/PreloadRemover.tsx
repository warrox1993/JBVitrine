"use client";

import { useEffect } from "react";

export default function PreloadRemover() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("is-preload");
    }
  }, []);
  return null;
}

