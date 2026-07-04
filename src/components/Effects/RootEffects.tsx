"use client";
import { SkipLink } from "./SkipLink";
import { ScrollProgress } from "./ScrollProgress";
import LazyCursorGlow from "./LazyCursorGlow";

interface RootEffectsProps { children: React.ReactNode }

export function RootEffects({ children }: RootEffectsProps) {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <LazyCursorGlow />
      {children}
    </>
  );
}
