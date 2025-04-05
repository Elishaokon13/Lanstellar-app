"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Dummy verification asset data
const VERIFY_ASSETS = [
  {
    id: "1",
    title: "Asset Title",
    description: "Lorem ipsum dolor sit amet consectetur. Risus nullam iaculis amet mi orci felis tortor.",
    hash: "0x20de32....",
    isVerified: true,
  },
  {
    id: "2",
    title: "Asset Title",
    description: "Lorem ipsum dolor sit amet consectetur. Risus nullam iaculis amet mi orci felis tortor.",
    hash: "0x20de32....",
    isVerified: true,
  },
  {
    id: "3",
    title: "Asset Title",
    description: "Lorem ipsum dolor sit amet consectetur. Risus nullam iaculis amet mi orci felis tortor.",
    hash: "0x20de32....",
    isVerified: true,
  },
  {
    id: "4",
    title: "Asset Title",
    description: "Lorem ipsum dolor sit amet consectetur. Risus nullam iaculis amet mi orci felis tortor.",
    hash: "0x20de32....",
    isVerified: true,
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
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

export default function Verify() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filter assets based on search query
  const filteredAssets = VERIFY_ASSETS.filter(asset => 
    asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.hash.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Define gradient text style
  const gradientTextStyle = {
    backgroundImage: 'linear-gradient(to right, #FFFFFF, #8A27BA)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  }
  
  const gradientButtonStyle = {
    background: 'linear-gradient(to right, #4A009A 30%, #8A27BA 70%, #FF6FF5 100%)',
  }
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Page header */}
      <motion.div variants={itemVariants}>
        <h1 
          className="text-2xl font-semibold text-slate-900 dark:text-white mb-2"
          style={typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? gradientTextStyle : undefined}
        >
          Verify Assets
        </h1>
        <p className="text-slate-600 dark:text-slate-300">Verify your digital assets on the blockchain</p>
      </motion.div>
      
      {/* Search bar */}
      <motion.div variants={itemVariants} className="w-full max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by contract address, name, location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/30 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm shadow-sm transition-all"
          />
        </div>
      </motion.div>
      
      {/* Verification grid */}
      <motion.div variants={itemVariants} className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <motion.div 
              key={asset.id} 
              variants={itemVariants}
              whileHover={{ 
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                borderColor: "rgba(138, 39, 186, 0.5)",
                transition: { duration: 0.2 }
              }}
              className="border-2 border-dashed border-blue-300 dark:border-purple-600/40 rounded-lg p-5 bg-white dark:bg-[#2A294A]/40 backdrop-blur-sm relative overflow-hidden group"
            >
              {/* Subtle gradient background in dark mode */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 dark:from-purple-600/10 dark:to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="space-y-3 relative z-10">
                <h3 className="font-medium text-slate-900 dark:text-white">{asset.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{asset.description}</p>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {asset.hash}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/30 relative z-10">
                <div className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Verified Asset
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-full text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Call to action button */}
      <motion.div variants={itemVariants} className="mt-8 flex justify-center">
        <button 
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          style={gradientButtonStyle}
        >
          Verify New Asset
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </motion.div>
      
      {/* Empty state */}
      {filteredAssets.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">No assets found matching your search criteria.</p>
        </motion.div>
      )}
    </motion.div>
  )
} 