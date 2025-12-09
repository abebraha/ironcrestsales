import { motion } from "framer-motion";
import { XCircle, Clock, TrendingDown, Users, AlertTriangle, DollarSign } from "lucide-react";
import { AnimatedBackground } from "./animated-background";

export default function PainPoints() {
  const painPoints = [
    {
      icon: Users,
      title: "Can't Find Quality Sales Reps",
      description: "You've tried hiring salespeople, but they underperform, leave quickly, or never deliver the results they promised.",
      testId: "pain-hiring"
    },
    {
      icon: Clock,
      title: "Spending All Your Time Selling",
      description: "You're the best salesperson in your company—but that means you can't focus on growing the business.",
      testId: "pain-time"
    },
    {
      icon: TrendingDown,
      title: "Inconsistent Revenue",
      description: "Some months are great, others are a struggle. Without a system, your pipeline is unpredictable.",
      testId: "pain-revenue"
    },
    {
      icon: AlertTriangle,
      title: "No Sales Process",
      description: "You don't have a proven, repeatable system—just hope that the next hire will figure it out.",
      testId: "pain-process"
    },
    {
      icon: DollarSign,
      title: "Wasted Money on Bad Hires",
      description: "Every failed sales hire costs you time, money, and momentum. The cycle keeps repeating.",
      testId: "pain-money"
    },
    {
      icon: XCircle,
      title: "Training Falls Short",
      description: "Even when you find decent reps, you don't have time to properly train and manage them.",
      testId: "pain-training"
    }
  ];

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block text-red-400/80 text-sm font-semibold tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Sound Familiar?
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-white mb-6" data-testid="pain-points-title">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block"
            >If your sales aren't predictable, your business isn't scalable</motion.span>
          </h2>
          
          <motion.p
            className="text-lg text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >When your sales engine is weak, everything else stalls</motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            
            return (
              <motion.div
                key={point.testId}
                className="relative group"
                data-testid={point.testId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.23, 1, 0.32, 1]
                }}
                viewport={{ once: true }}
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full transition-all duration-200 hover:bg-white/10 hover:border-red-500/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-montserrat font-semibold text-white mb-2">
                        {point.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl font-montserrat text-white/90 mb-2">
            There's a better way.
          </p>
          <p className="text-gold-accent font-semibold text-lg">
            Let us build and manage your sales engine.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
