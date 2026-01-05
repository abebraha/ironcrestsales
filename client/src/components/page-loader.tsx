import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ShieldLogo from "./shield-logo";

interface PageLoaderProps {
  isLoading: boolean;
  progress?: number;
  onComplete?: () => void;
}

export default function PageLoader({ isLoading, progress = 0, onComplete }: PageLoaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    if (!isLoading && displayProgress >= 100) {
      setShowExit(true);
      setTimeout(() => {
        onComplete?.();
      }, 800);
    }
  }, [isLoading, displayProgress, onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev >= progress) return progress;
        return Math.min(prev + 2, progress);
      });
    }, 20);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <AnimatePresence>
      {(isLoading || showExit) && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1F3B]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.2,
            filter: "blur(20px)"
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          data-testid="page-loader"
        >
          {/* Simple pattern overlay */}
          <div className="absolute inset-0 pattern-grid opacity-10" />

          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          <div className="relative z-10 text-center">
            {/* Animated Logo */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: [0, -10, 0]
              }}
              transition={{
                scale: { duration: 0.5, type: "spring", stiffness: 200 },
                rotate: { duration: 0.8, ease: "easeOut" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <motion.div
                animate={{
                  filter: [
                    "drop-shadow(0 0 20px hsla(43, 96%, 56%, 0.3))",
                    "drop-shadow(0 0 40px hsla(43, 96%, 56%, 0.6))",
                    "drop-shadow(0 0 20px hsla(43, 96%, 56%, 0.3))",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ShieldLogo size="large" />
              </motion.div>
            </motion.div>

            {/* Company Name with typing effect */}
            <motion.h1
              className="text-4xl font-montserrat font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {"IronCrest Sales".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.05,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Loading text with pulse */}
            <motion.p
              className="text-white/80 mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {displayProgress < 30 ? "Initializing experience..." : 
               displayProgress < 60 ? "Loading resources..." :
               displayProgress < 90 ? "Almost ready..." :
               "Launching..."}
            </motion.p>

            {/* Progress bar container */}
            <div className="w-64 mx-auto">
              <div className="relative h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Progress fill */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#C9A24D] rounded-full"
                  style={{ width: `${displayProgress}%` }}
                  initial={{ width: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Progress percentage */}
              <motion.div
                className="text-center mt-3 text-white/80 font-montserrat font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {displayProgress}%
              </motion.div>
            </div>

            {/* Loading dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}