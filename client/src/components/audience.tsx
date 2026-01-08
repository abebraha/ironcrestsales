import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Audience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const forList = [
    "B2B companies with a proven offer",
    "Founders who can sell but need a real team to scale",
    "Companies with inconsistent pipeline and no repeatable outbound motion",
    "Teams that want sales owned end to end not advice or templates"
  ];

  const notForList = [
    "Early stage idea only startups with no clear offer",
    "Companies looking for scripts or one time consulting",
    "Businesses expecting overnight results with no process",
    "Anyone who wants a vendor instead of a long term partner"
  ];

  return (
    <section id="who-its-for" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Who We're For */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-montserrat font-bold text-[#1E3A5F] mb-8 relative"
            >
              Who We’re For
              <div className="absolute -bottom-2 left-0 h-1 w-12 bg-[#D4AF6A]" />
            </motion.h2>
            <ul className="space-y-6">
              {forList.map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#D4AF6A] mr-4 shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700 font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Who We're Not For */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-montserrat font-bold text-[#1E3A5F] mb-8 relative"
            >
              Who We’re Not For
              <div className="absolute -bottom-2 left-0 h-1 w-12 bg-gray-300" />
            </motion.h2>
            <ul className="space-y-6">
              {notForList.map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-start">
                  <XCircle className="w-6 h-6 text-gray-400 mr-4 shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-500">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Closing Line */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-8 py-4 bg-[#F2F4F7] rounded-md border border-gray-100">
            <p className="text-xl font-montserrat font-semibold text-[#1E3A5F]">
              If you’re not sure which one you are book a call and we’ll tell you in ten minutes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
