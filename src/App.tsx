import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PropertyListings } from './components/PropertyListings';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PropertyListings />
        <ServicesSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}