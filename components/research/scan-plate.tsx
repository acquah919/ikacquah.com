import { cn } from "@/lib/utils";

type Variant = "mri" | "ct";

export function ScanPlate({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const mri = variant === "mri";
  const c = mri
    ? {
        bg: "#05070a",
        body: "#4f555c",
        fat: "#c6c8c9",
        muscle: "#3b4147",
        marrow: "#d9d6cd",
        cortex: "#15181c",
        fluid: "#e9edf0",
        bowel: "#20252a",
        air: "#0a0c10",
      }
    : {
        bg: "#000000",
        body: "#7c8187",
        fat: "#5c6166",
        muscle: "#8a8f95",
        marrow: "#cfcfca",
        cortex: "#f4f4f0",
        fluid: "#474c52",
        bowel: "#3a3f45",
        air: "#000000",
      };

  return (
    <svg
      aria-hidden
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <radialGradient id={`${variant}-body`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor={c.muscle} />
          <stop offset="100%" stopColor={c.body} />
        </radialGradient>
        <pattern
          id={`${variant}-grain`}
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
        >
          <rect width="3" height="3" fill="transparent" />
          <rect width="1" height="1" fill="#ffffff" opacity="0.08" />
        </pattern>
      </defs>

      <rect width="400" height="300" fill={c.bg} />

      {/* Subcutaneous fat and body outline */}
      <ellipse cx="200" cy="160" rx="172" ry="118" fill={c.fat} />
      <ellipse
        cx="200"
        cy="162"
        rx="158"
        ry="105"
        fill={`url(#${variant}-body)`}
      />

      {/* Iliac wings */}
      <path
        d="M70 140 C 60 115, 95 95, 125 118 L 138 150 C 120 165, 95 170, 78 160 Z"
        fill={c.marrow}
        stroke={c.cortex}
        strokeWidth={mri ? 4 : 3}
      />
      <path
        d="M330 140 C 340 115, 305 95, 275 118 L 262 150 C 280 165, 305 170, 322 160 Z"
        fill={c.marrow}
        stroke={c.cortex}
        strokeWidth={mri ? 4 : 3}
      />

      {/* Femoral heads with acetabular cups */}
      <path
        d="M78 172 A 40 40 0 0 1 132 176"
        fill="none"
        stroke={c.cortex}
        strokeWidth="7"
      />
      <path
        d="M322 172 A 40 40 0 0 0 268 176"
        fill="none"
        stroke={c.cortex}
        strokeWidth="7"
      />
      <circle
        cx="104"
        cy="190"
        r="26"
        fill={c.marrow}
        stroke={c.cortex}
        strokeWidth={mri ? 5 : 4}
      />
      <circle
        cx="296"
        cy="190"
        r="26"
        fill={c.marrow}
        stroke={c.cortex}
        strokeWidth={mri ? 5 : 4}
      />

      {/* Sacrum */}
      <path
        d="M170 236 Q 200 212 230 236 L 222 262 Q 200 272 178 262 Z"
        fill={c.marrow}
        stroke={c.cortex}
        strokeWidth={mri ? 4 : 3}
      />

      {/* Bladder */}
      <ellipse cx="200" cy="142" rx="46" ry="34" fill={c.fluid} />
      {/* Rectum with a pocket of air */}
      <circle cx="200" cy="208" r="15" fill={c.bowel} />
      <circle cx="200" cy="208" r="6" fill={c.air} />

      {/* Film grain */}
      <rect width="400" height="300" fill={`url(#${variant}-grain)`} />

      {/* Scale marks */}
      <g stroke="#ffffff" opacity="0.45" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1={20 + i * 10}
            y1="284"
            x2={20 + i * 10}
            y2={i % 4 === 0 ? 276 : 280}
          />
        ))}
      </g>
    </svg>
  );
}
