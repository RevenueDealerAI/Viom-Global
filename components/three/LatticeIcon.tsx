import { cn } from "@/lib/cn";

type Props = { size?: number; className?: string; subtle?: boolean };

export function LatticeIcon({ size = 22, className, subtle }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(className, subtle && "opacity-80")}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lat-grad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0" stopColor="#4ADE80" />
          <stop offset="1" stopColor="#00FFA3" />
        </linearGradient>
      </defs>
      {/* outer hex */}
      <path
        d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z"
        stroke="url(#lat-grad)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* inner triangle facets */}
      <path
        d="M12 2 L12 22"
        stroke="url(#lat-grad)"
        strokeWidth="0.9"
        strokeOpacity="0.55"
      />
      <path
        d="M3 7 L21 17"
        stroke="url(#lat-grad)"
        strokeWidth="0.9"
        strokeOpacity="0.4"
      />
      <path
        d="M21 7 L3 17"
        stroke="url(#lat-grad)"
        strokeWidth="0.9"
        strokeOpacity="0.4"
      />
      {/* center node */}
      <circle cx="12" cy="12" r="1.6" fill="#00FFA3" />
    </svg>
  );
}
