import { cn } from "@/lib/utils"
import React from "react"

interface VerificationChartProps {
  verified: number
  pending: number
  rejected: number
  className?: string
}

export default function VerificationChart({
  verified = 40,
  pending = 45,
  rejected = 15,
  className,
}: VerificationChartProps) {
  const total = verified + pending + rejected
  const verifiedPercentage = Math.round((verified / total) * 100)
  
  // Calculate stroke-dasharray and stroke-dashoffset values for SVG
  const radius = 40
  const strokeWidth = 18
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = 2 * Math.PI * normalizedRadius
  
  // We're drawing the segments in reverse order (verified on top)
  const verifiedStart = 0
  const verifiedEnd = verified / total * circumference
  
  const pendingStart = verifiedEnd
  const pendingEnd = pendingStart + (pending / total * circumference)
  
  return (
    <div
      className={cn(
        "flex flex-col",
        "w-[240px] h-[300px] shrink-0",
        "bg-white dark:bg-zinc-900/70",
        "rounded-xl",
        "border border-zinc-100 dark:border-zinc-800",
        "shadow-sm",
        "items-center p-5",
        className
      )}
    >
      <div className="relative w-36 h-36 flex items-center justify-center my-4">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            cx="50" 
            cy="50" 
            r={normalizedRadius}
            fill="none" 
            stroke="#f0f0f0" 
            strokeWidth={strokeWidth}
          />
          
          {/* Segments */}
          <circle
            cx="50"
            cy="50"
            r={normalizedRadius}
            fill="none"
            stroke="#4A1D95"
            strokeWidth={strokeWidth}
            strokeDasharray={`${verifiedEnd} ${circumference - verifiedEnd}`}
            strokeDashoffset="0"
            transform="rotate(-90 50 50)"
          />
          
          <circle
            cx="50"
            cy="50"
            r={normalizedRadius}
            fill="none"
            stroke="#F472B6"
            strokeWidth={strokeWidth}
            strokeDasharray={`${pending / total * circumference} ${circumference - (pending / total * circumference)}`}
            strokeDashoffset={-verifiedEnd}
            transform="rotate(-90 50 50)"
          />
          
          {/* Center white circle */}
          <circle
            cx="50"
            cy="50"
            r={normalizedRadius - strokeWidth/2}
            fill="white"
          />
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{verifiedPercentage}%</div>
        </div>
      </div>
      
      <div className="text-center mb-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Percentage of<br />successfully verified assets
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-4 w-full mt-auto">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-red-600" />
          <span className="text-xs text-gray-700 dark:text-gray-300">Rejected</span>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-violet-800" />
          <span className="text-xs text-gray-700 dark:text-gray-300">Verified</span>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-pink-400" />
          <span className="text-xs text-gray-700 dark:text-gray-300">Pending</span>
        </div>
      </div>
    </div>
  )
} 