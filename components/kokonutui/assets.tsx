"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Plus, Grid3X3, List, ExternalLink, ArrowUpRight, Shield } from "lucide-react"
import AssetCard from "./asset-card"
import { cn } from "@/lib/utils"

// Dummy asset data
const ASSETS = [
  {
    id: "1",
    title: "Asset Title",
    description: "Lorem ipsum dolor sit amet consectetur. Risus nullam iaculis amet mi orci felis tortor.",
    hash: "0x20de32....",
    isVerified: true,
    image: "",
    date: "Jan 15, 2024",
  },
  {
    id: "2",
    title: "Asset Title",
    description: "Lorem ipsum dolor sit amet consectetur. Risus nullam iaculis amet mi orci felis tortor.",
    hash: "0x20de32....",
    isVerified: true,
    image: "",
    date: "Feb 2, 2024",
  },
  {
    id: "3",
    title: "Asset Title",
    description: "Lorem ipsum dolor sit amet consectetur. Risus nullam iaculis amet mi orci felis tortor.",
    hash: "0x20de32....",
    isVerified: true,
    image: "",
    isHighlighted: true,
    date: "Feb 18, 2024",
  },
  {
    id: "4",
    title: "Asset Title",
    description: "Lorem ipsum dolor sit amet consectetur. Risus nullam iaculis amet mi orci felis tortor.",
    hash: "0x20de32....",
    isVerified: true,
    image: "",
    date: "Mar 5, 2024",
  },
  {
    id: "5",
    title: "Asset Title",
    description: "Lorem ipsum dolor sit amet consectetur. Risus nullam iaculis amet mi orci felis tortor.",
    hash: "0x20de32....",
    isVerified: true,
    image: "",
    date: "Mar 27, 2024",
  },
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

export default function Assets() {
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  
  // Filter assets based on search query
  const filteredAssets = ASSETS.filter(asset => 
    asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.hash.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Page header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">My Assets</h1>
        
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors">
          <Plus className="h-4 w-4" />
          Add New Asset
        </button>
      </motion.div>
      
      {/* Filters and search bar */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={cn(
              "p-2 rounded-lg text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
              isFiltersOpen ? "bg-slate-100 dark:bg-slate-800" : "bg-white dark:bg-slate-900",
            )}
          >
            <Filter className="h-5 w-5" />
          </button>
          
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg flex overflow-hidden">
            <button 
              onClick={() => setView("grid")}
              className={cn(
                "p-2",
                view === "grid" 
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
              )}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setView("list")}
              className={cn(
                "p-2",
                view === "list" 
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400"
              )}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Filter options (collapsible) */}
      {isFiltersOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4"
        >
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Status</label>
              <select className="w-40 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm p-2">
                <option>All assets</option>
                <option>Verified only</option>
                <option>Pending verification</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">Sort by</label>
              <select className="w-40 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm p-2">
                <option>Newest first</option>
                <option>Oldest first</option>
                <option>A-Z</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Assets grid/list */}
      {filteredAssets.length > 0 ? (
        <motion.div variants={itemVariants}>
          {view === "grid" ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredAssets.map(asset => (
                <motion.div key={asset.id} variants={itemVariants}>
                  <AssetCard
                    title={asset.title}
                    description={asset.description}
                    hash={asset.hash}
                    isVerified={asset.isVerified}
                    image={asset.image}
                    isHighlighted={asset.isHighlighted}
                    onClick={() => console.log(`Clicked asset ${asset.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <div className="col-span-5 sm:col-span-6 font-medium text-sm text-slate-700 dark:text-slate-300">Asset</div>
                <div className="col-span-3 sm:col-span-2 font-medium text-sm text-slate-700 dark:text-slate-300 hidden sm:block">Created</div>
                <div className="col-span-4 sm:col-span-2 font-medium text-sm text-slate-700 dark:text-slate-300 text-right sm:text-left">Status</div>
                <div className="col-span-3 sm:col-span-2 font-medium text-sm text-slate-700 dark:text-slate-300 text-right">Actions</div>
              </div>
              
              {/* Table rows */}
              {filteredAssets.map((asset, index) => (
                <motion.div 
                  key={asset.id} 
                  variants={itemVariants} 
                  className={cn(
                    "grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors",
                    asset.isHighlighted && "bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50/80 dark:hover:bg-blue-900/20",
                    index === filteredAssets.length - 1 && "border-b-0"
                  )}
                >
                  <div className="col-span-5 sm:col-span-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {asset.image ? (
                        <img src={asset.image} alt={asset.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-slate-400 dark:text-slate-600 text-lg font-light">?</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-slate-900 dark:text-white text-sm truncate">{asset.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{asset.hash}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-3 sm:col-span-2 text-xs text-slate-500 dark:text-slate-400 hidden sm:flex items-center">
                    {asset.date}
                  </div>
                  
                  <div className="col-span-4 sm:col-span-2 flex items-center justify-end sm:justify-start">
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium inline-flex items-center gap-1.5",
                      asset.isVerified 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                      {asset.isVerified ? (
                        <>
                          <Shield className="w-3 h-3" /> 
                          <span>Verified</span>
                        </>
                      ) : (
                        'Pending'
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-500 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">No assets found matching your search.</p>
        </motion.div>
      )}
    </motion.div>
  )
} 