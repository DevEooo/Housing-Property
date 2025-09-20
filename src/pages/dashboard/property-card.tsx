import { Card, CardContent } from '../../components/dashboard ui/ui/card.tsx';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { Badge } from '../../components/dashboard ui/ui/badge.tsx';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { ImageWithFallback } from '../fallback/ImageWithFallback.tsx';

interface PropertyCardProps {
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  type: string;
  status: 'For Sale' | 'For Rent' | 'Sold';
}

export function PropertyCard({ 
  image, 
  price, 
  title, 
  location, 
  beds, 
  baths, 
  sqft, 
  type, 
  status 
}: PropertyCardProps) {
  const statusColors = {
    'For Sale': 'bg-green-100 text-green-800',
    'For Rent': 'bg-blue-100 text-blue-800',
    'Sold': 'bg-gray-100 text-gray-800',
  };

  return (
    <Card className="border-border shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className={`absolute top-3 left-3 ${statusColors[status]}`}>
          {status}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
          <p className="text-xl font-semibold text-primary">{price}</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            {beds} beds
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {baths} baths
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            {sqft} sqft
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {type}
          </Badge>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}