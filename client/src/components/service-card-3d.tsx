import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { CheckCircle } from "lucide-react";

interface ServiceCard3DProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  iconBgColor: string;
  iconColor: string;
  checkColor: string;
  index: number;
  testId: string;
}

export default function ServiceCard3D({
  icon: Icon,
  title,
  description,
  features,
  iconBgColor,
  iconColor,
  checkColor,
  index,
  testId
}: ServiceCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth transitions
  const springConfig = { damping: 10, stiffness: 100 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);
  
  // Gradient position based on mouse
  const gradientX = useTransform(mouseX, [-1, 1], [0, 100]);
  const gradientY = useTransform(mouseY, [-1, 1], [0, 100]);
  
  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(y * 10);
    rotateY.set(x * 10);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.03);
    
    // Generate sparkle particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);
    
    // Clear particles after animation
    setTimeout(() => setParticles([]), 2000);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.23, 1, 0.32, 1]
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={testId}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(
            600px circle at ${gradientX.get()}% ${gradientY.get()}%,
            ${iconColor}40,
            transparent 40%
          )`
        }}
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glowing effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(
                circle at ${gradientX.get()}% ${gradientY.get()}%,
                ${iconColor}20 0%,
                transparent 50%
              )`,
              filter: "blur(40px)"
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Main card */}
      <motion.div
        className="relative bg-card rounded-xl p-8 border border-border shadow-lg h-full flex flex-col overflow-hidden group"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          boxShadow: isHovered 
            ? "0 20px 40px rgba(0,0,0,0.2), 0 0 120px rgba(0,0,0,0.1)" 
            : "0 4px 6px rgba(0,0,0,0.1)"
        }}
        animate={{
          y: isHovered ? -5 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Sparkle particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
              initial={{ 
                x: `${particle.x}%`, 
                y: `${particle.y}%`,
                scale: 0,
                opacity: 1
              }}
              animate={{
                x: `${particle.x + (Math.random() - 0.5) * 50}%`,
                y: `${particle.y - 30}%`,
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut"
              }}
              style={{
                boxShadow: "0 0 6px rgba(255,255,255,0.8)"
              }}
            />
          ))}
        </AnimatePresence>
        
        <div className="flex items-start space-x-4 flex-1 relative z-10">
          {/* Animated icon container */}
          <motion.div 
            className="relative"
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{
              rotate: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 0.3 }
            }}
          >
            <motion.div 
              className={`${iconBgColor} p-3 rounded-lg relative overflow-hidden`}
              animate={{
                boxShadow: isHovered 
                  ? `0 0 30px ${iconColor}60` 
                  : "0 0 0px transparent"
              }}
            >
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{ backgroundColor: iconColor }}
                animate={{
                  scale: isHovered ? [1, 1.5, 1] : 1,
                  opacity: isHovered ? [0.3, 0, 0.3] : 0
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <Icon className={`w-6 h-6 ${iconColor} relative z-10`} />
            </motion.div>
          </motion.div>
          
          <div className="flex-1 flex flex-col">
            <motion.h3 
              className="text-2xl font-montserrat font-bold text-foreground mb-3"
              animate={{
                letterSpacing: isHovered ? "0.02em" : "0em"
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
            
            <p className="text-muted-foreground mb-4 flex-1">
              {description}
            </p>
            
            {/* Animated progress bar decoration */}
            <motion.div
              className="h-1 bg-muted rounded-full overflow-hidden mb-4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${iconColor}, ${checkColor})`
                }}
                animate={{
                  x: isHovered ? ["0%", "100%", "0%"] : "0%"
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
            
            <ul className="space-y-2 text-sm text-muted-foreground">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.15 + i * 0.1 + 0.3
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    animate={{
                      rotate: isHovered ? 360 : 0,
                      scale: isHovered ? [1, 1.2, 1] : 1
                    }}
                    transition={{
                      rotate: { duration: 0.5, delay: i * 0.1 },
                      scale: { duration: 0.3 }
                    }}
                  >
                    <CheckCircle className={`w-4 h-4 ${checkColor} mr-2`} />
                  </motion.div>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Corner decoration */}
        <motion.div
          className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full"
          style={{
            background: `radial-gradient(circle, ${iconColor}20 0%, transparent 70%)`,
            filter: "blur(20px)"
          }}
          animate={{
            scale: isHovered ? [1, 1.3, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}