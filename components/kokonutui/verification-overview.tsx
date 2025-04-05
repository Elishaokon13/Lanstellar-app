import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import React from "react"

interface VerificationOverviewProps {
  totalVerified: number
  pendingVerifications: number
  failedVerifications: number
  successRate: number
  className?: string
}

export default function VerificationOverview({
  totalVerified = 30,
  pendingVerifications = 12,
  failedVerifications = 3,
  successRate = 40,
  className,
}: VerificationOverviewProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between",
        "w-[240px] h-[300px] shrink-0",
        "bg-white dark:bg-zinc-900/70",
        "rounded-xl",
        "border border-zinc-100 dark:border-zinc-800",
        "shadow-sm",
        className
      )}
    >
      <div className="p-4 space-y-4">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Verification Overview</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Total Verified Assets</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{totalVerified}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Pending Verifications</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{pendingVerifications}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Failed Verifications</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{failedVerifications}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Success Rate</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{successRate}%</span>
          </div>
        </div>
      </div>

      <div className="mt-auto px-4 pb-4">
        <button
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "py-3",
            "text-sm font-medium",
            "bg-purple-600 hover:bg-purple-700",
            "text-white",
            "rounded-lg",
            "transition-colors duration-200",
          )}
        >
          Verify
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
} 