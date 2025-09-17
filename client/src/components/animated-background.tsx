import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

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
      className="absolute w-1 h-1 bg-gold-accent/30 rounded-full"
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

interface FloatingShapeProps {
  index: number;
}

const FloatingShape = ({ index }: FloatingShapeProps) => {
  const shapes = ['polygon', 'circle', 'hexagon'];
  const shape = shapes[index % shapes.length];
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 20 + Math.random() * 30;
  
  const getShapeClass = () => {
    switch(shape) {
      case 'polygon':
        return 'w-8 h-8 bg-white/5 clip-path-polygon';
      case 'circle':
        return 'w-6 h-6 bg-gold-accent/10 rounded-full';
      case 'hexagon':
        return 'w-10 h-10 bg-blue-300/10 clip-path-hexagon';
      default:
        return 'w-6 h-6 bg-white/10 rounded';
    }
  };
  
  return (
    <motion.div
      className={`absolute ${getShapeClass()}`}
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
      animate={{
        y: [-30, 30, -30],
        x: [-20, 20, -20],
        rotate: [0, 360],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "easeInOut",
      }}
    />
  );
};

export const AnimatedBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const mouseX = useTransform(() => (mousePosition.x - window.innerWidth / 2) / 50);
  const mouseY = useTransform(() => (mousePosition.y - window.innerHeight / 2) / 50);
  
  return (
    <>
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, hsl(240, 59%, 20%) 0%, hsl(240, 59%, 35%) 100%)',
            'linear-gradient(135deg, hsl(240, 59%, 25%) 0%, hsl(240, 59%, 40%) 100%)',
            'linear-gradient(135deg, hsl(240, 59%, 20%) 0%, hsl(240, 59%, 35%) 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Parallax layers */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y1, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20" />
      </motion.div>
      
      <motion.div 
        className="absolute inset-0"
        style={{ y: y2 }}
      >
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <Particle key={`particle-${i}`} index={i} />
        ))}
        
        {/* Floating shapes */}
        {[...Array(8)].map((_, i) => (
          <FloatingShape key={`shape-${i}`} index={i} />
        ))}
      </motion.div>
      
      {/* Mouse follow gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <div 
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(43, 96%, 56%, 0.1) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            filter: 'blur(40px)',
          }}
        />
      </motion.div>
      
      {/* Animated mesh gradient overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              animate={{
                strokeDasharray: ["0, 160", "80, 80", "0, 160"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </>
  );
};