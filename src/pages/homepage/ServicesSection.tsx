import { Button } from '../../components/homepage ui/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/homepage ui/ui/card';
import { ImageWithFallback } from '../fallback/ImageWithFallback';
import { Wrench, Users, Building, PaintBucket, Lightbulb, Shield } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Home Renovation",
    description: "Complete home makeovers from kitchen remodels to full house renovations. Our expert team brings your vision to life.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1755316388093-faff473ffdfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGtpdGNoZW58ZW58MXx8fHwxNzU2NzM2NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Kitchen & Bathroom Remodeling", "Flooring Installation", "Electrical & Plumbing", "Custom Carpentry"]
  },
  {
    id: 2,
    title: "Property Consultation",
    description: "Professional advice on property investments, market analysis, and real estate strategies tailored to your goals.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2Njg4MDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Market Analysis", "Investment Planning", "Property Valuation", "Legal Guidance"]
  },
  {
    id: 3,
    title: "Custom Builds",
    description: "From concept to completion, we build custom homes and commercial properties that exceed expectations.",
    icon: Building,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1NjY2MzUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    features: ["Architectural Design", "Project Management", "Quality Construction", "Timeline Guarantee"]
  }
];

const additionalServices = [
  {
    icon: PaintBucket,
    title: "Interior Design",
    description: "Professional interior design services to transform your space."
  },
  {
    icon: Lightbulb,
    title: "Smart Home Integration",
    description: "Modern smart home technology installation and setup."
  },
  {
    icon: Shield,
    title: "Property Insurance",
    description: "Comprehensive insurance solutions for your properties."
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond property sales, we offer comprehensive services to help you with every aspect 
            of your real estate journey.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center mb-2">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Additional Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Property?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Get started with a free consultation. Our experts will assess your needs 
              and provide a customized solution for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-gray-50">
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}