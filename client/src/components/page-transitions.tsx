import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
  mode?: "fade" | "slide" | "scale" | "blur" | "rotate";
  duration?: number;
}

// Page transition wrapper component
export function PageTransition({ 
  children, 
  mode = "fade",
  duration = 0.5 
}: PageTransitionProps) {
  const [location] = useLocation();
  
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slide: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.2 }
    },
    blur: {
      initial: { opacity: 0, filter: "blur(10px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(10px)" }
    },
    rotate: {
      initial: { opacity: 0, rotate: -10, scale: 0.9 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
      exit: { opacity: 0, rotate: 10, scale: 0.9 }
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={variants[mode].initial}
        animate={variants[mode].animate}
        exit={variants[mode].exit}
        transition={{
          duration,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Section transition component for scroll-triggered animations
export function SectionTransition({
  children,
  className = "",
  delay = 0,
  threshold = 0.1
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)" 
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      viewport={{ once: true, amount: threshold }}
    >
      {children}
    </motion.div>
  );
}

// Stagger children animation wrapper
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = ""
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        staggerChildren: staggerDelay
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
export function StaggerItem({
  children,
  className = "",
  index = 0
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

// Parallax scroll effect
export function ParallaxSection({
  children,
  offset = 50,
  className = ""
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <motion.div
      className={className}
      style={{
        transform: `translateY(${scrollY * 0.5}px)`
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

// Exit animation wrapper
export function ExitAnimation({
  children,
  onExit,
  duration = 0.3
}: {
  children: ReactNode;
  onExit?: () => void;
  duration?: number;
}) {
  return (
    <motion.div
      exit={{
        opacity: 0,
        scale: 0.95,
        filter: "blur(5px)"
      }}
      transition={{
        duration,
        ease: "easeIn"
      }}
      onAnimationComplete={() => onExit?.()}
    >
      {children}
    </motion.div>
  );
}

// Content reveal animation with multiple effects
export function RevealContent({
  children,
  direction = "up",
  cascade = false,
  className = ""
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  cascade?: boolean;
  className?: string;
}) {
  const directionVariants = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 }
  };
  
  const initial = {
    opacity: 0,
    ...directionVariants[direction],
    filter: "blur(4px)",
    scale: 0.95
  };
  
  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    scale: 1
  };
  
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: cascade ? 0.1 : 0
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// Morphing transition between states
export function MorphTransition({
  children,
  isActive,
  activeClass = "",
  inactiveClass = "",
  className = ""
}: {
  children: ReactNode;
  isActive: boolean;
  activeClass?: string;
  inactiveClass?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`${className} ${isActive ? activeClass : inactiveClass}`}
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.05 : 1,
        filter: isActive ? "brightness(1.1)" : "brightness(1)"
      }}
      transition={{
        layout: { duration: 0.4, type: "spring", stiffness: 300 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}

// Smooth scroll fade effect
export function ScrollFade({
  children,
  className = "",
  fadeStart = 100,
  fadeEnd = 300
}: {
  children: ReactNode;
  className?: string;
  fadeStart?: number;
  fadeEnd?: number;
}) {
  const [opacity, setOpacity] = useState(1);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY <= fadeStart) {
        setOpacity(1);
      } else if (scrollY >= fadeEnd) {
        setOpacity(0);
      } else {
        const fadeRange = fadeEnd - fadeStart;
        const fadeProgress = (scrollY - fadeStart) / fadeRange;
        setOpacity(1 - fadeProgress);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fadeStart, fadeEnd]);
  
  return (
    <motion.div
      className={className}
      animate={{ opacity }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}