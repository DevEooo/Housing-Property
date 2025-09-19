import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/homepage ui/ui/card';
import { Button } from '../../components/homepage ui/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/homepage ui/ui/avatar';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "First-time Home Buyer",
    avatar: "",
    content: "PropertyHub made buying my first home incredibly smooth. Their team guided me through every step, and I found the perfect place within my budget. Couldn't be happier!",
    rating: 5,
    location: "Beverly Hills, CA"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Commercial Property Investor",
    avatar: "",
    content: "The consultation services were outstanding. They provided detailed market analysis that helped me make informed investment decisions. My portfolio has grown significantly.",
    rating: 5,
    location: "Seattle, WA"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Home Renovation Client",
    avatar: "",
    content: "The renovation team transformed our 1980s kitchen into a modern masterpiece. The project was completed on time and within budget. Amazing attention to detail!",
    rating: 5,
    location: "Austin, TX"
  },
  {
    id: 4,
    name: "David Park",
    role: "Family Home Buyer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzU2Njg4MDI1fDA&ixlib=rb-4.1.0&q=80&w=150",
    content: "We needed a larger home for our growing family. PropertyHub found us the perfect 4-bedroom house in a great school district. Their service was exceptional from start to finish.",
    rating: 5,
    location: "Portland, OR"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Condo Seller",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NTY2ODgwMjV8MA&ixlib=rb-4.1.0&q=80&w=150",
    content: "Sold my condo in just 3 weeks at above asking price! Their marketing strategy and professional photography made all the difference. Highly recommend their services.",
    rating: 5,
    location: "Chicago, IL"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the families and businesses we've helped 
            find their perfect spaces.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative h-80 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Card className="h-full">
                  <CardContent className="p-8 h-full flex flex-col justify-center text-center">
                    <Quote className="h-12 w-12 text-primary/20 mx-auto mb-6" />
                    
                    <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                      "{testimonials[currentIndex].content}"
                    </blockquote>

                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-5 w-5 text-yellow-400 fill-current" 
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={testimonials[currentIndex].avatar} 
                          alt={testimonials[currentIndex].name} 
                        />
                        <AvatarFallback>
                          {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <div className="font-semibold text-foreground">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].role}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonials[currentIndex].location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => goToTestimonial(index)}
                className={`flex-shrink-0 p-3 rounded-lg transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'bg-white hover:bg-gray-50 border'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="text-xs">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium">{testimonial.name}</div>
                    <div className="text-xs opacity-70">{testimonial.role}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}