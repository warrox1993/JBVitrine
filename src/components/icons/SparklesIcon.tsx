import React from "react";

export function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
      <path d="M5 15l.8 1.8L8 17.5l-1.8.7L5 20l-.7-1.8L2.5 17.5 4.3 16.8 5 15z" />
      <path d="M19 14l.9 2.2 2.1.9-2.1.9L19 20l-.9-2.2-2.1-.9 2.1-.9L19 14z" />
    </svg>
  );
}

