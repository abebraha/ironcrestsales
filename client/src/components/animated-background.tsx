import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";

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

// Animated Blob Shape Component
const AnimatedBlob = ({ index }: { index: number }) => {
  const randomDelay = Math.random() * 10;
  const randomDuration = 20 + Math.random() * 20;
  const colors = [
    'hsla(220, 55%, 25%, 0.15)',
    'hsla(46, 70%, 52%, 0.06)',
    'hsla(220, 50%, 20%, 0.15)',
    'hsla(220, 55%, 30%, 0.1)'
  ];
  
  return (
    <motion.div
      className="absolute rounded-full filter blur-3xl"
      style={{
        background: colors[index % colors.length],
        width: `${300 + index * 50}px`,
        height: `${300 + index * 50}px`,
        left: `${index * 25}%`,
        top: `${index * 20}%`,
      }}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -100, 50, 0],
        scale: [1, 1.2, 0.9, 1],
        rotate: [0, 90, 180, 360],
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

// Aurora Borealis Effect Component - Subtle navy/gold version
const AuroraEffect = () => {
  return (
    <motion.div className="absolute inset-0 opacity-20 pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, transparent, hsla(220, 55%, 35%, 0.3), transparent)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: ['-100%', '200%'],
          y: ['-50%', '50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(-45deg, transparent, hsla(46, 70%, 52%, 0.15), hsla(220, 50%, 40%, 0.2), transparent)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: ['100%', '-200%'],
          y: ['50%', '-50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, hsla(220, 55%, 30%, 0.2), hsla(46, 65%, 52%, 0.1), transparent)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: ['-50%', '150%'],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
};

// Wave Pattern Component
const WavePattern = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wave" width="200" height="200" patternUnits="userSpaceOnUse">
          <motion.path
            d="M0,100 Q50,50 100,100 T200,100"
            fill="none"
            stroke="hsla(46, 70%, 52%, 0.2)"
            strokeWidth="2"
            animate={{
              d: [
                "M0,100 Q50,50 100,100 T200,100",
                "M0,100 Q50,150 100,100 T200,100",
                "M0,100 Q50,50 100,100 T200,100",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wave)" />
    </svg>
  );
};

// Dot Matrix Pattern
const DotMatrix = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
          <motion.circle
            cx="15"
            cy="15"
            r="2"
            fill="hsla(220, 55%, 40%, 0.3)"
            animate={{
              r: [2, 4, 2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
};

// Circuit Board Pattern
const CircuitPattern = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
          <motion.g
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path d="M10,10 L40,10 L40,40 M60,10 L90,10 L90,40 L60,40 L60,60 L90,60 M10,60 L40,60 L40,90 L10,90" 
                  fill="none" stroke="hsla(220, 55%, 45%, 0.3)" strokeWidth="1"/>
            <circle cx="10" cy="10" r="3" fill="hsla(46, 70%, 52%, 0.4)"/>
            <circle cx="40" cy="40" r="3" fill="hsla(46, 70%, 52%, 0.4)"/>
            <circle cx="90" cy="60" r="3" fill="hsla(46, 70%, 52%, 0.4)"/>
          </motion.g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
};

// Hexagon Pattern
const HexagonPattern = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons" width="60" height="52" patternUnits="userSpaceOnUse">
          <motion.polygon
            points="30,0 45,8.66 45,26 30,34.64 15,26 15,8.66"
            fill="none"
            stroke="hsla(220, 55%, 30%, 0.3)"
            strokeWidth="1"
            animate={{
              strokeDasharray: ["0, 150", "150, 0", "0, 150"],
              rotate: [0, 60, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  );
};

export const AnimatedBackground = ({ variant = 'default' }: { variant?: 'default' | 'services' | 'about' | 'contact' }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const y3 = useTransform(scrollY, [0, 500], [0, -30]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set((e.clientX - window.innerWidth / 2) / 50);
      mouseY.set((e.clientY - window.innerHeight / 2) / 50);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  // Select pattern based on variant
  const renderPattern = () => {
    switch(variant) {
      case 'services':
        return (
          <>
            <DotMatrix />
            <CircuitPattern />
          </>
        );
      case 'about':
        return (
          <>
            <WavePattern />
            <HexagonPattern />
          </>
        );
      case 'contact':
        return (
          <>
            <HexagonPattern />
            <DotMatrix />
          </>
        );
      default:
        return (
          <>
            <WavePattern />
            <CircuitPattern />
          </>
        );
    }
  };
  
  // Gradient variations based on section - all using consistent navy palette
  const gradientAnimation = useMemo(() => {
    const gradients = {
      default: [
        'linear-gradient(135deg, hsl(220, 55%, 12%) 0%, hsl(220, 50%, 18%) 50%, hsl(220, 55%, 14%) 100%)',
        'linear-gradient(135deg, hsl(220, 55%, 14%) 0%, hsl(220, 50%, 20%) 50%, hsl(220, 55%, 16%) 100%)',
        'linear-gradient(135deg, hsl(220, 55%, 12%) 0%, hsl(220, 50%, 18%) 50%, hsl(220, 55%, 14%) 100%)',
      ],
      services: [
        'linear-gradient(45deg, hsl(220, 55%, 10%) 0%, hsl(220, 50%, 15%) 50%, hsl(220, 55%, 12%) 100%)',
        'linear-gradient(45deg, hsl(220, 55%, 12%) 0%, hsl(220, 50%, 17%) 50%, hsl(220, 55%, 14%) 100%)',
        'linear-gradient(45deg, hsl(220, 55%, 10%) 0%, hsl(220, 50%, 15%) 50%, hsl(220, 55%, 12%) 100%)',
      ],
      about: [
        'linear-gradient(90deg, hsl(220, 55%, 12%) 0%, hsl(220, 50%, 16%) 50%, hsl(220, 55%, 14%) 100%)',
        'linear-gradient(90deg, hsl(220, 55%, 14%) 0%, hsl(220, 50%, 18%) 50%, hsl(220, 55%, 16%) 100%)',
        'linear-gradient(90deg, hsl(220, 55%, 12%) 0%, hsl(220, 50%, 16%) 50%, hsl(220, 55%, 14%) 100%)',
      ],
      contact: [
        'linear-gradient(180deg, hsl(220, 55%, 12%) 0%, hsl(220, 50%, 16%) 50%, hsl(220, 55%, 14%) 100%)',
        'linear-gradient(180deg, hsl(220, 55%, 14%) 0%, hsl(220, 50%, 18%) 50%, hsl(220, 55%, 16%) 100%)',
        'linear-gradient(180deg, hsl(220, 55%, 12%) 0%, hsl(220, 50%, 16%) 50%, hsl(220, 55%, 14%) 100%)',
      ],
    };
    return gradients[variant] || gradients.default;
  }, [variant]);
  
  return (
    <>
      {/* Multi-layer animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: gradientAnimation,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Mesh gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${50 + springX.get()}% ${50 + springY.get()}%, hsla(46, 70%, 52%, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, hsla(220, 55%, 35%, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 20% 80%, hsla(220, 50%, 30%, 0.15) 0%, transparent 50%)`,
        }}
      />
      
      {/* Aurora effect for hero section */}
      {variant === 'default' && <AuroraEffect />}
      
      {/* Animated blob shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <AnimatedBlob key={`blob-${i}`} index={i} />
        ))}
      </div>
      
      {/* Noise/grain texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
        animate={{
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 8,
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
            background: 'radial-gradient(circle, hsla(46, 70%, 52%, 0.06) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            filter: 'blur(40px)',
          }}
        />
      </motion.div>
      
      {/* Pattern overlays based on variant */}
      {renderPattern()}
      
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
      
      {/* Glassmorphism layer */}
      <motion.div
        className="absolute inset-0 backdrop-blur-[1px] pointer-events-none"
        animate={{
          backdropFilter: [
            'blur(1px)',
            'blur(2px)',
            'blur(1px)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};