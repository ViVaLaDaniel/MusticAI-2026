"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  children?: React.ReactNode;
}

const GlowButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-gold text-void-dark hover:bg-gold-light shadow-[0_0_20px_rgba(251,191,36,0.3)]",
      secondary: "bg-void/50 border border-gold/30 text-gold hover:bg-gold/10",
      ghost: "bg-transparent text-slate-400 hover:text-white",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl px-8 py-3 text-base font-semibold transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ring-offset-void",
          variants[variant],
          className
        )}
        {...props}
      >
        {variant === "primary" && (
          <div className="absolute inset-0 rounded-xl bg-gold/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);
GlowButton.displayName = "GlowButton";

export { GlowButton };
