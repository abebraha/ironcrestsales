import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Linkedin, Heart, ArrowUp } from "lucide-react";
import ShieldLogo from "./shield-logo";

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
        className="relative p-3 rounded-full bg-white/10 border border-white/20 transition-all duration-200 group-hover:border-[#C9A24D]/40 group-hover:bg-white/15"
      >
        <Icon className="w-5 h-5 text-white transition-opacity duration-200 group-hover:text-[#C9A24D]" />
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
        className="relative inline-block group py-1 text-white/80 hover:text-[#C9A24D] transition-colors duration-200"
        data-testid={`footer-link-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="relative z-10">
          {children}
        </span>
        
        {/* Simple underline on hover */}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A24D] group-hover:w-full transition-all duration-200" />
      </a>
    </motion.li>
  );
};

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
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
    <footer ref={footerRef} className="relative bg-[#0B1F3B] text-white py-20 overflow-hidden border-t border-[#C9A24D]/10" data-testid="footer">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pattern-grid opacity-5" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company info */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-8">
              <ShieldLogo size="small" />
              <span className="text-2xl font-montserrat font-bold text-white tracking-tight">
                IronCrest Sales
              </span>
            </div>
            
            <p className="text-white/70 mb-8 max-w-md leading-relaxed text-lg">
              Expert outsourced sales solutions that help businesses build scalable revenue departments through strategic talent and proven systems.
            </p>
            
            <div className="flex space-x-4">
              <SocialIcon Icon={Linkedin} href="https://www.linkedin.com/company/ironcrestsales" label="LinkedIn" delay={0.1} />
            </div>
          </motion.div>
          
          {/* Services links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-montserrat font-bold text-white mb-8 relative inline-block">
              Expertise
              <div className="absolute -bottom-2 left-0 h-1 w-6 bg-[#C9A24D] rounded-full" />
            </h4>
            <ul className="space-y-4">
              <FooterLink href="#" delay={0.1}>Sales Professionals</FooterLink>
              <FooterLink href="#" delay={0.2}>System Development</FooterLink>
              <FooterLink href="#" delay={0.3}>Strategic Hiring</FooterLink>
              <FooterLink href="#" delay={0.4}>Revenue Optimization</FooterLink>
            </ul>
          </motion.div>
          
          {/* Company links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-montserrat font-bold text-white mb-8 relative inline-block">
              Company
              <div className="absolute -bottom-2 left-0 h-1 w-6 bg-[#C9A24D] rounded-full" />
            </h4>
            <ul className="space-y-4">
              <FooterLink href="#" delay={0.1}>About Our Mission</FooterLink>
              <FooterLink href="#" delay={0.2}>Success Stories</FooterLink>
              <FooterLink href="#" delay={0.3}>Join the Team</FooterLink>
              <FooterLink href="#" delay={0.4}>Contact Us</FooterLink>
            </ul>
          </motion.div>
        </div>
        
        {/* Simple divider */}
        <div className="border-t border-white/10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/50 text-sm font-medium" data-testid="footer-copyright">
              &copy; 2025 IronCrest Sales. All rights reserved.
            </p>
            
            <div className="flex space-x-8 text-sm text-white/50">
              <a href="#" className="hover:text-[#C9A24D] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#C9A24D] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#C9A24D] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-[#C9A24D] text-white rounded-full shadow-2xl z-50 hover:bg-[#C9A24D]/90 transition-all duration-300 border border-white/20"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 20 }}
            data-testid="scroll-to-top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}