import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./logo";
import { useMagneticHover } from "@/hooks/use-magnetic-hover";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const scrollProgress = useScrollProgress();
  const navRef = useRef<HTMLElement>(null);
  
  // Use IntersectionObserver to detect hero section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px 0px 0px', // Top threshold
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.target.id === 'home' || entry.target.id === 'hero') {
          // If hero is in view, use white background (header--light)
          // If hero is out of view, use blue background (header--dark)
          setIsOverDarkSection(!entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    const heroEl = document.getElementById('home') || document.getElementById('hero');
    if (heroEl) observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  // Motion values for smooth animations
  const navHeight = useMotionValue(64);
  const navOpacity = useMotionValue(1);
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothHeight = useSpring(navHeight, springConfig);
  const smoothOpacity = useSpring(navOpacity, springConfig);
  
  // Transform values for background based on scroll
  const bgBlur = useTransform(
    useMotionValue(isScrolled ? 1 : 0),
    [0, 1],
    ["blur(4px)", "blur(12px)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Update nav height based on scroll
      navHeight.set(scrollY > 100 ? 48 : 56);
      navOpacity.set(scrollY > 50 ? 0.95 : 1);
      
      // Detect active section
      const sections = ['home', 'services', 'about', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navHeight, navOpacity]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  const handleRippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  // Breathing animation variants
  const breathingAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };

  // Hamburger menu animation
  const menuVariants = {
    closed: {
      rotate: 0,
      scale: 1
    },
    open: {
      rotate: 180,
      scale: 0.8,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <>
      <motion.nav 
        ref={navRef}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          isOverDarkSection 
            ? 'bg-[#1E3A5F] text-white shadow-lg' 
            : 'bg-[#1E3A5F] text-white shadow-md border-b border-white/10'
        }`}
        style={{
          height: smoothHeight,
          opacity: smoothOpacity,
          backdropFilter: bgBlur
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        data-testid="navigation"
      >
        <motion.div 
          className={`absolute inset-0 ${isScrolled ? 'nav-background scrolled' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Progress Indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-[#D4AF6A]"
          style={{ width: `${scrollProgress}%`, transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo with morph animation */}
            <motion.div 
              className="flex items-center"
              animate={{ scale: isScrolled ? 0.92 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Logo size={isScrolled ? "small" : "nav"} />
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'services', 'about'].map((section) => (
                <NavItem 
                  key={section}
                  section={section}
                  activeSection={activeSection}
                  onClick={(e) => {
                    handleRippleEffect(e);
                    scrollToSection(section);
                  }}
                  ripples={ripples}
                  isOverDarkSection={isOverDarkSection}
                />
              ))}
              
              <MagneticButton
                onClick={(e) => {
                  handleRippleEffect(e);
                  scrollToSection('contact');
                }}
                className="btn-premium bg-[#D4AF6A] text-black px-6 py-2 rounded-sm hover:bg-[#D4AF6A]/90 transition-all duration-300 font-semibold"
                data-testid="nav-contact"
              >
                Contact Us
              </MagneticButton>
            </div>
            
            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                className="text-white"
                onClick={() => scrollToSection('contact')}
                data-testid="nav-phone-icon"
              >
                <Phone size={24} strokeWidth={2.5} />
              </button>

              <motion.button 
                className="relative z-50 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="mobile-menu-toggle"
                variants={menuVariants}
                initial="closed"
                animate={isMobileMenuOpen ? "open" : "closed"}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="x"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X size={24} strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu size={24} strokeWidth={2.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu with Spring Animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 w-full bg-[#1E3A5F]/95 backdrop-blur-md border-t border-white/20" 
              data-testid="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  },
                  opacity: {
                    duration: 0.2
                  }
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  },
                  opacity: {
                    duration: 0.2
                  }
                }
              }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'services', 'about', 'contact'].map((section, index) => (
                  <motion.button
                    key={section}
                    onClick={(e) => {
                      handleRippleEffect(e);
                      scrollToSection(section);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors relative overflow-hidden ${
                      section === 'contact' 
                        ? 'bg-[#D4AF6A] text-black hover:bg-[#D4AF6A]/90 font-semibold' 
                        : 'text-white/90 hover:text-[#D4AF6A] hover:bg-white/5'
                    }`}
                    data-testid={`mobile-nav-${section}`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      transition: {
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {ripples.map(ripple => (
                      <motion.span
                        key={ripple.id}
                        className="absolute rounded-full bg-white/30"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          width: 10,
                          height: 10,
                          transform: 'translate(-50%, -50%)'
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 20, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    ))}
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    {section === 'contact' && ' Us'}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

// Navigation Item Component with Underline Animation
function NavItem({ 
  section, 
  activeSection, 
  onClick, 
  ripples,
  isOverDarkSection
}: { 
  section: string; 
  activeSection: string; 
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ripples: { id: number; x: number; y: number }[];
  isOverDarkSection: boolean;
}) {
  const isActive = activeSection === section;
  const isDark = true; // Force light text since nav is now always dark blue
  
  return (
    <motion.button
      onClick={onClick}
      className={`relative transition-colors py-2 overflow-hidden ${
        isDark ? 'text-white hover:text-[#D4AF6A]' : 'text-[#2B2E34] hover:text-[#D4AF6A]'
      }`}
      data-testid={`nav-${section}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 15, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      
      <span className="relative z-10">
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </span>
      
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-[#D4AF6A]"
        initial={{ width: 0 }}
        animate={{ width: isActive ? "100%" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.button>
  );
}

// Magnetic Button Component
function MagneticButton({ 
  children, 
  onClick, 
  className = "",
  ...props 
}: { 
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  [key: string]: any;
}) {
  const { ref, position } = useMagneticHover(0.4);
  
  return (
    <motion.button
      ref={ref as any}
      onClick={onClick}
      className={`relative ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}