import React from "react";

export function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5l-2.5 6-6 2.5 2.5-6 6-2.5z" />
    </svg>
  );
}

