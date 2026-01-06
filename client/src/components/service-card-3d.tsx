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
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth transitions with increased damping for subtler movement
  const springConfig = { damping: 20, stiffness: 150 };
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
    rotateX.set(y * 5);  // Reduced from 10 to 5 degrees
    rotateY.set(x * 5);  // Reduced from 10 to 5 degrees
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);  // Reduced from 1.03 to 1.02 for subtler effect
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
      id={testId}
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
      {/* Subtle hover highlight */}
      <motion.div
        className="absolute inset-0 rounded-md bg-[#1E3A5F]/5"
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main card */}
      <motion.div
        className="relative bg-card rounded-md p-8 border border-border shadow-sm h-full flex flex-col overflow-hidden group"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          boxShadow: isHovered 
            ? "0 10px 20px rgba(0,0,0,0.1), 0 0 60px rgba(0,0,0,0.05)" 
            : "0 2px 4px rgba(0,0,0,0.05)"
        }}
        animate={{
          y: isHovered ? -5 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex items-start space-x-4 flex-1 relative z-10">
          {/* Animated icon container - simplified rotation */}
          <motion.div 
            className="relative"
            animate={{
              rotate: isHovered ? 10 : 0,  // Max 10 degrees rotation instead of 360
              scale: isHovered ? 1.05 : 1  // Subtle scale effect
            }}
            transition={{
              rotate: { duration: 0.2, ease: "easeOut" },  // Faster, smoother transition
              scale: { duration: 0.15 }  // Quick scale transition
            }}
          >
            <motion.div 
              className={`${iconBgColor} p-3 rounded-md relative overflow-hidden`}
              animate={{
                boxShadow: isHovered 
                  ? `0 0 30px ${iconColor}60` 
                  : "0 0 0px transparent"
              }}
            >
              <Icon className={`w-6 h-6 ${iconColor} relative z-10`} strokeWidth={2.5} />
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
            
            {/* Static accent line */}
            <div
              className="h-0.5 rounded-full mb-4 transition-opacity duration-200 bg-[#D4AF6A]/30"
            />
            
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
                  <CheckCircle className={`w-4 h-4 ${checkColor} mr-2 transition-colors duration-150`} strokeWidth={2.5} />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Corner decoration - static */}
        <div
          className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#1E3A5F]/10 blur-xl transition-opacity duration-200"
          style={{
            opacity: isHovered ? 0.5 : 0.3
          }}
        />
      </motion.div>
    </motion.div>
  );
}