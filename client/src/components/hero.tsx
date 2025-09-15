import { motion } from "framer-motion";
import ShieldLogo from "./shield-logo";

export default function Hero() {
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

  return (
    <section id="home" className="hero-gradient pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ShieldLogo size="large" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-testid="hero-title"
          >
            Scale Your Sales Department<br />
            <span className="text-yellow-300">Without the Risk</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-testid="hero-subtitle"
          >
            Expert outsourced sales professionals who integrate with your team to build scalable revenue systems and strategic hiring processes.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              onClick={scrollToContact}
              className="bg-gold-accent text-white px-8 py-4 rounded-lg font-montserrat font-semibold text-lg hover:bg-gold-accent/90 transition-colors"
              data-testid="button-schedule-consultation"
            >
              Schedule Consultation
            </button>
            <button 
              onClick={scrollToServices}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-montserrat font-semibold text-lg hover:bg-white hover:text-primary transition-colors"
              data-testid="button-learn-more"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Stats Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6" data-testid="stat-professionals">
            <div className="text-3xl font-montserrat font-bold text-yellow-300 mb-2">500+</div>
            <div className="text-blue-100">Sales Professionals Placed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6" data-testid="stat-revenue">
            <div className="text-3xl font-montserrat font-bold text-yellow-300 mb-2">$50M+</div>
            <div className="text-blue-100">Revenue Generated</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6" data-testid="stat-retention">
            <div className="text-3xl font-montserrat font-bold text-yellow-300 mb-2">95%</div>
            <div className="text-blue-100">Client Retention Rate</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
