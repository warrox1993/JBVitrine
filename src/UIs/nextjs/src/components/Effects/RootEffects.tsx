"use client";
import { SkipLink } from "./SkipLink";
import { ScrollProgress } from "./ScrollProgress";
import { CursorGlow } from "./CursorGlow";

interface RootEffectsProps { children: React.ReactNode }

export function RootEffects({ children }: RootEffectsProps) {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <CursorGlow />
      {children}
    </>
  );
}

