import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import ProgramHighlights from "./components/ProgramHighlights";
import AboutFounder from "./components/AboutFounder";
import Features from "./components/Features";
import ClassSchedule from "./components/ClassSchedule";
import PricingPlans from "./components/PricingPlans";
import BMICalculator from "./components/BMICalculator";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white text-zinc-900">
      <Navbar />
      <HeroCarousel />
      <ProgramHighlights />
      <AboutFounder />
      <Features />
      <ClassSchedule />
      <PricingPlans />
      <BMICalculator />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}
