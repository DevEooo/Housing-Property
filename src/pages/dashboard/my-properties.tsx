import { PropertyCard } from './property-card.tsx';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { Plus, Building } from 'lucide-react';

export function MyProperties() {
  const myProperties = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1Nzk3ODIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$850,000',
      title: 'Modern Family Home',
      location: 'Beverly Hills, CA',
      beds: 4,
      baths: 3,
      sqft: '2,400',
      type: 'House',
      status: 'For Sale' as const,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1721149122657-7b5440f39160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ1cmJhbiUyMGhvdXNlfGVufDF8fHx8MTc1Nzk3NzQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$650,000',
      title: 'Suburban Family Home',
      location: 'Pasadena, CA',
      beds: 3,
      baths: 2,
      sqft: '1,900',
      type: 'House',
      status: 'For Sale' as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">My Properties</h1>
            <p className="text-muted-foreground">Manage your property listings</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>
      
      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
      
      {myProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">No properties yet</h3>
            <p className="text-muted-foreground">Start by adding your first property listing</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Property
          </Button>
        </div>
      )}
    </div>
  );
}