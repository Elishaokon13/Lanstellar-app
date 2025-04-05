import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

interface AnalyticsChartProps {
  className?: string
}

export default function AnalyticsChart({
  className,
}: AnalyticsChartProps) {
  // State to track container width
  const [containerWidth, setContainerWidth] = useState(0);
  
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

  // Responsive bar width calculation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const chartContainer = document.getElementById('analytics-chart-container');
        if (chartContainer) {
          setContainerWidth(chartContainer.offsetWidth);
        }
      };
      
      // Set initial width
      handleResize();
      
      // Add resize listener
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Calculate responsive bar width based on container width
  const calculateBarWidth = () => {
    if (containerWidth <= 400) {
      // Mobile: Keep slim bars as they currently are
      return Math.max(3, Math.floor((containerWidth - 90) / (chartData.length <= 6 ? chartData.length : 6)) - 5);
    } else if (containerWidth <= 640) {
      // Small devices
      return Math.max(6, Math.floor((containerWidth - 100) / chartData.length) - 3);
    } else if (containerWidth <= 1024) {
      // Medium screens - make wider
      return Math.max(22, Math.min(32, Math.floor((containerWidth - 120) / chartData.length)));
    } else {
      // Large screens - much wider bars
      return Math.max(30, Math.min(50, Math.floor((containerWidth - 140) / chartData.length)));
    }
  };
  
  // Responsive data filtering for smaller screens
  const getResponsiveData = () => {
    if (containerWidth <= 400) {
      // On very small screens, show every other data point
      return chartData.filter((_, index) => index % 2 === 0);
    }
    return chartData;
  };
  
  // Scale factor to convert data values to pixel heights
  const getHeightScaleFactor = () => {
    const maxAnalyticsValue = Math.max(...chartData.map(item => item.analytics));
    const chartHeight = containerWidth <= 640 ? 120 : 150; // Max chart height in pixels
    return chartHeight / maxAnalyticsValue;
  };
  
  const barWidth = calculateBarWidth();
  const responsiveData = getResponsiveData();
  const scaleFactor = getHeightScaleFactor();
  
  return (
    <div
      id="analytics-chart-container"
      className={cn(
        "w-full",
        "bg-white dark:bg-zinc-900/70",
        "rounded-xl",
        "border border-zinc-100 dark:border-zinc-800",
        "shadow-sm",
        "p-4 sm:p-6",
        className
      )}
    >
      <h3 className="text-base sm:text-lg font-semibold text-purple-700 mb-4 sm:mb-6">
        Chart
      </h3>
      
      <div className="flex flex-col">
        {/* Chart area with responsive height */}
        <div className="h-36 sm:h-40 md:h-48 mb-4 sm:mb-8 relative">
          {/* Diagonal pattern background */}
          <div className="absolute inset-0 top-6 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="diagonalPattern" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#7C3AED" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#diagonalPattern)" />
            </svg>
          </div>
          
          {/* Responsive Bar chart */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-full overflow-x-auto overflow-y-hidden">
            <div className="flex justify-between items-end min-w-full px-2">
              {responsiveData.map((item, index) => (
                <div key={index} className="flex flex-col items-center mx-1.5 sm:mx-1 md:mx-0.5 lg:mx-1">
                  {/* User stats - lighter color bars (top bars) */}
                  <div 
                    className="rounded-t-md bg-purple-400" 
                    style={{ 
                      width: `${barWidth}px`,
                      height: `${Math.max(4, Math.round(item.userStats * scaleFactor))}px`,
                      marginBottom: '2px'
                    }}
                  />
                  
                  {/* Analytics - darker color bars (bottom/main bars) */}
                  <div 
                    className="rounded-md bg-purple-700" 
                    style={{ 
                      width: `${barWidth}px`,
                      height: `${Math.max(6, Math.round(item.analytics * scaleFactor))}px`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legend with responsive layout */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-8 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-700" />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Analytics</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-400" />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">User Stats</span>
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
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Trends</span>
          </div>
        </div>
      </div>
    </div>
  )
} 