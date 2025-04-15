"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, Key, Bell, Shield, User, Globe, CreditCard, HelpCircle, ArrowRight, ExternalLink, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

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

// Setting section type
type SettingsSectionProps = {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

// Settings section component
const SettingsSection = ({ title, icon, children }: SettingsSectionProps) => (
  <motion.div 
    variants={itemVariants} 
    className="bg-white dark:bg-slate-800/30 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/30 overflow-hidden"
  >
    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700/30 flex items-center gap-3">
      <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
    </div>
    <div className="divide-y divide-slate-200 dark:divide-slate-700/30">
      {children}
    </div>
  </motion.div>
)

// Setting item type
type SettingItemProps = {
  title: string
  description: string
  action?: React.ReactNode
  onClick?: () => void
}

// Setting item component
const SettingItem = ({ title, description, action, onClick }: SettingItemProps) => {
  // Determine if the action is a toggle button to add appropriate touch area
  const isToggle = React.isValidElement(action) && action.type === Toggle;
  
  return (
    <div 
      className={`px-6 py-4 flex flex-wrap sm:flex-nowrap justify-between items-center gap-x-4 ${onClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/10' : ''}`}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0 mb-2 sm:mb-0">
        <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 pr-1">{description}</p>
      </div>
      <div className={`flex-shrink-0 ml-auto ${isToggle ? 'p-1 -m-1' : ''}`}>
        {action}
      </div>
    </div>
  );
};

// Toggle component
type ToggleProps = {
  enabled: boolean
  onChange: () => void
}

const Toggle = ({ enabled, onChange }: ToggleProps) => (
  <button 
    onClick={(e) => {
      e.stopPropagation();
      onChange();
    }}
    className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 touch-manipulation ${
      enabled ? 'bg-purple-600' : 'bg-slate-200 dark:bg-slate-700'
    }`}
    role="switch"
    aria-checked={enabled}
  >
    <span className="sr-only">{enabled ? 'Enabled' : 'Disabled'}</span>
    <span 
      className={`${
        enabled ? 'translate-x-6' : 'translate-x-1'
      } inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out`} 
    />
  </button>
)

export default function Settings() {
  // States for various toggles
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [autoLockTimeout, setAutoLockTimeout] = useState("15")
  const { theme, setTheme } = useTheme()
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 container mx-auto px-4"
    >
      {/* Page header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Settings</h1>
      </motion.div>
      
      {/* Settings grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Account section */}
        <SettingsSection title="Account" icon={<User className="h-5 w-5" />}>
          <SettingItem 
            title="Profile Information" 
            description="Update your account details and profile information"
            action={<ChevronRight className="h-5 w-5 text-slate-400" />}
            onClick={() => console.log('Navigate to profile')}
          />
          <SettingItem 
            title="Connected Wallets" 
            description="Manage your connected blockchain wallets"
            action={<ChevronRight className="h-5 w-5 text-slate-400" />}
            onClick={() => console.log('Navigate to wallets')}
          />
          <SettingItem 
            title="Email Address" 
            description="john.doe@example.com"
            action={<span className="text-sm text-slate-500 dark:text-slate-400">Verified</span>}
          />
        </SettingsSection>
        
        {/* Security section */}
        <SettingsSection title="Security" icon={<Shield className="h-5 w-5" />}>
          <SettingItem 
            title="Change Password" 
            description="Update your password regularly to keep your account secure"
            action={<ChevronRight className="h-5 w-5 text-slate-400" />}
            onClick={() => console.log('Navigate to change password')}
          />
          <SettingItem 
            title="Two-Factor Authentication" 
            description="Add an extra layer of security to your account"
            action={<Toggle enabled={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} />}
          />
          <SettingItem 
            title="Recovery Keys" 
            description="View and manage your emergency recovery keys"
            action={<ChevronRight className="h-5 w-5 text-slate-400" />}
            onClick={() => console.log('Navigate to recovery keys')}
          />
        </SettingsSection>
        
        {/* Notifications section */}
        <SettingsSection title="Notifications" icon={<Bell className="h-5 w-5" />}>
          <SettingItem 
            title="Email Notifications" 
            description="Receive important updates and alerts via email"
            action={<Toggle enabled={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />}
          />
          <SettingItem 
            title="Push Notifications" 
            description="Get real-time alerts on your device for important events"
            action={<Toggle enabled={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />}
          />
        </SettingsSection>
        
        {/* Appearance section */}
        <SettingsSection title="Appearance" icon={theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}>
          <SettingItem 
            title="Theme" 
            description="Choose between light, dark, or system theme"
            action={
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            }
          />
          <SettingItem 
            title="Auto-Lock Timeout" 
            description="Automatically lock your account after inactivity"
            action={
              <select 
                value={autoLockTimeout}
                onChange={(e) => setAutoLockTimeout(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
              >
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="never">Never</option>
              </select>
            }
          />
        </SettingsSection>
        
        {/* Billing section */}
        <SettingsSection title="Billing & Subscription" icon={<CreditCard className="h-5 w-5" />}>
          <SettingItem 
            title="Current Plan" 
            description="Premium Plan - $19.99/month"
            action={
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active
              </span>
            }
          />
          <SettingItem 
            title="Payment Methods" 
            description="Manage your payment methods and invoices"
            action={<ChevronRight className="h-5 w-5 text-slate-400" />}
            onClick={() => console.log('Navigate to payment methods')}
          />
          <SettingItem 
            title="Billing History" 
            description="View your past transactions and receipts"
            action={<ChevronRight className="h-5 w-5 text-slate-400" />}
            onClick={() => console.log('Navigate to billing history')}
          />
        </SettingsSection>
        
        {/* Support section */}
        <SettingsSection title="Help & Support" icon={<HelpCircle className="h-5 w-5" />}>
          <SettingItem 
            title="Knowledge Base" 
            description="Browse articles and guides about using Lanstellar"
            action={<ExternalLink className="h-5 w-5 text-slate-400" />}
            onClick={() => window.open('https://help.lanstellar.com', '_blank')}
          />
          <SettingItem 
            title="Contact Support" 
            description="Get help from our support team"
            action={<ChevronRight className="h-5 w-5 text-slate-400" />}
            onClick={() => console.log('Navigate to support')}
          />
          <SettingItem 
            title="Terms & Privacy Policy" 
            description="Review our terms of service and privacy policy"
            action={<ExternalLink className="h-5 w-5 text-slate-400" />}
            onClick={() => window.open('https://lanstellar.com/terms', '_blank')}
          />
        </SettingsSection>
      </div>
      
      {/* Logout button - full width across all columns */}
      <motion.div variants={itemVariants} className="pt-4 pb-10">
        <button 
          className="w-md text-left px-6 py-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-medium rounded-xl border border-red-100 dark:border-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
          onClick={() => console.log('Logout')}
        >
          Logout
        </button>
      </motion.div>
    </motion.div>
  )
} 
