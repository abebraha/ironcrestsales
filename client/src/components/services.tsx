import { motion } from "framer-motion";
import { Bus, Settings, Users, TrendingUp, CheckCircle } from "lucide-react";

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-primary mb-6" data-testid="services-title">
            Comprehensive Sales Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From individual sales experts to complete department buildouts, we provide the talent and systems your business needs to scale effectively.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-card rounded-xl p-8 border border-border shadow-lg h-full flex flex-col"
            variants={itemVariants}
            data-testid="service-professionals"
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Bus className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-montserrat font-bold text-foreground mb-3">Expert Sales Professionals</h3>
                <p className="text-muted-foreground mb-4 flex-1">
                  Seasoned sales experts who integrate directly with your team, bringing proven methodologies and immediate impact to your revenue pipeline.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Experienced B2B sales professionals
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Industry-specific expertise
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    Immediate integration and impact
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card rounded-xl p-8 border border-border shadow-lg h-full flex flex-col"
            variants={itemVariants}
            data-testid="service-hiring"
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className="bg-yellow-500/10 p-3 rounded-lg">
                <Users className="w-6 h-6 text-gold-accent" />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-montserrat font-bold text-foreground mb-3">Strategic Hiring & Scaling</h3>
                <p className="text-muted-foreground mb-4 flex-1">
                  Build your internal sales team with our proven hiring methodology and ongoing support for sustainable growth.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-gold-accent mr-2" />
                    Sales team recruitment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-gold-accent mr-2" />
                    Training and onboarding
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-gold-accent mr-2" />
                    Performance management systems
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card rounded-xl p-8 border border-border shadow-lg h-full flex flex-col"
            variants={itemVariants}
            data-testid="service-systems"
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className="bg-accent/10 p-3 rounded-lg">
                <Settings className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-montserrat font-bold text-foreground mb-3">Sales System Development</h3>
                <p className="text-muted-foreground mb-4 flex-1">
                  Build robust, scalable sales processes that grow with your business and create predictable revenue streams.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Custom CRM implementation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Lead generation systems
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Performance tracking and analytics
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-card rounded-xl p-8 border border-border shadow-lg h-full flex flex-col"
            variants={itemVariants}
            data-testid="service-optimization"
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className="bg-secondary/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-montserrat font-bold text-foreground mb-3">Revenue Optimization</h3>
                <p className="text-muted-foreground mb-4 flex-1">
                  Maximize your existing sales potential through data-driven insights and proven optimization strategies.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                    Sales process audits
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                    Conversion rate optimization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                    Pipeline management improvement
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Process Section */}
        <motion.div 
          className="bg-primary/5 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          data-testid="process-section"
        >
          <h3 className="text-3xl font-montserrat font-bold text-center text-primary mb-12">Our Proven 4-Step Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center" data-testid="process-step-1">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-montserrat font-semibold text-lg mb-2">Analysis</h4>
              <p className="text-sm text-muted-foreground">Comprehensive assessment of your current sales operations and growth goals</p>
            </div>
            <div className="text-center" data-testid="process-step-2">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-montserrat font-semibold text-lg mb-2">Strategy</h4>
              <p className="text-sm text-muted-foreground">Custom solution design tailored to your industry and business model</p>
            </div>
            <div className="text-center" data-testid="process-step-3">
              <div className="bg-yellow-500 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-montserrat font-semibold text-lg mb-2">Implementation</h4>
              <p className="text-sm text-muted-foreground">Deploy expert sales professionals and establish scalable systems</p>
            </div>
            <div className="text-center" data-testid="process-step-4">
              <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h4 className="font-montserrat font-semibold text-lg mb-2">Scale</h4>
              <p className="text-sm text-muted-foreground">Continuous optimization and strategic team expansion for sustained growth</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
