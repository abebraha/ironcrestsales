import { motion } from "framer-motion";
import { Bus, Settings, Users, TrendingUp } from "lucide-react";
import ServiceCard3D from "./service-card-3d";

export default function Services() {
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
      iconBgColor: "bg-[#1E3A5F]/10",
      iconColor: "text-[#1E3A5F]",
      checkColor: "text-[#D4AF6A]",
      testId: "service-development"
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
      iconBgColor: "bg-[#1E3A5F]/10",
      iconColor: "text-[#1E3A5F]",
      checkColor: "text-[#D4AF6A]",
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
      iconBgColor: "bg-[#1E3A5F]/10",
      iconColor: "text-[#1E3A5F]",
      checkColor: "text-[#D4AF6A]",
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
      iconBgColor: "bg-[#1E3A5F]/10",
      iconColor: "text-[#1E3A5F]",
      checkColor: "text-[#D4AF6A]",
      testId: "service-optimization"
    }
  ];

  return (
    <section id="services" className="py-24 overflow-hidden relative reveal-on-scroll">
      {/* Light gray background for contrast */}
      <div className="absolute inset-0 bg-[#F2F4F7]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated title section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-[#2B2E34] mb-4" data-testid="services-title">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="inline-block relative"
            >
              Predictable sales engine built by proven sales professionals
              <div className="absolute -bottom-2 left-0 h-1 w-24 bg-[#D4AF6A]" />
            </motion.span>
          </h2>
          <p className="text-lg text-[#2B2E34]/70 max-w-2xl mx-auto mt-6">Our proven 4 step process</p>
        </motion.div>

        {/* 3D Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div className="reveal-on-scroll" key={index} style={{ transitionDelay: `${index * 100}ms` }}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}