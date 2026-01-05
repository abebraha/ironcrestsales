import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SiLinkedin } from "react-icons/si";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
    <div ref={ref} className="text-4xl font-montserrat font-bold text-[#0B1F3B]">
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

// Highlight text with gold underline
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
        className="absolute bottom-0 left-0 h-1 bg-[#C9A24D]"
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
  
  const teamMembers = [
    { name: "Abe Braha", role: "Co-Founder", image: "AB", linkedin: "https://www.linkedin.com/in/abe-braha/" },
    { name: "Shalom Babad", role: "Co-Founder", image: "SB", linkedin: "https://www.linkedin.com/in/shalom-babad/" }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Light warm background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 pattern-dots opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 mb-20">
          <div className="max-w-2xl">
             <span className="text-[#C9A24D] font-montserrat font-bold tracking-widest uppercase text-sm mb-4 block">Our Team</span>
             <h3 className="text-3xl md:text-5xl font-montserrat font-bold mb-6 text-[#0B1F3B]">
               Driven by Sales <HighlightText>Excellence</HighlightText>
             </h3>
             <p className="text-lg text-[#2B2E34]/70 leading-relaxed">
               IronCrest Sales was founded on the principle that sales shouldn't be a black box. We bring transparency, systems, and world-class talent to every organization we partner with.
             </p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-[#F2F4F7] p-8 rounded-2xl border border-[#0B1F3B]/5 text-center">
                <AnimatedCounter value={10} suffix="+" />
                <p className="text-[#2B2E34]/60 font-semibold uppercase text-xs tracking-widest mt-2">Combined Exp</p>
             </div>
             <div className="bg-[#0B1F3B] p-8 rounded-2xl text-white text-center">
                <AnimatedCounter value={50} suffix="M+" prefix="$" />
                <p className="text-white/60 font-semibold uppercase text-xs tracking-widest mt-2">Revenue Managed</p>
             </div>
          </div>
        </div>

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
                className="rounded-xl bg-white p-8 flex flex-col items-center justify-center text-[#2B2E34] h-96 border border-[#0B1F3B]/5 shadow-sm"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(11,31,59,0.1)",
                  borderColor: "rgba(11,31,59,0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-28 h-28 bg-[#0B1F3B]/5 rounded-full flex items-center justify-center text-3xl font-montserrat font-extrabold mb-6 text-[#0B1F3B] border-2 border-[#C9A24D]/20">
                  {member.image}
                </div>
                <h4 className="font-montserrat font-bold text-2xl mb-2 text-[#0B1F3B]">{member.name}</h4>
                <p className="text-base font-medium text-[#C9A24D] mb-6 tracking-wide uppercase">{member.role}</p>
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-6 py-2.5 bg-[#0B1F3B] text-white rounded-lg hover:bg-[#0B1F3B]/90 transition-all flex items-center gap-2 font-bold shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`linkedin-${member.name.toLowerCase().replace(' ', '-')}`}
                >
                  <SiLinkedin className="w-5 h-5" /> LinkedIn
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
