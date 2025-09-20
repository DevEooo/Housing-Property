import { useEffect, useState } from 'react';
import { PropertyCard } from './property-card.tsx';
import { PropertyForm } from './property-form.tsx';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { Plus, Building, Edit, Trash, LogIn } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import type { Property } from '../../../function/models/Property';
import { getProperties, deleteProperty } from '../../../function/models/propertyService';

export function MyProperties() {
  const user = useUser();
  const navigate = useNavigate();
  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>(undefined);

  const fetchProperties = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const properties = await getProperties(user.uid);
      setMyProperties(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      alert('Error loading properties. Please check your Firebase configuration.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user]);

  const openAddForm = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormMode('add');
    setSelectedProperty(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (property: Property) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormMode('edit');
    setSelectedProperty(property);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = () => {
    fetchProperties();
  };

  const handleDeleteProperty = async (id: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await deleteProperty(id);
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  // If user is not authenticated, show login prompt
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <LogIn className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">Please log in to manage your properties</p>
          <Button onClick={() => navigate('/login')} className="bg-primary hover:bg-primary/90">
            <LogIn className="w-4 h-4 mr-2" />
            Log In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">My Properties</h1>
            <p className="text-muted-foreground">Manage your property listings</p>
          </div>
          <Button onClick={openAddForm} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>
      </div>
      
      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : myProperties.length > 0 ? (
          myProperties.map((property) => (
            <div key={property.id} className="relative">
            <PropertyCard
                image={property.imageUrl || ''}
                price={`$${property.price.toLocaleString()}`}
                title={property.title}
                location={property.location}
                beds={property.bedrooms}
                baths={property.bathrooms}
                sqft={property.size.toString()}
                type="House"
                status="For Sale"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEditForm(property)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteProperty(property.id!)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 col-span-full">
            <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">No properties yet</h3>
            <p className="text-muted-foreground">Start by adding your first property listing</p>
            <Button onClick={openAddForm} className="bg-primary hover:bg-primary/90 mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Property
            </Button>
          </div>
        )}
      </div>
      <PropertyForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        mode={formMode}
        property={selectedProperty}
      />
    </div>
  );
}
