"use client"

import { Calendar, CreditCard, Wallet, PieChart, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import List01 from "./list-01"
import List02 from "./list-02"
import List03 from "./list-03"
import VerificationOverview from "./verification-overview"
import VerificationChart from "./verification-chart"
import CreditBalance from "./credit-balance"
import AnalyticsChart from "./analytics-chart"
import { cn } from "@/lib/utils"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
}

export default function Content() {
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section title */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Overview</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
          View all
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
      
      {/* Cards row */}
      <motion.div variants={itemVariants} className="w-full">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent pb-2">
          <div className="flex gap-4 min-w-full p-1">
            <VerificationOverview
              totalVerified={30}
              pendingVerifications={12}
              failedVerifications={3}
              successRate={40}
            />
            <VerificationChart
              verified={40}
              pending={45}
              rejected={15}
            />
            <CreditBalance
              balance={30000}
            />
            <div className={cn(
              "flex flex-col justify-between",
              "w-[240px] h-[300px] shrink-0",
              "bg-white dark:bg-zinc-900/70",
              "rounded-xl",
              "border border-slate-200 dark:border-slate-800",
              "shadow-sm hover:shadow-md transition-shadow duration-300",
              "p-6"
            )}>
              {/* Action card */}
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <PieChart className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-base font-medium text-slate-900 dark:text-white">Start Verification</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Verify your assets quickly and securely</p>
              </div>
              
              <button className="mt-auto py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm font-medium rounded-lg transition-colors duration-300">
                Start Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Analytics chart */}
      <motion.div variants={itemVariants}>
        <AnalyticsChart />
      </motion.div>
      
      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-purple-600" />
            Recent Verifications
          </h3>
          <div className="flex-1">
            <List01 className="h-full" />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-purple-600" />
            Recent Transactions
          </h3>
          <div className="flex-1">
            <List02 className="h-full" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

