import { PropertyCard } from './property-card.tsx';
import { Heart } from 'lucide-react';

export function Favorites() {
  const favoriteProperties = [
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU3OTg5NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$1,200,000',
      title: 'Luxury Penthouse',
      location: 'Santa Monica, CA',
      beds: 3,
      baths: 3,
      sqft: '1,800',
      type: 'Penthouse',
      status: 'For Sale' as const,
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1629257670377-65b4377777d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25kbyUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NTc5ODk0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$2,800/month',
      title: 'Modern Condo',
      location: 'West Hollywood, CA',
      beds: 2,
      baths: 1,
      sqft: '1,100',
      type: 'Condo',
      status: 'For Rent' as const,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1728496120856-b2e920dc6f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHJlc2lkZW50aWFsfGVufDF8fHx8MTc1NzkyNjQyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$3,200/month',
      title: 'Downtown Apartment',
      location: 'Los Angeles, CA',
      beds: 2,
      baths: 2,
      sqft: '1,200',
      type: 'Apartment',
      status: 'For Rent' as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">Favorites</h1>
        <p className="text-muted-foreground">Properties you've saved for later</p>
      </div>
      
      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
      
      {favoriteProperties.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-foreground mb-2">No favorites yet</h3>
          <p className="text-muted-foreground">Start exploring properties and save your favorites</p>
        </div>
      )}
    </div>
  );
}