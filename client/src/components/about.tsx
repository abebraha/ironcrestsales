import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SiLinkedin } from "react-icons/si";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBackground } from "./animated-background";

// Counter component for animated numbers - simplified to always work
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(value); // Always show the correct value
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    // Only animate if we haven't already and we're in view
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      // Start animation from 0
      let current = 0;
      setCount(0);
      
      const duration = 800;
      const steps = 40;
      const stepValue = value / steps;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value); // Ensure we always end at the exact value
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      // Fallback: ensure value is shown after animation time
      const fallback = setTimeout(() => {
        setCount(value);
      }, duration + 200);
      
      return () => {
        clearInterval(timer);
        clearTimeout(fallback);
      };
    } else if (!isInView && !hasAnimated) {
      // If not in view yet and hasn't animated, show the actual value
      setCount(value);
    }
  }, [isInView, value, hasAnimated]);
  
  return (
    <div ref={ref} className="text-4xl font-montserrat font-bold">
      {prefix}{count}{suffix}
    </div>
  );
}


// Text reveal with blur effect
const TextReveal = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Highlight text animation
const HighlightText = ({ children }: { children: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  
  return (
    <motion.span
      ref={ref}
      className="relative inline-block"
    >
      {children}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-gold-accent/30 to-primary/30 -z-10 rounded-md"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />
    </motion.span>
  );
};

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [20, -20]); // Reduced parallax movement
  
  const teamMembers = [
    { name: "Abe Braha", role: "Co-Founder", image: "AB", linkedin: "https://www.linkedin.com/in/abe-braha/" },
    { name: "Shalom Babad", role: "Co-Founder", image: "SB", linkedin: "https://www.linkedin.com/in/shalom-babad/" }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden gpu-accelerated" ref={containerRef}>
      {/* Consistent navy background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,55%,12%)] via-[hsl(220,50%,14%)] to-[hsl(220,55%,12%)]" />
      {/* Animated background with about variant */}
      <AnimatedBackground variant="about" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Team Section with Flip Cards */}
        <div>
          <TextReveal className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-white">
              Meet the <HighlightText>Team</HighlightText>
            </h3>
          </TextReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                data-testid={`team-member-${index}`}
              >
                <motion.div
                  className="rounded-xl bg-gradient-to-br from-primary to-accent p-6 flex flex-col items-center justify-center text-white h-80"
                  whileHover={{ 
                    y: -2,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-montserrat font-bold mb-4">
                    {member.image}
                  </div>
                  <h4 className="font-montserrat font-semibold text-xl mb-2">{member.name}</h4>
                  <p className="text-sm opacity-90 mb-2">{member.role}</p>
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={`linkedin-${member.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <SiLinkedin className="w-4 h-4" /> LinkedIn
                  </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
}