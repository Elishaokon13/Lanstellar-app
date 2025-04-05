"use client"

import {
  LayoutDashboard,
  CircleUser,
  FileCheck,
  Settings,
  ChevronLeft,
  Menu,
  X
} from "lucide-react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  // Check dark mode status
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    // Initial check
    checkDarkMode()
    
    // Set up mutation observer to watch for dark mode class changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          checkDarkMode()
        }
      })
    })
    
    observer.observe(document.documentElement, { attributes: true })
    
    return () => observer.disconnect()
  }, [])
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])
  
  // Close mobile menu on window resize if wider than mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen)
  }
  
  // Define gradient styles
  const gradientTextStyle = {
    backgroundImage: 'linear-gradient(to right, #FFFFFF, #8A27BA)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  }
  
  const activeIndicatorStyle = {
    background: 'linear-gradient(to bottom, #7C3AED, #8A27BA)',
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    const isActive = pathname === href

    return (
      <Link
        href={href}
        className={`relative flex items-center px-4 py-3 text-sm transition-all duration-200 ${
          isActive 
            ? "bg-purple-50 dark:bg-[#31305C]/30 text-purple-700 dark:text-purple-400 font-medium" 
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#31305C]/20"
        }`}
      >
        {isActive && (
          <motion.span 
            layoutId="activeIndicator"
            className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={activeIndicatorStyle}
          />
        )}
        <Icon className={`h-5 w-5 mr-3 flex-shrink-0 transition-colors duration-200 ${isActive ? "text-purple-600 dark:text-purple-400" : ""}`} />
        <span className={`transition-opacity duration-300 ${!collapsed ? "opacity-100" : "opacity-0"}`}>
          {children}
        </span>
      </Link>
    )
  }

  // Mobile menu toggle button
  const MobileMenuButton = () => (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-[#24223E] shadow-lg text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/50"
      aria-label="Toggle menu"
    >
      {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  )

  return (
    <>
      <MobileMenuButton />
      
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.nav
        initial={false}
        animate={{ 
          width: collapsed ? 76 : 256,
          x: mobileOpen ? 0 : (window.innerWidth < 1024 ? -300 : 0)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed lg:relative h-screen border-r border-slate-200/80 dark:border-slate-700/30 bg-white/95 dark:bg-[#24223E]/95 backdrop-blur-sm shadow-sm z-40`}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center h-16 px-4 border-b border-slate-200/80 dark:border-slate-700/30">
            <motion.div 
              className="flex items-center"
              animate={{ 
                justifyContent: collapsed ? "center" : "flex-start",
                width: collapsed ? "100%" : "auto"
              }}
            >
              <div className={`flex items-center justify-center ${collapsed ? "mx-auto" : ""}`}>
                <img src="/logo.svg" alt="Logo" width={28} height={28} className="hidden dark:block" />
                <img src="/logo-dark.svg" alt="Logo" width={28} height={28} className="block dark:hidden" />
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span 
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 text-lg font-semibold text-slate-900 dark:text-white"
                    style={isDarkMode ? gradientTextStyle : undefined}
                  >
                    Lanstellar
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            {!collapsed && (
              <button
                onClick={toggleSidebar}
                className="ml-auto p-1.5 rounded-md text-slate-500 hover:text-purple-700 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800/30 transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            {collapsed && (
              <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-7 bg-white dark:bg-[#24223E] border border-slate-200 dark:border-slate-700/50 rounded-full p-1 text-slate-500 hover:text-purple-700 dark:hover:text-purple-400 shadow-sm transition-colors duration-200"
              >
                <ChevronLeft className="h-4 w-4 rotate-180" />
              </button>
            )}
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700/30 scrollbar-track-transparent">
            <div className="space-y-0.5">
              <NavItem href="/dashboard" icon={LayoutDashboard}>
                Dashboard
              </NavItem>
              <NavItem href="/assets" icon={CircleUser}>
                My Assets
              </NavItem>
              <NavItem href="/verify" icon={FileCheck}>
                Verify Assets
              </NavItem>
              <NavItem href="/settings" icon={Settings}>
                Settings
              </NavItem>
            </div>
          </div>

          {/* User profile */}
          {/* <div className="border-t border-slate-200/80 dark:border-slate-700/30 pt-2 pb-4 px-3 mt-auto">
            <motion.div 
              className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#31305C]/30 transition-colors duration-200 cursor-pointer ${collapsed ? "justify-center" : ""}`}
              animate={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start"
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center">
                <CircleUser className="w-4 h-4" />
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 overflow-hidden"
                  >
                    <p className="text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                      User Account
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      user@lanstellar.com
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div> */}
        </div>
      </motion.nav>
    </>
  )
}

