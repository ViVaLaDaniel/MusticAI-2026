"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const GlowTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-300 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <textarea
            className={cn(
              "flex w-full rounded-xl bg-midnight/50 border border-white/10 px-4 py-3 text-sm text-white",
              "placeholder:text-slate-500 min-h-[120px]",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold/50",
              "transition-all duration-300 resize-none",
              "hover:border-gold/30",
              className
            )}
            ref={ref}
            {...props}
          />
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-sm" />
        </div>
      </div>
    );
  }
);
GlowTextarea.displayName = "GlowTextarea";

export { GlowTextarea };
