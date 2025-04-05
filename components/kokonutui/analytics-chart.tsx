import { cn } from "@/lib/utils"
import React from "react"

interface AnalyticsChartProps {
  className?: string
}

export default function AnalyticsChart({
  className,
}: AnalyticsChartProps) {
  // Mock data for the chart - the heights roughly match the image
  const chartData = [
    { id: 1, analytics: 30, userStats: 15 },
    { id: 2, analytics: 50, userStats: 22 },
    { id: 3, analytics: 65, userStats: 27 },
    { id: 4, analytics: 70, userStats: 30 },
    { id: 5, analytics: 85, userStats: 32 },
    { id: 6, analytics: 95, userStats: 35 },
    { id: 7, analytics: 75, userStats: 33 },
    { id: 8, analytics: 55, userStats: 30 },
    { id: 9, analytics: 80, userStats: 28 },
    { id: 10, analytics: 60, userStats: 25 },
    { id: 11, analytics: 40, userStats: 20 },
  ]
  
  return (
    <div
      className={cn(
        "w-full",
        "bg-white dark:bg-zinc-900/70",
        "rounded-xl",
        "border border-zinc-100 dark:border-zinc-800",
        "shadow-sm",
        "p-6",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-purple-700 mb-6">
        Chart
      </h3>
      
      <div className="flex flex-col">
        {/* Chart area with fixed height */}
        <div className="h-48 mb-8 relative">
          {/* Diagonal pattern background */}
          <div className="absolute inset-0 top-6 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="diagonalPattern" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#7C3AED" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#diagonalPattern)" />
            </svg>
          </div>
          
          {/* Bar chart */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-full">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* User stats - lighter color bars (top bars) */}
                <div 
                  className="w-[40px] rounded-md bg-purple-400" 
                  style={{ 
                    height: `${item.userStats}px`,
                    marginBottom: '2px' 
                  }}
                />
                
                {/* Analytics - darker color bars (bottom/main bars) */}
                <div 
                  className="w-[40px] rounded-md bg-purple-700" 
                  style={{ height: `${item.analytics}px` }}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-8 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-700" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Analytics</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">User Stats</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-3 w-6">
              <svg width="100%" height="100%">
                <pattern id="diagonalPatternLegend" patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="3" stroke="#7C3AED" strokeWidth="1.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#diagonalPatternLegend)" />
              </svg>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Trends</span>
          </div>
        </div>
      </div>
    </div>
  )
} 