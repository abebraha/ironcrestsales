import { motion } from "framer-motion";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { InlineWidget } from "react-calendly";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Light gray background for contrast */}
      <div className="absolute inset-0 bg-[#F2F4F7]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#C9A24D] font-montserrat font-bold tracking-widest uppercase text-sm mb-4 block">Get Started</span>
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-[#0B1F3B] mb-6 max-w-4xl mx-auto" data-testid="contact-title">Turn your sales into a predictable growth machine starting with one conversation</h2>
          <div className="h-1 w-20 bg-[#C9A24D] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Calendly Embed */}
          <motion.div 
            id="contact-form"
            className="bg-white rounded-2xl p-6 border border-[#0B1F3B]/10 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            data-testid="calendly-widget"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-montserrat font-bold text-[#0B1F3B]">Schedule a Consultation</h3>
              <div className="px-3 py-1 bg-[#C9A24D]/10 text-[#C9A24D] rounded-full text-xs font-bold uppercase tracking-wider">Free Session</div>
            </div>
            <div className="w-full rounded-lg overflow-hidden" style={{ minHeight: '650px' }}>
              <InlineWidget 
                url="https://calendly.com/icebreakerbd/new-meeting"
                styles={{ height: '650px', width: '100%' }}
              />
            </div>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div 
              className="bg-white rounded-2xl p-8 border border-[#0B1F3B]/5 shadow-lg" 
              data-testid="contact-info"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-montserrat font-bold text-[#0B1F3B] mb-8 border-l-4 border-[#C9A24D] pl-4">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-5" data-testid="contact-phone">
                  <div className="bg-[#0B1F3B]/5 p-3 rounded-xl">
                    <Phone className="w-5 h-5 text-[#0B1F3B]" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-[#0B1F3B]">Phone</h4>
                    <p className="text-[#2B2E34]/80 text-lg">+1 (917) 809-6610</p>
                    <p className="text-sm text-[#2B2E34]/50">Available Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5" data-testid="contact-email">
                  <div className="bg-[#0B1F3B]/5 p-3 rounded-xl">
                    <Mail className="w-5 h-5 text-[#0B1F3B]" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-[#0B1F3B]">Email</h4>
                    <p className="text-[#2B2E34]/80 text-lg">info@ironcrestsales.com</p>
                    <p className="text-sm text-[#2B2E34]/50">Quick response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5" data-testid="contact-location">
                  <div className="bg-[#0B1F3B]/5 p-3 rounded-xl">
                    <MapPin className="w-5 h-5 text-[#0B1F3B]" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-[#0B1F3B]">Headquarters</h4>
                    <p className="text-[#2B2E34]/80 text-lg">New York, NY</p>
                    <p className="text-sm text-[#2B2E34]/50">Serving high-growth clients nationwide</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-[#0B1F3B] rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden" 
              data-testid="why-choose"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="relative">
                <h3 className="text-2xl font-montserrat font-bold mb-6">Why Choose IronCrest?</h3>
                <ul className="space-y-4">
                  {[
                    "Immediate impact on your revenue pipeline",
                    "Proven, high-conversion sales systems",
                    "Expert reps trained specifically for your offer",
                    "Strategic partnership with co-founder oversight"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center text-white/90"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-[#C9A24D] mr-4 flex-shrink-0" />
                      <span className="text-base font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
