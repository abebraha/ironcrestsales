import { motion, useScroll, useTransform } from "framer-motion";

interface ParticleProps {
  index: number;
}

const Particle = ({ index }: ParticleProps) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 15 + Math.random() * 20;
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/20 rounded-full"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear",
      }}
    />
  );
};

export const AnimatedBackground = ({ variant = 'default' }: { variant?: 'default' | 'services' | 'about' | 'contact' }) => {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  
  return (
    <>
      {/* Modern blue background */}
      <div className="absolute inset-0 bg-[#1E3A5F]" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pattern-grid opacity-10" />
      
      {/* Floating particles */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y2 }}
      >
        {[...Array(15)].map((_, i) => (
          <Particle key={`particle-${i}`} index={i} />
        ))}
      </motion.div>
      
      {/* Grid pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </>
  );
};
