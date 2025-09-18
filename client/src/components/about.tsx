import { motion, useScroll, useTransform, useInView, useAnimation, useMotionValue, useSpring } from "framer-motion";
import { Award, Handshake, TrendingUp, Quote, Users, Target, Rocket, Shield, ChevronRight, Star, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBackground } from "./animated-background";

// Counter component for animated numbers
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  
  return (
    <div ref={ref} className="text-4xl font-montserrat font-bold">
      {prefix}{count}{suffix}
    </div>
  );
}

// Typewriter effect component
function TypewriterText({ text, delay = 50 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, delay);
      
      return () => clearInterval(timer);
    }
  }, [isInView, text, delay]);
  
  return (
    <span ref={ref}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-5 bg-primary ml-0.5"
      />
    </span>
  );
}

// Text reveal with blur effect
const TextReveal = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const floatingY = useMotionValue(0);
  const floatingX = useMotionValue(0);
  const springY = useSpring(floatingY, { stiffness: 100, damping: 10 });
  const springX = useSpring(floatingX, { stiffness: 100, damping: 10 });
  
  // Floating animation for decorative elements
  useEffect(() => {
    const interval = setInterval(() => {
      floatingY.set(Math.sin(Date.now() / 1000) * 10);
      floatingX.set(Math.cos(Date.now() / 1500) * 5);
    }, 50);
    return () => clearInterval(interval);
  }, [floatingY, floatingX]);
  
  const teamMembers = [
    { name: "John Anderson", role: "Founder & CEO", expertise: "20+ years in B2B Sales", image: "JA" },
    { name: "Sarah Mitchell", role: "VP of Strategy", expertise: "15+ years Sales Operations", image: "SM" },
    { name: "David Chen", role: "Head of Training", expertise: "18+ years Sales Coaching", image: "DC" },
    { name: "Lisa Thompson", role: "Director of Analytics", expertise: "12+ years Data Strategy", image: "LT" }
  ];
  
  const milestones = [
    { year: "2018", title: "Founded", description: "IronCrest Sales established with a vision to transform B2B sales" },
    { year: "2019", title: "First 10 Clients", description: "Achieved success with initial enterprise partnerships" },
    { year: "2021", title: "Expansion", description: "Grew team and services to meet increasing demand" },
    { year: "2023", title: "Industry Leader", description: "Recognized as top sales consultancy in the region" },
    { year: "2025", title: "Innovation", description: "Launched AI-powered sales intelligence platform" }
  ];
  
  const valueProps = [
    { icon: Target, title: "Precision Focus", description: "Laser-targeted strategies for your specific market", color: "text-primary" },
    { icon: Rocket, title: "Rapid Growth", description: "Accelerate your sales pipeline velocity by 3x", color: "text-accent" },
    { icon: Shield, title: "Proven Methods", description: "Battle-tested frameworks that deliver results", color: "text-gold-accent" },
    { icon: Users, title: "Team Excellence", description: "Transform your team into top performers", color: "text-secondary" }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden gradient-mesh gpu-accelerated" ref={containerRef}>
      {/* Animated background with about variant */}
      <AnimatedBackground variant="about" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section with Typewriter */}
        <TextReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-montserrat font-bold mb-6">
            <HighlightText>Transforming</HighlightText> Sales Teams Into
          </h2>
          <div className="text-4xl md:text-6xl font-montserrat font-bold text-gold-accent mb-8">
            <TypewriterText text="Revenue Machines" />
          </div>
        </TextReveal>
        
        {/* Value Propositions with animated cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              viewport={{ once: true }}
              className="bg-white dark:bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 transform-gpu perspective-1000"
              data-testid={`value-prop-${index}`}
            >
              <motion.div
                className={`${prop.color} mb-4`}
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <prop.icon className="w-10 h-10" />
              </motion.div>
              <h3 className="font-montserrat font-semibold text-lg mb-2">{prop.title}</h3>
              <p className="text-foreground/70 text-sm">{prop.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Timeline Section */}
        <div className="mb-20">
          <TextReveal>
            <h3 className="text-3xl font-montserrat font-bold text-center mb-12">
              Our Journey to <HighlightText>Excellence</HighlightText>
            </h3>
          </TextReveal>
          
          <div className="relative">
            {/* Animated connecting line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-accent to-gold-accent"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              viewport={{ once: true }}
            />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                data-testid={`milestone-${index}`}
              >
                <div className="flex-1">
                  <motion.div 
                    className={`bg-white dark:bg-card p-6 rounded-xl border border-border ${index % 2 === 0 ? 'mr-8 text-right' : 'ml-8'}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className={`text-2xl font-montserrat font-bold text-primary mb-2`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      {milestone.year}
                    </motion.div>
                    <h4 className="font-montserrat font-semibold text-xl mb-2">{milestone.title}</h4>
                    <p className="text-foreground/70">{milestone.description}</p>
                  </motion.div>
                </div>
                
                {/* Center dot */}
                <motion.div
                  className="relative z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-primary rounded-full border-4 border-background" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <TextReveal>
              <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-primary mb-6" data-testid="about-title">
                Built by <HighlightText>Sales Leaders</HighlightText>, <br />For Sales Leaders
              </h2>
            </TextReveal>
            
            <TextReveal>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                IronCrest Sales was founded by veteran sales executives who understand the challenges of building and scaling high-performance sales organizations. Our team combines decades of experience across industries to deliver results that matter.
              </p>
            </TextReveal>
            
            <div className="space-y-6">
              {[
                { icon: Award, title: "Proven Expertise", desc: "Average 15+ years of sales leadership experience across our core team", color: "bg-primary/10", iconColor: "text-primary" },
                { icon: Handshake, title: "Partnership Approach", desc: "We work as an extension of your team, not just another vendor", color: "bg-accent/10", iconColor: "text-accent" },
                { icon: TrendingUp, title: "Results-Driven", desc: "Our success is measured by your revenue growth and team development", color: "bg-yellow-500/10", iconColor: "text-gold-accent" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  data-testid={`${item.title.toLowerCase().replace(' ', '-')}-point`}
                >
                  <motion.div 
                    className={`${item.color} p-2 rounded-lg mt-1`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </motion.div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-lg text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            style={{ y: parallaxY }}
            data-testid="about-stats"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center" data-testid="stat-experience">
                <div className="text-primary mb-2">
                  <AnimatedCounter value={150} suffix="+" />
                </div>
                <div className="text-muted-foreground text-sm">Successful Projects</div>
              </div>
              <div className="text-center" data-testid="stat-companies">
                <div className="text-accent mb-2">
                  <AnimatedCounter value={87} suffix="%" />
                </div>
                <div className="text-muted-foreground text-sm">Revenue Growth Average</div>
              </div>
              <div className="text-center" data-testid="stat-industries">
                <div className="text-gold-accent mb-2">
                  <AnimatedCounter value={500} prefix="$" suffix="M+" />
                </div>
                <div className="text-muted-foreground text-sm">Pipeline Generated</div>
              </div>
              <div className="text-center" data-testid="stat-success">
                <div className="text-secondary mb-2">
                  <AnimatedCounter value={98} suffix="%" />
                </div>
                <div className="text-muted-foreground text-sm">Client Satisfaction</div>
              </div>
            </div>
            
            <motion.div 
              className="mt-8 p-6 bg-white dark:bg-card rounded-xl border border-border"
              whileHover={{ scale: 1.02 }}
              data-testid="testimonial"
            >
              <div className="flex items-center space-x-4 mb-4">
                <motion.div 
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Quote className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <div className="font-montserrat font-semibold">Mike Rodriguez</div>
                  <div className="text-sm text-muted-foreground">VP Sales, Manufacturing Solutions Inc.</div>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "IronCrest Sales helped us build a systematic approach to our sales process. Their coaching and strategic guidance transformed how our team engages with prospects and closes deals."
              </p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Team Section with Flip Cards */}
        <div className="mt-20">
          <TextReveal className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Meet the <HighlightText>Experts</HighlightText>
            </h3>
            <p className="text-xl text-muted-foreground">Leaders who drive your success</p>
          </TextReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="relative h-80 transform-gpu preserve-3d"
                initial={{ opacity: 0, rotateY: 180 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ rotateY: 180 }}
                style={{ transformStyle: "preserve-3d" }}
                data-testid={`team-member-${index}`}
              >
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-primary to-accent p-6 flex flex-col items-center justify-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-montserrat font-bold mb-4">
                    {member.image}
                  </div>
                  <h4 className="font-montserrat font-semibold text-xl mb-2">{member.name}</h4>
                  <p className="text-sm opacity-90">{member.role}</p>
                </div>
                
                {/* Back of card */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-accent to-primary p-6 flex flex-col items-center justify-center text-white"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <Award className="w-12 h-12 mb-4" />
                  <h4 className="font-montserrat font-semibold text-xl mb-2">{member.name}</h4>
                  <p className="text-sm text-center opacity-90">{member.expertise}</p>
                  <motion.button
                    className="mt-4 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Connect <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-24 fill-muted">
          <motion.path
            d="M0,64 C480,150 960,-20 1440,64 L1440,120 L0,120 Z"
            initial={{ d: "M0,64 C480,64 960,64 1440,64 L1440,120 L0,120 Z" }}
            animate={{ d: "M0,64 C480,150 960,-20 1440,64 L1440,120 L0,120 Z" }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      </div>
    </section>
  );
}