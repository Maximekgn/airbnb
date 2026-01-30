export interface Property {
  id: string;
  image: string;
  price: string;
  rating: number;
  name: string;
  location: string;
  category: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isSelected: boolean;
  description: string;
  owner: {
    name: string;
    avatar: string;
    phone: string;
    email: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    garage: boolean;
    parking: number;
    wifi: boolean;
    kitchen: string;
  };
  gallery: string[];
}
