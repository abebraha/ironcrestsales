import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Services from "@/components/services";
import About from "@/components/about";
import { TestimonialsAndCaseStudies } from "@/components/testimonials-case-studies";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <TestimonialsAndCaseStudies />
      <Contact />
      <Footer />
    </div>
  );
}
