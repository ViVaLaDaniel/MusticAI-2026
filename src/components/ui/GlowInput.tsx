"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const GlowInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-300 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-xl bg-midnight/50 border border-white/10 px-4 py-2 text-sm text-white",
              "placeholder:text-slate-500",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold/50",
              "transition-all duration-300",
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
GlowInput.displayName = "GlowInput";

export { GlowInput };
