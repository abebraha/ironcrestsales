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
  return (
    <>
      {children}
    </>
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
    <div className={className}>
      {children}
    </div>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0
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
        scale: 0.95
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
  return (
    <div className={className}>
      {children}
    </div>
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
        scale: isActive ? 1.05 : 1
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