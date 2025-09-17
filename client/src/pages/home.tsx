import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Services from "@/components/services";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { SectionTransition, StaggerContainer, RevealContent } from "@/components/page-transitions";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />
      
      <RevealContent direction="up" className="w-full">
        <Hero />
      </RevealContent>
      
      <SectionTransition delay={0.1}>
        <Services />
      </SectionTransition>
      
      <SectionTransition delay={0.2}>
        <About />
      </SectionTransition>
      
      <SectionTransition delay={0.3}>
        <Contact />
      </SectionTransition>
      
      <SectionTransition delay={0.4}>
        <Footer />
      </SectionTransition>
    </motion.div>
  );
}
