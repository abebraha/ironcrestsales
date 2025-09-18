import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Linkedin, Twitter, Mail, Send, Heart, Youtube, Instagram, Github, Facebook, ArrowUp } from "lucide-react";
import ShieldLogo from "./shield-logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

// Social icon component with subtle professional effects
const SocialIcon = ({ Icon, href, label, delay = 0 }: { Icon: any; href: string; label: string; delay?: number }) => {
  return (
    <motion.a
      href={href}
      className="relative group"
      data-testid={`social-${label.toLowerCase()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="relative p-3 rounded-full bg-gradient-to-br from-yellow-300/10 to-yellow-500/10 backdrop-blur-sm border border-yellow-300/20 transition-all duration-200 group-hover:border-yellow-300/40 group-hover:bg-yellow-300/20"
      >
        <Icon className="w-5 h-5 text-yellow-300 transition-opacity duration-200 group-hover:opacity-90" />
      </div>
    </motion.a>
  );
};

// Footer link with simple hover effect
const FooterLink = ({ href, children, delay = 0 }: { href: string; children: React.ReactNode; delay?: number }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <a
        href={href}
        className="relative inline-block group py-1 text-secondary-foreground/90 hover:text-yellow-300 transition-colors duration-200"
        data-testid={`footer-link-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="relative z-10">
          {children}
        </span>
        
        {/* Simple underline on hover */}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all duration-200" />
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
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20 opacity-50" />
      
      {/* Static mesh pattern */}
      <div className="absolute inset-0 pattern-grid opacity-10" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company info with floating logo */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <ShieldLogo size="small" />
              </motion.div>
              <span className="text-2xl font-montserrat font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                IronCrest Sales
              </span>
            </div>
            
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
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-secondary transition-colors duration-200"
                  data-testid="newsletter-submit"
                >
                  <Send className="w-4 h-4" />
                </Button>
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
        
        {/* Simple divider */}
        <motion.div
          className="mt-12 mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />
        </motion.div>
        
        {/* Copyright with pulse animation */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <p className="text-secondary-foreground/80 mb-2" data-testid="footer-copyright">
            Made with <Heart className="w-4 h-4 inline text-red-400" /> by IronCrest Sales
          </p>
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
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-yellow-300 to-yellow-500 text-secondary rounded-full shadow-lg z-50 hover:opacity-90 hover:scale-105 transition-all duration-200"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            data-testid="scroll-to-top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}