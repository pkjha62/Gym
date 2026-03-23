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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:bg-orange-600 focus:text-white focus:px-3 focus:py-2 focus:rounded-md">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <HeroCarousel />
        <ProgramHighlights />
        <AboutFounder />
        <Features />
        <ClassSchedule />
        <PricingPlans />
        <BMICalculator />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
