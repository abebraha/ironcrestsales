import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "primary" | "accent" | "gold" | "white";
}

// Classic circular spinner with brand colors
export function CircularSpinner({ size = "md", className, color = "primary" }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };
  
  const colorClasses = {
    primary: "text-primary",
    accent: "text-accent",
    gold: "text-gold-accent",
    white: "text-white"
  };

  return (
    <motion.div
      className={cn(
        "relative",
        sizeClasses[size],
        className
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
      data-testid="circular-spinner"
    >
      <motion.svg
        className={cn("absolute inset-0", colorClasses[color])}
        viewBox="0 0 24 24"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <motion.path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          animate={{
            strokeDasharray: ["1 200", "100 200", "100 200"],
            strokeDashoffset: [0, -15, -125]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.svg>
    </motion.div>
  );
}

// Shield-themed spinner
export function ShieldSpinner({ size = "md", className }: SpinnerProps) {
  const sizeValues = {
    sm: 20,
    md: 40,
    lg: 60,
    xl: 80
  };

  const svgSize = sizeValues[size];

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ width: svgSize, height: svgSize }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="shield-spinner"
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Shield shape */}
        <motion.path
          d="M50 10 L80 25 L80 60 L50 85 L20 60 L20 25 Z"
          fill="none"
          stroke="url(#shieldGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43, 96%, 56%)" />
            <stop offset="50%" stopColor="hsl(240, 59%, 20%)" />
            <stop offset="100%" stopColor="hsl(43, 96%, 56%)" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      {/* Center pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold-accent rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}

// Dots spinner
export function DotsSpinner({ size = "md", className, color = "primary" }: SpinnerProps) {
  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-3.5 h-3.5",
    xl: "w-5 h-5"
  };

  const colorClasses = {
    primary: "bg-primary",
    accent: "bg-accent",
    gold: "bg-gold-accent",
    white: "bg-white"
  };

  return (
    <motion.div
      className={cn("flex space-x-2", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="dots-spinner"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "rounded-full",
            dotSizes[size],
            colorClasses[color]
          )}
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
}

// Pulse rings spinner
export function PulseSpinner({ size = "md", className, color = "gold" }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const colorClasses = {
    primary: "bg-primary",
    accent: "bg-accent",
    gold: "bg-gold-accent",
    white: "bg-white"
  };

  return (
    <motion.div
      className={cn(
        "relative",
        sizeClasses[size],
        className
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      data-testid="pulse-spinner"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute inset-0 rounded-full opacity-75",
            colorClasses[color]
          )}
          animate={{
            scale: [1, 2.5],
            opacity: [0.7, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
          }}
        />
      ))}
      <div className={cn(
        "absolute inset-0 rounded-full",
        colorClasses[color]
      )} />
    </motion.div>
  );
}

// Bar wave spinner
export function WaveSpinner({ size = "md", className, color = "primary" }: SpinnerProps) {
  const barHeights = {
    sm: "h-4",
    md: "h-8",
    lg: "h-12",
    xl: "h-16"
  };

  const colorClasses = {
    primary: "bg-primary",
    accent: "bg-accent",
    gold: "bg-gold-accent",
    white: "bg-white"
  };

  return (
    <motion.div
      className={cn("flex items-center space-x-1", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="wave-spinner"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "w-1 rounded-full",
            barHeights[size],
            colorClasses[color]
          )}
          animate={{
            scaleY: [0.4, 1, 0.4],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
}

// DNA helix spinner
export function HelixSpinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  return (
    <motion.div
      className={cn(
        "relative",
        sizeClasses[size],
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="helix-spinner"
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.circle
              key={i}
              cx="50"
              cy="20"
              r="6"
              fill="url(#helixGradient)"
              transform={`rotate(${angle} 50 50)`}
              animate={{
                r: [6, 10, 6],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.g>
        <defs>
          <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(240, 59%, 20%)" />
            <stop offset="50%" stopColor="hsl(43, 96%, 56%)" />
            <stop offset="100%" stopColor="hsl(240, 59%, 20%)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// Loading overlay with spinner
export function LoadingOverlay({ 
  isLoading, 
  text = "Loading...",
  spinner = "circular",
  fullScreen = false 
}: {
  isLoading: boolean;
  text?: string;
  spinner?: "circular" | "shield" | "dots" | "pulse" | "wave" | "helix";
  fullScreen?: boolean;
}) {
  const SpinnerComponent = {
    circular: CircularSpinner,
    shield: ShieldSpinner,
    dots: DotsSpinner,
    pulse: PulseSpinner,
    wave: WaveSpinner,
    helix: HelixSpinner
  }[spinner];

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50",
        fullScreen ? "fixed inset-0" : "absolute inset-0 rounded-lg"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      style={{ pointerEvents: isLoading ? "auto" : "none" }}
      data-testid="loading-overlay"
    >
      <SpinnerComponent size="lg" />
      {text && (
        <motion.p
          className="mt-4 text-muted-foreground font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}