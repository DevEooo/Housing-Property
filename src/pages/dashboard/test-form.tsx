import { useState } from 'react';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { Input } from '../../components/dashboard ui/ui/input.tsx';
import { Label } from '../../components/dashboard ui/ui/label.tsx';
import { addProperty } from '../../../function/models/propertyService';
import { useUser } from '../../contexts/UserContext';
import { storage } from '../../../function/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export function TestForm() {
  const user = useUser();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setImagePreview(null);
    }
  };

  const uploadImageAndGetUrl = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    console.log('Starting image upload...');

    // Create storage reference with timestamp to avoid conflicts
    const timestamp = Date.now();
    const storageRef = ref(storage, `test-images/${user.uid}/${timestamp}_${file.name}`);

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
    console.log('=== TEST FORM SUBMIT START ===');
    console.log('User:', user);

    if (!user) {
      alert('You must be logged in to add properties.');
      return;
    }

    setIsSubmitting(true);
    console.log('Set isSubmitting to true');

    try {
      // Create test property
      const testProperty = {
        userId: user.uid,
        title: title || 'Test Property with Image',
        description: 'Test description with image upload',
        price: 100000,
        location: location || 'Test City',
        bedrooms: 2,
        bathrooms: 1,
        size: 1000,
        imageUrl: '',
      };

      // Handle image upload if file is selected
      if (imageFile) {
        console.log('Uploading image...');
        try {
          testProperty.imageUrl = await uploadImageAndGetUrl(imageFile);
          console.log('Image uploaded successfully:', testProperty.imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert(`Error uploading image: ${error instanceof Error ? error.message : 'Unknown error'}. You can still save the property without an image.`);
          // Continue with saving property even if image upload fails
        }
      }

      console.log('About to call addProperty with:', testProperty);

      const result = await addProperty(testProperty);
      console.log('addProperty result:', result);

      alert('Test property with image added successfully! ID: ' + result);
    } catch (error) {
      console.error('=== TEST FORM ERROR ===');
      console.error('Error details:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      console.log('Setting isSubmitting to false');
      setIsSubmitting(false);
    }

    console.log('=== TEST FORM SUBMIT END ===');
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Test Property Form with Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter property title"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        {/* Image upload section */}
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
            </div>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Test Property with Image'}
        </Button>
      </form>
    </div>
  );
}
