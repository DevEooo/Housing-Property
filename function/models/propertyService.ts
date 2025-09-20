import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { Property } from './Property';

export const addProperty = async (property: Omit<Property, 'id' | 'createdAt'>) => {
  console.log('=== ADD PROPERTY START ===');
  console.log('Property data to add:', property);

  try {
    const docRef = await addDoc(collection(db, 'properties'), {
      ...property,
      createdAt: new Date(),
    });
    console.log('Document added with ID:', docRef.id);
    console.log('=== ADD PROPERTY SUCCESS ===');
    return docRef.id;
  } catch (error) {
    console.error('=== ADD PROPERTY ERROR ===');
    console.error('Error adding document:', error);
    throw error;
  }
};

export const getProperties = async (userId: string) => {
  console.log('=== GET PROPERTIES START ===');
  console.log('User ID:', userId);

  try {
    const q = query(collection(db, 'properties'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const properties = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
    console.log('Found properties:', properties.length);
    console.log('=== GET PROPERTIES SUCCESS ===');
    return properties;
  } catch (error) {
    console.error('=== GET PROPERTIES ERROR ===');
    console.error('Error getting properties:', error);
    throw error;
  }
};

export const updateProperty = async (id: string, property: Partial<Property>) => {
  console.log('=== UPDATE PROPERTY START ===');
  console.log('Property ID:', id);
  console.log('Update data:', property);

  try {
    const docRef = doc(db, 'properties', id);
    await updateDoc(docRef, property);
    console.log('=== UPDATE PROPERTY SUCCESS ===');
  } catch (error) {
    console.error('=== UPDATE PROPERTY ERROR ===');
    console.error('Error updating property:', error);
    throw error;
  }
};

export const deleteProperty = async (id: string) => {
  console.log('=== DELETE PROPERTY START ===');
  console.log('Property ID:', id);

  try {
    const docRef = doc(db, 'properties', id);
    await deleteDoc(docRef);
    console.log('=== DELETE PROPERTY SUCCESS ===');
  } catch (error) {
    console.error('=== DELETE PROPERTY ERROR ===');
    console.error('Error deleting property:', error);
    throw error;
  }
};
