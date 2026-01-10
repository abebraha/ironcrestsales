import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function QualifyingSection() {
  const workWith = [
    "Companies with a proven offer that is already selling",
    "Founders who are actively involved in their business",
    "Founders who move fast and are ready to scale",
    "Businesses with the budget to invest in execution"
  ];

  const doNotWorkWith = [
    "Pre revenue ideas or unvalidated products",
    "Founders looking for passive income",
    "Businesses without a clear offer",
    "Businesses that are not serious about running a real sales operation."
  ];

  return (
    <section className="bg-[#1E3A5F] py-20 relative border-t border-[#D4AF6A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Who We Work With */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-8">
              Who We Work With
            </h2>
            <ul className="space-y-6">
              {workWith.map((item, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-[#D4AF6A] flex-shrink-0 mt-1" />
                  <span className="text-white text-lg font-sans leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Who We Do Not Work With */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#D4AF6A] mb-8">
              Who We Do Not Work With
            </h2>
            <ul className="space-y-6">
              {doNotWorkWith.map((item, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <XCircle className="w-6 h-6 text-[#D4AF6A]/40 flex-shrink-0 mt-1" />
                  <span className="text-[#D4AF6A] text-lg font-sans leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
