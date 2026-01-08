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
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
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
              <div className="filter drop-shadow-lg logo-premium">
                <ShieldLogo size="large" />
              </div>
            </motion.div>
            
            {/* Animated Title with Text Reveal */}
            <h1 
              className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-10 leading-[1.3]"
              data-testid="hero-title"
            >
              <span className="opacity-90">
                <TextReveal delay={0.2}>
                  Your brand. Your offer.
                </TextReveal>
              </span>
              <br />
              <motion.span 
                className="inline-block mt-2 relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              >
                <span className="text-[1.05em] font-extrabold relative inline-block">
                  Our sales engine.
                  <motion.span 
                    className="absolute -bottom-2 left-[5%] w-[90%] h-1 bg-[#D4AF6A]/80 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
              </motion.span>
            </h1>
            
            {/* Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p 
                className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-[1.8] font-medium"
                data-testid="hero-subtitle"
              >
                <TextReveal delay={0.8}>
                  We sell first to prove what works, then build and manage your sales team around it. Built for B2B companies with a strong offer but inconsistent sales.
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
                className="btn-premium bg-[#B89355] text-black px-8 py-4 rounded-sm font-montserrat font-black text-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-[#A68244] hover:shadow-lg active:scale-[0.98]"
                data-testid="button-apply-today"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >Book a Sales Validation Call</motion.button>
              
              <motion.button 
                onClick={scrollToServices}
                className="btn-premium border-2 border-white/40 text-white/80 px-8 py-4 rounded-sm font-montserrat font-medium text-lg transition-all duration-200 hover:bg-white hover:text-[#1E3A5F] hover:border-white hover:text-white"
                data-testid="button-learn-more"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
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
            { value: "Experienced", label: "Sales Leadership", testId: "stat-professionals" },
            { value: "Across", label: "Multiple Industries", testId: "stat-revenue" },
            { value: "Focused On", label: "Long-Term Results", testId: "stat-retention" }
          ].map((stat, i) => (
            <motion.div
              key={stat.testId}
              className="bg-white rounded-md p-6 transition-all duration-200 hover:shadow-xl border border-gray-100"
              data-testid={stat.testId}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={statsVariants}
              whileHover={{ 
                y: -5,
              }}
            >
              <div className="text-xl font-montserrat font-bold text-black mb-2 uppercase tracking-wide">
                {stat.value}
              </div>
              <div className="text-[#B89355] font-montserrat font-semibold text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}