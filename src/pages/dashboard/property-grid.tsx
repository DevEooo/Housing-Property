import { PropertyCard } from './property-card.tsx';

export function PropertyGrid() {
  const properties = [
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
      id: '4',
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
      id: '6',
      image: 'https://images.unsplash.com/photo-1722293742416-4380f2987a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3duaG91c2UlMjByZXNpZGVudGlhbHxlbnwxfHx8fDE3NTc5Mjc4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      price: '$720,000',
      title: 'Charming Townhouse',
      location: 'Manhattan Beach, CA',
      beds: 3,
      baths: 3,
      sqft: '2,100',
      type: 'Townhouse',
      status: 'Sold' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
}