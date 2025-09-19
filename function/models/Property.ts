export interface Property {
  id?: string;            // auto, randomized id
  title: string;          // Judul properti. contoh: Villa, Griya, dkk.
  description: string;    
  price: number;          
  location: string;       
  bedrooms: number;       
  bathrooms: number;      
  size: number;           // Ukuran propertinya
  imageUrl?: string;      // image dengan data-type 'string' untuk pathname.
  createdAt?: Date;       // auto
}
