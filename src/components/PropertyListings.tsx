import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './fallback/ImageWithFallback';
import { MapPin, Bed, Bath, Square, Heart, Eye, Play, Calendar, Phone, Share2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  image: string;
  featured: boolean;
  status: 'For Sale' | 'For Rent' | 'Sold';
}

const properties: Property[] = [
  {
    id: 1,
    title: "Modern Family House",
    price: "$850,000",
    location: "Beverly Hills, CA",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,400 sq ft",
    type: "House",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1NjY2MzUyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
    status: "For Sale"
  },
  {
    id: 2,
    title: "Luxury Apartment Complex",
    price: "$1,200,000",
    location: "Manhattan, NY",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sq ft",
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTY2MzQ5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: false,
    status: "For Sale"
  },
  {
    id: 3,
    title: "Commercial Office Building",
    price: "$2,500,000",
    location: "Downtown Seattle",
    bedrooms: 0,
    bathrooms: 8,
    area: "15,000 sq ft",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1629818571588-65407f9dd1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU2Njk3NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
    status: "For Sale"
  },
  {
    id: 4,
    title: "Renovated Modern Home",
    price: "$650,000",
    location: "Austin, TX",
    bedrooms: 3,
    bathrooms: 2,
    area: "2,000 sq ft",
    type: "House",
    image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2Njg4MDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: false,
    status: "For Rent"
  },
  {
    id: 5,
    title: "Cozy Downtown Condo",
    price: "$450,000",
    location: "Portland, OR",
    bedrooms: 2,
    bathrooms: 1,
    area: "1,200 sq ft",
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2Njg4MDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: false,
    status: "For Sale"
  },
  {
    id: 6,
    title: "Executive Office Space",
    price: "$1,800,000",
    location: "Chicago, IL",
    bedrooms: 0,
    bathrooms: 4,
    area: "8,500 sq ft",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1629818571588-65407f9dd1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU2Njk3NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
    status: "For Rent"
  }
];

export function PropertyListings() {
  const [filter, setFilter] = useState<'all' | 'house' | 'apartment' | 'commercial'>('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProperties = properties.filter(property => 
    filter === 'all' || property.type.toLowerCase() === filter
  );

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
    
    const property = properties.find(p => p.id === id);
    if (property) {
      toast.success(favorites.includes(id) 
        ? `Removed ${property.title} from favorites` 
        : `Added ${property.title} to favorites`
      );
    }
  };

  const handleShare = (property: Property) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this ${property.type.toLowerCase()} in ${property.location}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Property link copied to clipboard!');
    }
  };

  const handleVirtualTour = (property: Property) => {
    toast.success(`Starting virtual tour for ${property.title}...`);
  };

  const handleScheduleViewing = (property: Property) => {
    toast.success(`Scheduling viewing for ${property.title}...`);
  };

  return (
    <section id="properties" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties. From modern homes to commercial spaces, 
            find the perfect match for your needs.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: 'all', label: 'All Properties' },
            { key: 'house', label: 'Houses' },
            { key: 'apartment', label: 'Apartments' },
            { key: 'commercial', label: 'Commercial' }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              onClick={() => setFilter(key as any)}
              className="min-w-[120px]"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay with Virtual Tour Button */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <motion.button
                    onClick={() => handleVirtualTour(property)}
                    className="opacity-0 group-hover:opacity-100 bg-white/90 hover:bg-white text-primary rounded-full p-3 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="h-6 w-6" />
                  </motion.button>
                </div>
                <div className="absolute top-4 left-4 space-y-2">
                  <Badge variant={property.status === 'For Sale' ? 'default' : 'secondary'}>
                    {property.status}
                  </Badge>
                  {property.featured && (
                    <Badge variant="outline" className="bg-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <motion.button
                    onClick={() => toggleFavorite(property.id)}
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      animate={{ 
                        scale: favorites.includes(property.id) ? [1, 1.2, 1] : 1,
                        rotate: favorites.includes(property.id) ? [0, 10, -10, 0] : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart 
                        className={`h-4 w-4 transition-colors ${
                          favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                        }`} 
                      />
                    </motion.div>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleShare(property)}
                    className="w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </motion.button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <motion.button
                        className="w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Maximize2 className="h-4 w-4 text-gray-600" />
                      </motion.button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{property.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="aspect-video relative rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={property.image}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold mb-2">Property Details</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Price:</span>
                                <span className="font-semibold text-primary">{property.price}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Location:</span>
                                <span>{property.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Type:</span>
                                <span>{property.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Size:</span>
                                <span>{property.area}</span>
                              </div>
                              {property.type !== 'Commercial' && (
                                <>
                                  <div className="flex justify-between">
                                    <span>Bedrooms:</span>
                                    <span>{property.bedrooms}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Bathrooms:</span>
                                    <span>{property.bathrooms}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Actions</h3>
                            <div className="space-y-2">
                              <Button className="w-full" onClick={() => handleScheduleViewing(property)}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule Viewing
                              </Button>
                              <Button variant="outline" className="w-full" onClick={() => handleVirtualTour(property)}>
                                <Play className="h-4 w-4 mr-2" />
                                Virtual Tour
                              </Button>
                              <Button variant="outline" className="w-full">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact Agent
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-primary">
                    {property.price}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {property.type !== 'Commercial' ? (
                      <>
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          {property.bedrooms} Beds
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          {property.bathrooms} Baths
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        {property.bathrooms} Restrooms
                      </div>
                    )}
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.area}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 space-x-2">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{property.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="aspect-video relative rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={property.image}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold mb-2">Property Details</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Price:</span>
                                <span className="font-semibold text-primary">{property.price}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Location:</span>
                                <span>{property.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Type:</span>
                                <span>{property.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Size:</span>
                                <span>{property.area}</span>
                              </div>
                              {property.type !== 'Commercial' && (
                                <>
                                  <div className="flex justify-between">
                                    <span>Bedrooms:</span>
                                    <span>{property.bedrooms}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Bathrooms:</span>
                                    <span>{property.bathrooms}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Actions</h3>
                            <div className="space-y-2">
                              <Button className="w-full" onClick={() => handleScheduleViewing(property)}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule Viewing
                              </Button>
                              <Button variant="outline" className="w-full" onClick={() => handleVirtualTour(property)}>
                                <Play className="h-4 w-4 mr-2" />
                                Virtual Tour
                              </Button>
                              <Button variant="outline" className="w-full">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact Agent
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline">Contact Agent</Button>
                </motion.div>
              </CardFooter>
            </Card>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
}