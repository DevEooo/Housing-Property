import { useState } from 'react';
import { Button } from '../../components/dashboard ui/ui/button.tsx';
import { useUser } from '../../contexts/UserContext';
import { addProperty } from '../../../function/models/propertyService';

export function FirebaseTest() {
  const user = useUser();
  const [testResult, setTestResult] = useState<string>('');

  const testFirebaseConnection = async () => {
    if (!user) {
      setTestResult('❌ User not authenticated. Please log in first.');
      return;
    }

    try {
      // Try to add a test property
      const testProperty = {
        userId: user.uid,
        title: 'Test Property',
        description: 'This is a test property to verify Firebase connection',
        price: 100000,
        location: 'Test Location',
        bedrooms: 2,
        bathrooms: 1,
        size: 1000,
        imageUrl: '',
      };

      const docId = await addProperty(testProperty);
      setTestResult(`✅ Firebase connection successful! Test property created with ID: ${docId}`);

      // Clean up the test property
      // Note: In a real scenario, you'd want to delete this test property
      console.log('Test property created successfully:', docId);

    } catch (error) {
      console.error('Firebase test failed:', error);
      setTestResult(`❌ Firebase connection failed: ${error}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Firebase Connection Test</h2>
      <p className="mb-4 text-muted-foreground">
        Click the button below to test your Firebase connection. Make sure you're logged in first.
      </p>

      <Button onClick={testFirebaseConnection} className="mb-4">
        Test Firebase Connection
      </Button>

      {testResult && (
        <div className={`p-4 rounded-lg ${
          testResult.startsWith('✅')
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          <pre className="whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Troubleshooting:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Make sure you're logged in to the application</li>
          <li>Check that your .env file has the correct Firebase credentials</li>
          <li>Verify your Firebase project is set up and the API key is valid</li>
          <li>Check the browser console for detailed error messages</li>
        </ul>
      </div>
    </div>
  );
}
