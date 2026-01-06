import { motion } from "framer-motion";
import { XCircle, Clock, TrendingDown, Users, AlertTriangle, DollarSign } from "lucide-react";

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
      title: "Inconsistent Sales Process",
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
    <section className="py-24 overflow-hidden relative">
      {/* Light gray background for contrast */}
      <div className="absolute inset-0 bg-[#F2F4F7]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-[#2B2E34] mb-4" data-testid="pain-points-title">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block relative"
            >
              If your sales aren't predictable, your business isn't scalable
              <div className="absolute -bottom-2 left-0 h-1 w-24 bg-[#D4AF6A]" />
            </motion.span>
          </h2>
          
          <motion.p
            className="text-lg text-[#2B2E34]/70 max-w-2xl mx-auto mt-6"
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
                <div className="bg-white border border-[#E5E7EB] rounded-md p-6 h-full transition-all duration-200 hover:border-[#D4AF6A]/30 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF6A]/10 rounded-md flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#D4AF6A]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-montserrat font-semibold text-[#2B2E34] mb-2">
                        {point.title}
                      </h3>
                      <p className="text-[#2B2E34]/60 text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 relative flex justify-center px-4">
          <motion.div 
            className="relative z-10 w-full max-w-[720px] mx-auto"
            style={{ width: "calc(100% - 32px)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/85 backdrop-blur-sm border border-gray-200 rounded-[16px] shadow-soft p-8 md:px-12 md:py-10 flex flex-col items-center justify-center text-center">
              <p 
                className="text-xl md:text-2xl font-montserrat font-bold text-[#1E3A5F] m-0 p-0"
                style={{ textAlign: 'center', left: 'auto', right: 'auto', transform: 'none', translate: 'none' }}
              >
                There's a better way.
              </p>
              <div 
                className="block mx-auto my-4 md:my-5" 
                style={{ 
                  width: '110px', 
                  height: '3px', 
                  backgroundColor: '#B89355', 
                  display: 'block', 
                  marginLeft: 'auto', 
                  marginRight: 'auto',
                  left: 'auto',
                  right: 'auto',
                  transform: 'none',
                  translate: 'none'
                }} 
              />
              <p 
                className="text-[#D4AF6A] font-extrabold text-xl md:text-3xl leading-tight m-0 p-0"
                style={{ textAlign: 'center', fontWeight: 800, left: 'auto', right: 'auto', transform: 'none', translate: 'none' }}
              >
                Let us build and manage your sales engine.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
