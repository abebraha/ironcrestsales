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
    <section id="home" className="relative overflow-hidden min-h-screen">
      {/* Modern blue background */}
      <div className="absolute inset-0 bg-[#1E3A5F]" />
      {/* Main hero content with parallax */}
      <motion.div 
        className="relative z-10 pt-24 pb-20"
        style={{ y: y1, scale, opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center reveal-on-scroll">
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
              <div className="filter drop-shadow-lg">
                <ShieldLogo size="large" />
              </div>
            </motion.div>
            
            {/* Animated Title with Text Reveal */}
            <h1 
              className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-6 leading-tight"
              data-testid="hero-title"
            >
              <TextReveal delay={0.2}>
                Your brand. Your offer.
              </TextReveal>
              <br />
              <TextReveal delay={0.4}>
                Our sales engine.
              </TextReveal>
            </h1>
            
            {/* Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p 
                className="text-xl md:text-2xl text-white/85 mb-8 max-w-3xl mx-auto leading-relaxed"
                data-testid="hero-subtitle"
              >
                <TextReveal delay={0.8}>
                  We build your sales engine hands-on, then scale it with proven reps we train and manage directly to ensure continued success.
                </TextReveal>
              </p>
            </motion.div>
            
            {/* Simplified CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.button 
                onClick={scrollToContact}
                className="btn-premium bg-[#D4AF6A] text-[#1E3A5F] px-8 py-4 rounded-lg font-montserrat font-bold text-lg shadow-lg transition-all duration-200 hover:bg-[#D4AF6A]/90"
                data-testid="button-apply-today"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >Schedule a Consultation</motion.button>
              
              <motion.button 
                onClick={scrollToServices}
                className="btn-premium border-2 border-white text-white px-8 py-4 rounded-lg font-montserrat font-semibold text-lg transition-all duration-200 hover:bg-white hover:text-[#1E3A5F]"
                data-testid="button-learn-more"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Simplified Stats Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10 reveal-on-scroll"
        style={{ y: y2, transitionDelay: '400ms' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: "10+", label: "Years of Experience", testId: "stat-professionals" },
            { value: "Multiple", label: "Industries Served", testId: "stat-revenue" },
            { value: "Proven", label: "Track Record", testId: "stat-retention" }
          ].map((stat, i) => (
            <motion.div
              key={stat.testId}
              className="bg-white/10 rounded-xl p-6 transition-all duration-200 hover:bg-white/15 border border-white/10"
              data-testid={stat.testId}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={statsVariants}
              whileHover={{ 
                scale: 1.02,
              }}
            >
              <div className="text-3xl font-montserrat font-bold text-[#D4AF6A] mb-2">
                {stat.value}
              </div>
              <div className="text-white/85">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}