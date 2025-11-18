import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhyChooseUs from "@/components/WhyChooseUs";
import IndustryShowcase from "@/components/IndustryShowcase";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <TrustBar />
      <div id="solutions">
        <Services />
      </div>
      <WhyChooseUs />
      <IndustryShowcase />
      <Stats />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
