import { motion } from "framer-motion";
import { Award, Handshake, TrendingUp, Quote } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-primary mb-6" data-testid="about-title">
              Built by Sales Leaders, <br />For Sales Leaders
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              IronCrest Sales was founded by veteran sales executives who understand the challenges of building and scaling high-performance sales organizations. Our team combines decades of experience across industries to deliver results that matter.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4" data-testid="expertise-point">
                <div className="bg-primary/10 p-2 rounded-lg mt-1">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-lg text-foreground">Proven Expertise</h4>
                  <p className="text-muted-foreground">Average 15+ years of sales leadership experience across our core team</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4" data-testid="partnership-point">
                <div className="bg-accent/10 p-2 rounded-lg mt-1">
                  <Handshake className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-lg text-foreground">Partnership Approach</h4>
                  <p className="text-muted-foreground">We work as an extension of your team, not just another vendor</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4" data-testid="results-point">
                <div className="bg-yellow-500/10 p-2 rounded-lg mt-1">
                  <TrendingUp className="w-5 h-5 text-gold-accent" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-lg text-foreground">Results-Driven</h4>
                  <p className="text-muted-foreground">Our success is measured by your revenue growth and team development</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            data-testid="about-stats"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center" data-testid="stat-experience">
                <div className="text-3xl font-montserrat font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground text-sm">Years Combined Experience</div>
              </div>
              <div className="text-center" data-testid="stat-companies">
                <div className="text-3xl font-montserrat font-bold text-accent mb-2">Growth</div>
                <div className="text-muted-foreground text-sm">Focused Approach</div>
              </div>
              <div className="text-center" data-testid="stat-industries">
                <div className="text-3xl font-montserrat font-bold text-gold-accent mb-2">B2B</div>
                <div className="text-muted-foreground text-sm">Specialization</div>
              </div>
              <div className="text-center" data-testid="stat-success">
                <div className="text-3xl font-montserrat font-bold text-secondary mb-2">Results</div>
                <div className="text-muted-foreground text-sm">Driven Process</div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-xl border border-border" data-testid="testimonial">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-montserrat font-semibold">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">CEO, TechStart Solutions</div>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "IronCrest Sales transformed our approach to growth. Within 6 months, we had a scalable sales system and increased our revenue by 300%. Their team became our strategic partners."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
