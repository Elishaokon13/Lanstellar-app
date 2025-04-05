import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssetCardProps {
  title: string;
  description: string;
  hash: string;
  isVerified?: boolean;
  image?: string;
  isHighlighted?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function AssetCard({
  title,
  description,
  hash,
  isVerified = false,
  image,
  isHighlighted = false,
  onClick,
  className,
}: AssetCardProps) {
  return (
    <div 
      className={cn(
        "flex flex-col rounded-lg border transition-all duration-200",
        "bg-white dark:bg-slate-900",
        "hover:shadow-md",
        isHighlighted ? "border-blue-500" : "border-slate-200 dark:border-slate-800",
        className
      )}
    >
      <div className="w-full aspect-square relative overflow-hidden rounded-t-lg">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-slate-400 dark:text-slate-600 text-4xl font-light">?</span>
          </div>
        )}
        {isHighlighted && (
          <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded-t-lg" />
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 flex-1">{description}</p>
        <div className="text-xs font-mono text-slate-500 dark:text-slate-500 mt-2 truncate">
          {hash}
        </div>
      </div>
      
      <div className="flex items-center justify-between p-3 pt-0">
        <div className={cn(
          "text-xs px-2 py-0.5 rounded-full font-medium",
          isVerified 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
        )}>
          {isVerified ? "Verified Asset" : "Pending Verification"}
        </div>
        
        <button 
          onClick={onClick} 
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 