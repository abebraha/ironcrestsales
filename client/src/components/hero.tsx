import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import ShieldLogo from "./shield-logo";
import { AnimatedBackground } from "./animated-background";
import { TextReveal, GlowText } from "./text-reveal";

export default function Hero() {
  const { scrollY } = useScroll();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.7]);
  
  // Mouse position tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.querySelector('#home')?.getBoundingClientRect();
      if (rect) {
        mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
        mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }
    })
  };

  return (
    <section id="home" className="relative overflow-hidden min-h-screen">
      {/* Animated background layers */}
      <AnimatedBackground />
      
      {/* Scrim overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/60 z-[5]" />
      
      {/* Main hero content with parallax */}
      <motion.div 
        className="relative z-10 pt-24 pb-20"
        style={{ y: y1, scale, opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Enhanced Shield Logo Animation */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
              style={{
                x: mouseXSpring,
                y: mouseYSpring,
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
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ShieldLogo size="large" />
              </motion.div>
            </motion.div>
            
            {/* Animated Title with Text Reveal */}
            <h1 
              className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-6 leading-tight"
              data-testid="hero-title"
            >
              <TextReveal delay={0.2}>
                Scale Your Sales Department
              </TextReveal>
              <br />
              <GlowText className="text-gold-accent">
                <TextReveal delay={0.5} type="letter">
                  Without the Risk
                </TextReveal>
              </GlowText>
            </h1>
            
            {/* Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p 
                className="text-xl md:text-2xl text-white/85 mb-8 max-w-3xl mx-auto leading-relaxed"
                data-testid="hero-subtitle"
              >
                <TextReveal delay={1} stagger={0.01} type="word">
                  Expert outsourced sales professionals who integrate with your team to build scalable revenue systems and strategic hiring processes.
                </TextReveal>
              </p>
            </motion.div>
            
            {/* Interactive CTA Buttons with Glow Effects */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.button 
                onClick={scrollToContact}
                className="relative bg-gold-accent text-primary px-8 py-4 rounded-lg font-montserrat font-bold text-lg overflow-hidden group"
                data-testid="button-schedule-consultation"
                onMouseEnter={() => setIsHovered('schedule')}
                onMouseLeave={() => setIsHovered(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: isHovered === 'schedule'
                    ? [
                        "0 0 20px hsla(43, 96%, 56%, 0.5)",
                        "0 0 40px hsla(43, 96%, 56%, 0.7)",
                        "0 0 20px hsla(43, 96%, 56%, 0.5)",
                      ]
                    : "0 0 20px hsla(43, 96%, 56%, 0.3)",
                }}
                transition={{
                  boxShadow: {
                    duration: 1,
                    repeat: isHovered === 'schedule' ? Infinity : 0,
                    ease: "easeInOut",
                  }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered === 'schedule' ? "100%" : "-100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10">Schedule Consultation</span>
              </motion.button>
              
              <motion.button 
                onClick={scrollToServices}
                className="relative border-2 border-white text-white px-8 py-4 rounded-lg font-montserrat font-semibold text-lg overflow-hidden group backdrop-blur-sm"
                data-testid="button-learn-more"
                onMouseEnter={() => setIsHovered('learn')}
                onMouseLeave={() => setIsHovered(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  borderColor: isHovered === 'learn' 
                    ? "hsla(43, 96%, 56%, 0.8)" 
                    : "rgba(255, 255, 255, 1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isHovered === 'learn' ? 1 : 0,
                    opacity: isHovered === 'learn' ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <motion.span 
                  className="relative z-10"
                  animate={{
                    color: isHovered === 'learn' ? "hsl(240, 59%, 20%)" : "rgb(255, 255, 255)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Learn More
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced Stats Section with Scroll Animations */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10"
        style={{ y: y2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: "15+", label: "Years of Experience", testId: "stat-professionals" },
            { value: "Multiple", label: "Industries Served", testId: "stat-revenue" },
            { value: "Proven", label: "Track Record", testId: "stat-retention" }
          ].map((stat, i) => (
            <motion.div
              key={stat.testId}
              className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 overflow-hidden group"
              data-testid={stat.testId}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={statsVariants}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold-accent/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.div 
                className="relative text-3xl font-montserrat font-bold text-gold-accent mb-2"
                animate={{
                  textShadow: [
                    "0 0 10px hsla(43, 96%, 56%, 0.3)",
                    "0 0 20px hsla(43, 96%, 56%, 0.5)",
                    "0 0 10px hsla(43, 96%, 56%, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                {stat.value}
              </motion.div>
              <div className="relative text-white/85">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}