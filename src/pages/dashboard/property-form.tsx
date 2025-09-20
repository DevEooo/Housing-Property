import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/dashboard ui/ui/dialog.tsx';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { Input } from '../../components/dashboard ui/ui/input.tsx';
import { Textarea } from '../../components/dashboard ui/ui/textarea.tsx';
import { Label } from '../../components/dashboard ui/ui/label.tsx';
import type { Property } from '../../../function/models/Property';
import { addProperty, updateProperty } from '../../../function/models/propertyService';
import { useUser } from '../../contexts/UserContext';
import { storage } from '../../../function/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface PropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  mode: 'add' | 'edit';
  property?: Property;
}

export function PropertyForm({ isOpen, onClose, onSubmit, mode, property }: PropertyFormProps) {
  const user = useUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && property) {
      setFormData({
        title: property.title,
        description: property.description,
        price: property.price,
        location: property.location,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        size: property.size,
        imageUrl: property.imageUrl || '',
      });
      setImagePreview(property.imageUrl || null);
      setImageFile(null);
    } else {
      setFormData({
        title: '',
        description: '',
        price: 0,
        location: '',
        bedrooms: 0,
        bathrooms: 0,
        size: 0,
        imageUrl: '',
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [mode, property, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      // Create preview URL for the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(formData.imageUrl || null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    // Clear the file input
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const uploadImageAndGetUrl = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    console.log('Starting image upload...');

    // Create storage reference with timestamp to avoid conflicts
    const timestamp = Date.now();
    const storageRef = ref(storage, `property-images/${user.uid}/${timestamp}_${file.name}`);

    try {
      // Use simple uploadBytes instead of uploadBytesResumable
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Upload completed:', snapshot);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL obtained:', downloadURL);

      return downloadURL;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== FORM SUBMIT START ===');
    console.log('User:', user);
    console.log('Form data:', formData);
    console.log('Image file:', imageFile);

    if (!user) {
      console.error('User not authenticated');
      alert('You must be logged in to add properties.');
      return;
    }

    // Minimal validation - only check essential fields
    if (!formData.title.trim()) {
      alert('Please enter a title.');
      return;
    }

    if (!formData.location.trim()) {
      alert('Please enter a location.');
      return;
    }

    setIsSubmitting(true);
    console.log('Set isSubmitting to true');

    try {
      // Create property data
      const propertyData: Omit<Property, 'id' | 'createdAt'> = {
        userId: user.uid,
        title: formData.title,
        description: formData.description || 'No description provided',
        price: Math.max(0, formData.price || 0),
        location: formData.location,
        bedrooms: Math.max(0, formData.bedrooms || 0),
        bathrooms: Math.max(0, formData.bathrooms || 0),
        size: Math.max(0, formData.size || 0),
        imageUrl: formData.imageUrl || '',
      };

      // Handle image upload if file is selected
      if (imageFile) {
        console.log('Uploading image...');
        try {
          propertyData.imageUrl = await uploadImageAndGetUrl(imageFile);
          console.log('Image uploaded successfully:', propertyData.imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert(`Error uploading image: ${error instanceof Error ? error.message : 'Unknown error'}. You can still save the property without an image.`);
          // Continue with saving property even if image upload fails
        }
      }

      console.log('About to save property with:', propertyData);

      if (mode === 'add') {
        console.log('Calling addProperty...');
        const result = await addProperty(propertyData);
        console.log('addProperty result:', result);
        alert('Property added successfully!');
      } else if (mode === 'edit' && property?.id) {
        console.log('Calling updateProperty...');
        await updateProperty(property.id, propertyData);
        console.log('updateProperty completed');
        alert('Property updated successfully!');
      }

      console.log('Calling onSubmit()...');
      onSubmit();
      console.log('Calling onClose()...');
      onClose();
    } catch (error) {
      console.error('=== ERROR SAVING PROPERTY ===');
      console.error('Error details:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      alert(`Error saving property: ${error instanceof Error ? error.message : 'Unknown error'}. Check console for details.`);
    } finally {
      console.log('Setting isSubmitting to false');
      setIsSubmitting(false);
    }

    console.log('=== FORM SUBMIT END ===');
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Property' : 'Edit Property'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter property title"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter property description"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Enter location"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => handleChange('bedrooms', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => handleChange('bathrooms', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="size">Size (sqft)</Label>
              <Input
                id="size"
                type="number"
                value={formData.size}
                onChange={(e) => handleChange('size', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Image upload with preview */}
          <div>
            <Label htmlFor="imageFile">Property Image</Label>
            <Input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
            />

            {/* Image Preview - Compact Size */}
            {imagePreview && (
              <div className="mt-3 relative inline-block">
                <img
                  src={imagePreview}
                  alt="Property preview"
                  className="w-32 h-16 object-cover rounded border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 text-xs"
                  onClick={removeImage}
                  disabled={isSubmitting}
                >
                  ✕
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (mode === 'add' ? 'Add Property' : 'Update Property')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
