import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, Settings, Users, TrendingUp, Sparkles, Target, Zap, Award } from "lucide-react";
import ServiceCard3D from "./service-card-3d";
import { AnimatedBackground } from "./animated-background";

export default function Services() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const services = [
    {
      icon: Settings,
      title: "Sales System Development",
      description: "Build scalable sales systems shaped and proven by a founding salesperson who actually sells for you before your first long-term rep is hired",
      features: [
        "Custom CRM implementation",
        "Lead generation systems",
        "Performance tracking and analytics"
      ],
      iconBgColor: "bg-accent/10",
      iconColor: "text-accent",
      checkColor: "text-accent",
      testId: "service-systems"
    },
    {
      icon: Bus,
      title: "Expert Sales Professionals",
      description: "Seasoned sales experts who integrate directly with your team, bringing proven methodologies and immediate impact to your revenue pipeline.",
      features: [
        "Experienced B2B sales professionals",
        "Industry-specific expertise",
        "Immediate integration and impact"
      ],
      iconBgColor: "bg-primary/10",
      iconColor: "text-primary",
      checkColor: "text-primary",
      testId: "service-professionals"
    },
    {
      icon: Users,
      title: "Strategic Hiring & Scaling",
      description: "Build your sales team with our proven hiring methodology and ongoing support for sustainable growth.",
      features: [
        "Sales team recruitment",
        "Training and onboarding",
        "Performance management systems"
      ],
      iconBgColor: "bg-yellow-500/10",
      iconColor: "text-gold-accent",
      checkColor: "text-gold-accent",
      testId: "service-hiring"
    },
    {
      icon: TrendingUp,
      title: "Ongoing Management & Training",
      description: "We continue to manage and train your sales team long term, ensuring consistent performance and growth through hands-on coaching and accountability.",
      features: [
        "Continuous team management and oversight",
        "Regular training and skill development",
        "Performance tracking and improvement"
      ],
      iconBgColor: "bg-secondary/10",
      iconColor: "text-secondary",
      checkColor: "text-secondary",
      testId: "service-optimization"
    }
  ];

  const processSteps = [
    {
      icon: Target,
      title: "Analysis",
      description: "Comprehensive assessment of your current sales operations and growth goals",
      color: "bg-primary",
      glowColor: "shadow-primary/50"
    },
    {
      icon: Zap,
      title: "Strategy",
      description: "Custom solution design tailored to your industry and business model",
      color: "bg-accent",
      glowColor: "shadow-accent/50"
    },
    {
      icon: Sparkles,
      title: "Implementation",
      description: "Deploy expert sales professionals and establish scalable systems",
      color: "bg-yellow-500",
      glowColor: "shadow-yellow-500/50"
    },
    {
      icon: Award,
      title: "Scale",
      description: "Continuous optimization and strategic team expansion for sustained growth",
      color: "bg-secondary",
      glowColor: "shadow-secondary/50"
    }
  ];

  return (
    <section id="services" className="py-20 overflow-hidden relative gpu-accelerated gradient-animated">
      {/* Animated background with services variant */}
      <AnimatedBackground variant="services" />
      
      {/* Dark scrim overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-[5]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated title section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-6" data-testid="services-title">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              Predictable sales engine built by proven sales professionals
            </motion.span>
          </h2>
        </motion.div>

        {/* 3D Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard3D
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              iconBgColor={service.iconBgColor}
              iconColor={service.iconColor}
              checkColor={service.checkColor}
              index={index}
              testId={service.testId}
            />
          ))}
        </div>

        {/* Enhanced 3D Process Section */}
        <motion.div 
          className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-2xl p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          data-testid="process-section"
        >
          {/* Static gradient background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 70%)",
              filter: "blur(100px)"
            }}
          />
          
          <h3 className="text-3xl font-montserrat font-bold text-center text-white mb-12 relative z-10">
            Our Proven 4-Step Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              
              return (
                <motion.div
                  key={index}
                  className="text-center relative"
                  data-testid={`process-step-${index + 1}`}
                  initial={{ opacity: 0, y: 50, rotateY: -30 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateY: 0
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Connection line */}
                  {index < processSteps.length - 1 && (
                    <motion.div
                      className="absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 hidden md:block"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                    />
                  )}
                  
                  {/* 3D Step number with icon */}
                  <motion.div
                    className={`${step.color} text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative`}
                    animate={{
                      scale: isActive ? 1.1 : 1,  // Reduced scale
                      rotateY: isActive ? 10 : 0,  // Max 10 degree rotation instead of 360
                      y: isActive ? -5 : 0  // Subtle lift
                    }}
                    transition={{
                      duration: 0.2,  // Faster transition
                      ease: "easeOut"
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow: isActive 
                        ? `0 20px 40px ${step.glowColor}` 
                        : "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                  >
                    
                    {/* Icon display - static */}
                    <div className="relative z-10">
                      {isActive ? <Icon className="w-8 h-8" /> : (index + 1)}
                    </div>
                  </motion.div>
                  
                  <motion.h4 
                    className="font-montserrat font-semibold text-lg mb-2 text-white"
                    animate={{
                      letterSpacing: isActive ? "0.05em" : "0em",
                      color: isActive ? "var(--gold-accent)" : "#ffffff"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.title}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-sm text-white/75"
                    animate={{
                      scale: isActive ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.description}
                  </motion.p>
                  
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}