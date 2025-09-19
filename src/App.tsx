import { Navbar } from './pages/homepage/Navbar';
import { HeroSection } from './pages/homepage/HeroSection';
import { PropertyListings } from './pages/homepage/PropertyListings';
import { ServicesSection } from './pages/homepage/ServicesSection';
import { AboutSection } from './pages/homepage/AboutSection';
import { CTASection } from './pages/homepage/CTASection';
import { Footer } from './pages/homepage/Footer';
import { Toaster } from './components/homepage ui/ui/sonner';   

export default function App() {
  return (

    <>
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
      </div></>

  );
}