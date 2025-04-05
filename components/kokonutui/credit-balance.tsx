import { cn } from "@/lib/utils"
import React from "react"

interface CreditBalanceProps {
  balance: number
  className?: string
}

export default function CreditBalance({
  balance = 30000,
  className,
}: CreditBalanceProps) {
  // Format the balance with commas
  const formattedBalance = balance.toLocaleString('en-US')
  
  return (
    <div
      className={cn(
        "flex flex-col justify-between",
        "w-[240px] h-[300px] shrink-0",
        "bg-white dark:bg-zinc-900/70",
        "rounded-xl",
        "border border-zinc-100 dark:border-zinc-800",
        "shadow-sm",
        "p-6",
        className
      )}
    >
      <div className="space-y-3">
        <h3 className="text-base font-medium text-gray-700 dark:text-gray-300">
          Credit Balance
        </h3>
        
        <div className="relative pb-1.5">
          <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            ${formattedBalance}
          </span>
        </div>
      </div>
      
      <div className="mt-auto">
        <button
          className={cn(
            "w-full flex items-center justify-center",
            "py-3",
            "text-base font-medium",
            "bg-purple-600 hover:bg-purple-700",
            "text-white",
            "rounded-lg",
            "transition-colors duration-200",
          )}
        >
          Transactions
        </button>
      </div>
    </div>
  )
} 