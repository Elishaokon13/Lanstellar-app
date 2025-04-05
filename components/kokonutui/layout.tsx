"use client"

import React, { useState, useMemo, useEffect } from "react"
import Sidebar from "./sidebar"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, Sun, Moon, Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
}

// Define breadcrumb mapping
type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Set initial dark mode on mount
  useEffect(() => {
    // Check if dark mode is enabled in localStorage or user preferences
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ||
      localStorage.getItem('theme') === 'dark';

    if (isDark) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    }
  }, [])

  // Generate breadcrumbs based on the current path
  const breadcrumbs = useMemo(() => {
    const items: BreadcrumbItem[] = [
      { label: "Lanstellar", href: "/" }
    ]

    if (pathname === "/dashboard") {
      items.push({ label: "Dashboard" })
    } else if (pathname === "/assets") {
      items.push({ label: "My Assets" })
    } else if (pathname === "/verify") {
      items.push({ label: "Verify Assets" })
    } else if (pathname === "/settings") {
      items.push({ label: "Settings" })
    } else if (pathname.startsWith("/assets/")) {
      items.push({ label: "My Assets", href: "/assets" })
      items.push({ label: "Asset Details" })
    } else if (pathname.startsWith("/verify/")) {
      items.push({ label: "Verify Assets", href: "/verify" })
      items.push({ label: "Verification Process" })
    }

    return items
  }, [pathname])

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setIsDarkMode(!isDarkMode)
  }

  // Toggle notifications panel
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  // Define gradient text style
  const gradientTextStyle = {
    backgroundImage: 'linear-gradient(to right, #FFFFFF, #8A27BA)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  }

  return (
    <div className="flex h-screen dark:bg-[#24223E] bg-slate-50 transition-colors duration-300">
      {/* Purple gradient blob in the background (only in dark mode) */}
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      )}

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700/30 bg-white/80 dark:bg-[#24223E]/80 backdrop-blur-sm z-10">
          <div className="flex items-center">
            {/* Breadcrumbs */}
            <nav className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate">
              {breadcrumbs.map((item, index) => (
                <div key={item.label} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 text-slate-500 dark:text-slate-400 mx-1" />}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className="text-slate-900 dark:text-white"
                      style={index === breadcrumbs.length - 1 && isDarkMode ? gradientTextStyle : undefined}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile title - simplified version for small screens */}
            <h1
              className="text-lg font-semibold text-slate-900 dark:text-white sm:hidden"
              style={isDarkMode ? gradientTextStyle : undefined}
            >
              {breadcrumbs[breadcrumbs.length - 1]?.label}
            </h1>


          </div>

          <div className="flex items-center space-x-3">
            {/* Search bar */}
            <div className={`relative transition-all duration-300 max-w-md ml-8 hidden md:block ${isSearchFocused ? "w-64 md:w-80" : "w-40 md:w-64"}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/30 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-600"></span>
                </span>
              </button>

              {/* Notifications dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white dark:bg-[#2A294A] border border-slate-200 dark:border-slate-700/50 z-50"
                  >
                    <div className="p-3 border-b border-slate-200 dark:border-slate-700/50">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="p-3 border-b border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          <p className="text-sm font-medium text-slate-900 dark:text-white">Asset verification complete</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Asset #{i} has been verified successfully</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Just now</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center">
                      <button className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center">
              <span className="text-xs font-medium">UA</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

