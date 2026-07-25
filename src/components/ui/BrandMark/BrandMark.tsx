/**
 * Smidjan brand mark — a monoline emerald "S" (the "smid"/forge idea) with a
 * gold forge-ember at its base. Bare (no plate) so the emerald reads on both
 * light and dark surfaces; inline SVG → crisp at every size, no raster asset.
 * The favicon counterpart lives in `src/app/icon.svg`.
 */
export function BrandMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M27.2 13.2C27.2 10.3 23.4 8.6 19.8 8.6C15.5 8.6 12.4 10.9 12.4 14.1C12.4 17.2 15.5 18.6 19.9 19.4C24.3 20.2 27.6 21.5 27.6 25.1C27.6 28.8 24.2 31.2 19.8 31.2C16.1 31.2 13.1 29.6 12.4 26.8"
        stroke="#13A277"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6 34C12.1 31.4 12.7 27.3 16 24.5C19.3 27.3 19.9 31.4 16.4 34C16.15 34.2 15.85 34.2 15.6 34Z"
        fill="#F0D691"
      />
      <path
        d="M16 32.1C14.3 30.7 14.6 28.5 16.25 27.1C17.1 28.5 17 30.7 16 32.1Z"
        fill="#E8952B"
      />
    </svg>
  );
}

export default BrandMark;
