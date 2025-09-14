import { Navbar } from './components/homepage/Navbar';
import { HeroSection } from './components/homepage/HeroSection';
import { PropertyListings } from './components/homepage/PropertyListings';
import { ServicesSection } from './components/homepage/ServicesSection';
import { AboutSection } from './components/homepage/AboutSection';
import { CTASection } from './components/homepage/CTASection';
import { Footer } from './components/homepage/Footer';
import { Toaster } from './components/homepage/ui/sonner';

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