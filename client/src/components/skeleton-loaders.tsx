import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Shimmer animation component
export function Shimmer({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(
        "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent",
        className
      )}
      animate={{
        translateX: ["-100%", "200%"],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Base skeleton component
export function Skeleton({ 
  className, 
  shimmer = true,
  pulse = true 
}: { 
  className?: string; 
  shimmer?: boolean;
  pulse?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "relative bg-gradient-to-r from-muted/50 to-muted/30 rounded-md overflow-hidden",
        className
      )}
      animate={pulse ? {
        opacity: [0.5, 0.7, 0.5],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {shimmer && <Shimmer />}
    </motion.div>
  );
}

// Card skeleton loader
export function CardSkeleton() {
  return (
    <motion.div
      className="bg-card rounded-xl border border-border p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-testid="card-skeleton"
    >
      {/* Header with icon */}
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      
      {/* Content lines */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-2 pt-2">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
    </motion.div>
  );
}

// Service card skeleton
export function ServiceCardSkeleton() {
  return (
    <motion.div
      className="bg-card rounded-xl border border-border p-8 space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
      data-testid="service-card-skeleton"
    >
      {/* Icon placeholder */}
      <div className="flex justify-center">
        <Skeleton className="w-16 h-16 rounded-full" shimmer />
      </div>
      
      {/* Title */}
      <Skeleton className="h-6 w-3/4 mx-auto" />
      
      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      
      {/* Feature list */}
      <div className="space-y-2 pt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-3 flex-1" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Text block skeleton
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      data-testid="text-skeleton"
    >
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: `${100 - (i * 10 + Math.random() * 20)}%` }}
        />
      ))}
    </motion.div>
  );
}

// Navigation skeleton
export function NavSkeleton() {
  return (
    <motion.div
      className="fixed w-full top-0 z-50 bg-primary/10 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      data-testid="nav-skeleton"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Skeleton className="w-32 h-8" />
          
          {/* Nav items */}
          <div className="hidden md:flex items-center space-x-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-20 h-6" />
            ))}
            <Skeleton className="w-28 h-10 rounded-lg" />
          </div>
          
          {/* Mobile menu */}
          <Skeleton className="w-8 h-8 md:hidden rounded" />
        </div>
      </div>
    </motion.div>
  );
}

// Image skeleton with progressive loading
export function ImageSkeleton({ 
  className,
  aspectRatio = "1/1" 
}: { 
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <motion.div
      className={cn(
        "relative bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50 overflow-hidden rounded-lg",
        className
      )}
      style={{ aspectRatio }}
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      data-testid="image-skeleton"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ["-100%", "100%"],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Image icon placeholder */}
      <motion.svg
        className="absolute inset-0 w-1/3 h-1/3 m-auto text-muted-foreground/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </motion.svg>
    </motion.div>
  );
}

// Button skeleton
export function ButtonSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn(
        "h-10 w-32 rounded-lg",
        className
      )}
      shimmer
    />
  );
}

// Form skeleton
export function FormSkeleton() {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      data-testid="form-skeleton"
    >
      {/* Form fields */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
      
      {/* Textarea */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>
      
      {/* Submit button */}
      <Skeleton className="h-12 w-full rounded-lg" shimmer />
    </motion.div>
  );
}

// Stats skeleton
export function StatsSkeleton() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-testid="stats-skeleton"
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Skeleton className="h-12 w-24 mx-auto mb-2" shimmer />
          <Skeleton className="h-4 w-32 mx-auto" />
        </motion.div>
      ))}
    </motion.div>
  );
}

// Timeline skeleton
export function TimelineSkeleton() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-testid="timeline-skeleton"
    >
      {/* Center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-muted/30" />
      
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`flex items-center mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <div className="flex-1">
            <div className={`bg-card p-6 rounded-xl border border-border ${i % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
              <Skeleton className="h-6 w-20 mb-2" />
              <Skeleton className="h-5 w-32 mb-2" />
              <TextSkeleton lines={2} />
            </div>
          </div>
          
          {/* Center dot */}
          <Skeleton className="w-6 h-6 rounded-full mx-4" shimmer={false} />
          
          <div className="flex-1" />
        </motion.div>
      ))}
    </motion.div>
  );
}