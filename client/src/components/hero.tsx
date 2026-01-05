import { motion, useScroll, useTransform } from "framer-motion";
import ShieldLogo from "./shield-logo";
import { TextReveal, GlowText } from "./text-reveal";

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Simplified parallax effects (max 40px)
  const y1 = useTransform(scrollY, [0, 500], [0, -40]);
  const y2 = useTransform(scrollY, [0, 500], [0, -30]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.98]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.85]);
  
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
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      }
    })
  };

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Light background for the hero area */}
      <div className="absolute inset-0 bg-white" />
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pattern-grid opacity-5" />

      {/* Main hero content with parallax */}
      <motion.div 
        className="relative z-10 pt-20 pb-12 w-full"
        style={{ y: y1, scale, opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Simplified Shield Logo Animation */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className="filter drop-shadow-md">
                <ShieldLogo size="large" />
              </div>
            </motion.div>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-extrabold text-[#0B1F3B] mb-6 leading-tight tracking-tight"
              data-testid="hero-title"
            >
              <TextReveal delay={0.2}>
                Your brand. Your offer.
              </TextReveal>
              <br />
              <span className="text-[#C9A24D]">
                <TextReveal delay={0.4}>
                  Our sales engine.
                </TextReveal>
              </span>
            </h1>
            
            {/* Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p 
                className="text-lg md:text-xl text-[#2B2E34]/80 mb-10 max-w-2xl mx-auto leading-relaxed"
                data-testid="hero-subtitle"
              >
                <TextReveal delay={0.8}>
                  We build your sales engine hands-on, then scale it with proven reps we train and manage directly to ensure continued success.
                </TextReveal>
              </p>
            </motion.div>
            
            {/* Simplified CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.button 
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-[#C9A24D] text-white px-8 py-4 rounded-lg font-montserrat font-bold text-lg shadow-md transition-all duration-200 hover:bg-[#C9A24D]/90 hover:shadow-lg"
                data-testid="button-apply-today"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >Schedule a Consultation</motion.button>
              
              <motion.button 
                onClick={scrollToServices}
                className="w-full sm:w-auto border-2 border-[#0B1F3B] text-[#0B1F3B] px-8 py-4 rounded-lg font-montserrat font-semibold text-lg transition-all duration-200 hover:bg-[#0B1F3B] hover:text-white"
                data-testid="button-learn-more"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Explore Solutions
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Simplified Stats Section */}
      <motion.div 
        className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 hidden md:block"
        style={{ y: y2 }}
      >
        <div className="grid grid-cols-3 gap-8 text-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[#0B1F3B]/5 shadow-sm">
          {[
            { value: "10+", label: "Years of Experience", testId: "stat-professionals" },
            { value: "Multiple", label: "Industries Served", testId: "stat-revenue" },
            { value: "Proven", label: "Track Record", testId: "stat-retention" }
          ].map((stat, i) => (
            <motion.div
              key={stat.testId}
              data-testid={stat.testId}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={statsVariants}
            >
              <div className="text-2xl font-montserrat font-bold text-[#0B1F3B] mb-1">
                {stat.value}
              </div>
              <div className="text-[#2B2E34]/60 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}