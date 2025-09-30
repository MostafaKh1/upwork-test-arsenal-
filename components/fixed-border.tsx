import type React from "react"

interface GradientBorderProps {
  children: React.ReactNode
  size?: number
  borderWidth?: number
  gap?: number
  fromColor?: string
  toColor?: string
  className?: string
}

export function GradientBorder({
  children,
  size = 70,
  borderWidth = 3,
  gap = 4,
  fromColor = "#3554D1",
  toColor = "#F8D448",
  className = "",
}: GradientBorderProps) {
  const totalSize = size + gap * 2 + borderWidth * 2
  const radius = totalSize / 2
  const strokeRadius = radius - borderWidth / 2

  const circumference = 2 * Math.PI * strokeRadius

  return (
    <div
      className={`relative ${className}`}
      style={{ width: `${totalSize}px`, height: `${totalSize}px`, overflow: "visible" }}
    >
      {/* Image - centered within the larger container */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {children}
      </div>

      <svg
        width={totalSize}
        height={totalSize}
        viewBox={`0 0 ${totalSize} ${totalSize}`}
        className="absolute inset-0 pointer-events-none"
      >
        <defs>
          <linearGradient
            id="circleGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={radius}
            x2={totalSize}
            y2={radius}
          >
            <stop offset="10%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
            <stop offset="100%" stopColor={fromColor} />
          </linearGradient>
        </defs>
        <circle
          cx={radius}
          cy={radius}
          r={strokeRadius}
          fill="none"
          stroke="url(#circleGradient)"
          strokeWidth={borderWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
