import { motion } from "framer-motion";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { InlineWidget } from "react-calendly";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden reveal-on-scroll">
      {/* Navy background */}
      <div className="absolute inset-0 bg-[#1E3A5F]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-10" data-testid="contact-title">Turn your sales into a predictable growth machine starting with one conversation</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
          {/* Calendly Embed */}
          <motion.div 
            id="contact-form"
            className="card-premium bg-card rounded-lg p-6 border border-border shadow-md relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            data-testid="calendly-widget"
          >
            <h3 className="text-2xl font-montserrat font-bold text-foreground mb-4">Schedule a Meeting</h3>
            <div className="w-full rounded-lg overflow-hidden" style={{ minHeight: '650px' }}>
              <InlineWidget 
                url="https://calendly.com/icebreakerbd/new-meeting"
                styles={{ height: '650px', width: '100%' }}
              />
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="card-premium bg-card rounded-lg p-8 border border-border shadow-md" 
              data-testid="contact-info"
              whileHover={{ 
                y: -4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-montserrat font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4 btn-premium" 
                  data-testid="contact-phone"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-[#1E3A5F]/10 p-3 rounded-md">
                    <Phone className="w-5 h-5 text-[#1E3A5F]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-foreground">Phone</h4>
                    <p className="text-foreground/80">+1 (917) 809-6610</p>
                    <p className="text-sm text-foreground/70">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 btn-premium" 
                  data-testid="contact-email"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-[#D4AF6A]/10 p-3 rounded-md">
                    <Mail className="w-5 h-5 text-[#D4AF6A]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-foreground">Email</h4>
                    <p className="text-foreground/80">info@ironcrestsales.com</p>
                    <p className="text-sm text-foreground/70">Response within 24 hours</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 btn-premium" 
                  data-testid="contact-location"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="bg-[#D4AF6A]/10 p-3 rounded-md">
                    <MapPin className="w-5 h-5 text-[#D4AF6A]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-foreground">Headquarters</h4>
                    <p className="text-foreground/80">New York, NY</p>
                    <p className="text-sm text-foreground/70">Serving clients nationwide</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="card-premium bg-white rounded-lg p-8 text-[#2B2E34] border border-[#E5E7EB] shadow-md relative overflow-hidden" 
              data-testid="why-choose"
              whileHover={{ 
                y: -4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <h3 className="text-2xl font-montserrat font-bold mb-4">Why Choose IronCrest?</h3>
                <ul className="space-y-3">
                  {[
                    "Immediate impact on revenue",
                    "Proven scalable systems",
                    "Expert sales professionals",
                    "Strategic partnership approach"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#D4AF6A] mr-3" strokeWidth={2.5} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
