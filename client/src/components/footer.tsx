import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Linkedin, Twitter, Mail, Send, ChevronRight, Sparkles, Star, Heart, Youtube, Instagram, Github, Facebook, ArrowUp } from "lucide-react";
import ShieldLogo from "./shield-logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

// Particle effect component
const ParticleEffect = ({ x, y }: { x: number; y: number }) => {
  const particles = Array.from({ length: 8 });
  
  return (
    <div className="pointer-events-none absolute" style={{ left: x, top: y }}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [1, 0],
            x: Math.cos((i * Math.PI * 2) / 8) * 30,
            y: Math.sin((i * Math.PI * 2) / 8) * 30,
            opacity: [1, 0]
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// Wave effect component
const WaveEffect = ({ active }: { active: boolean }) => {
  if (!active) return null;
  
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </motion.div>
  );
};

// Social icon component with advanced effects
const SocialIcon = ({ Icon, href, label, delay = 0 }: { Icon: any; href: string; label: string; delay?: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; id: number }[]>([]);
  const iconRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setParticles(prev => [...prev, { x, y, id: Date.now() }]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== Date.now()));
    }, 600);
  };

  return (
    <motion.a
      ref={iconRef}
      href={href}
      className="relative group"
      data-testid={`social-${label.toLowerCase()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative p-3 rounded-full bg-gradient-to-br from-yellow-300/10 to-yellow-500/10 backdrop-blur-sm border border-yellow-300/20"
        animate={{
          rotate: isHovered ? 360 : 0,
          boxShadow: isHovered 
            ? "0 0 30px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3)" 
            : "0 0 10px rgba(251, 191, 36, 0.2)"
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Icon className="w-5 h-5 text-yellow-300" />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/0 via-yellow-300/30 to-yellow-300/0"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        
        {/* Sparkle effect */}
        {isHovered && (
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 text-yellow-300" />
          </motion.div>
        )}
      </motion.div>
      
      {/* Particles on hover */}
      {particles.map(particle => (
        <ParticleEffect key={particle.id} x={particle.x} y={particle.y} />
      ))}
      
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-secondary/90 backdrop-blur-md rounded text-xs text-white whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

// Footer link with wave effect
const FooterLink = ({ href, children, delay = 0 }: { href: string; children: React.ReactNode; delay?: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <a
        href={href}
        className="relative inline-block group py-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid={`footer-link-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="relative z-10 text-secondary-foreground/90 group-hover:text-yellow-300 transition-colors duration-300">
          {children}
        </span>
        
        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        
        {/* Wave effect */}
        <AnimatePresence>
          <WaveEffect active={isHovered} />
        </AnimatePresence>
        
        {/* Chevron indicator */}
        <motion.span
          className="inline-block ml-1 text-yellow-300 opacity-0 group-hover:opacity-100"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-3 h-3 inline" />
        </motion.span>
      </a>
    </motion.li>
  );
};

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer ref={footerRef} className="relative bg-secondary text-secondary-foreground py-16 overflow-hidden" data-testid="footer">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 opacity-50" />
      
      {/* Animated mesh pattern */}
      <div className="absolute inset-0 pattern-grid opacity-10" />
      
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-10 right-10 text-yellow-300/10"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        <Star className="w-20 h-20" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-20 text-yellow-300/10"
        animate={{ 
          y: [0, 20, 0],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      >
        <Sparkles className="w-16 h-16" />
      </motion.div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company info with floating logo */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <ShieldLogo size="small" />
              </motion.div>
              <span className="text-2xl font-montserrat font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                IronCrest Sales
              </span>
            </motion.div>
            
            <p className="text-secondary-foreground/90 mb-6 max-w-md leading-relaxed">
              Expert outsourced sales solutions that help businesses build scalable revenue departments through strategic talent and proven systems.
            </p>
            
            {/* Newsletter signup with animations */}
            <motion.div className="mb-8">
              <h4 className="text-sm font-semibold mb-3 text-yellow-300">Subscribe to Our Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <motion.div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary-foreground/10 border-yellow-300/30 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 transition-all"
                    data-testid="newsletter-input"
                  />
                  <AnimatePresence>
                    {email && (
                      <motion.div
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                      >
                        <Mail className="w-4 h-4 text-yellow-300" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-secondary"
                    data-testid="newsletter-submit"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </form>
              <AnimatePresence>
                {isSubscribed && (
                  <motion.p
                    className="text-green-400 text-sm mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ✨ Successfully subscribed!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Social icons with advanced effects */}
            <div className="flex space-x-4">
              <SocialIcon Icon={Linkedin} href="#" label="LinkedIn" delay={0.1} />
              <SocialIcon Icon={Twitter} href="#" label="Twitter" delay={0.2} />
              <SocialIcon Icon={Youtube} href="#" label="YouTube" delay={0.3} />
              <SocialIcon Icon={Instagram} href="#" label="Instagram" delay={0.4} />
              <SocialIcon Icon={Github} href="#" label="GitHub" delay={0.5} />
              <SocialIcon Icon={Facebook} href="#" label="Facebook" delay={0.6} />
            </div>
          </motion.div>
          
          {/* Services links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-montserrat font-semibold text-lg mb-6 text-yellow-300 relative">
              Services
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "50%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#" delay={0.1}>Sales Professionals</FooterLink>
              <FooterLink href="#" delay={0.2}>System Development</FooterLink>
              <FooterLink href="#" delay={0.3}>Strategic Hiring</FooterLink>
              <FooterLink href="#" delay={0.4}>Revenue Optimization</FooterLink>
            </ul>
          </motion.div>
          
          {/* Company links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-montserrat font-semibold text-lg mb-6 text-yellow-300 relative">
              Company
              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "50%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </h4>
            <ul className="space-y-3">
              <FooterLink href="#" delay={0.1}>About Us</FooterLink>
              <FooterLink href="#" delay={0.2}>Case Studies</FooterLink>
              <FooterLink href="#" delay={0.3}>Careers</FooterLink>
              <FooterLink href="#" delay={0.4}>Contact</FooterLink>
              <FooterLink href="#" delay={0.5}>Blog</FooterLink>
              <FooterLink href="#" delay={0.6}>Partners</FooterLink>
            </ul>
          </motion.div>
        </div>
        
        {/* Animated divider */}
        <motion.div
          className="relative mt-12 mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />
          <motion.div
            className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Copyright with pulse animation */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.p 
            className="text-secondary-foreground/80 mb-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            data-testid="footer-copyright"
          >
            Made with <Heart className="w-4 h-4 inline text-red-400 animate-pulse" /> by IronCrest Sales
          </motion.p>
          <p className="text-secondary-foreground/80 text-sm">
            &copy; 2024 IronCrest Sales. All rights reserved. | 
            <a href="#" className="hover:text-yellow-300 transition-colors mx-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-yellow-300 transition-colors mx-1">Terms of Service</a>
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-secondary rounded-full shadow-lg z-50 group"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-testid="scroll-to-top"
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
            <motion.div
              className="absolute inset-0 rounded-full bg-yellow-300/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}