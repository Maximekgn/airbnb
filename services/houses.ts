import { HOUSES } from "@/data/HOUSES";

export interface House {
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

export const addHouse = (house: Omit<House, "id" | "isSelected" | "rating" | "owner">) => {
  const newHouse: House = {
    ...house,
    id: Math.random().toString(36).substr(2, 9),
    isSelected: false,
    rating: 0, // Default rating for new houses
    owner: { // Mock owner for now as valid data is needed
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
        phone: "+1 234 567 890",
        email: "user@example.com"
    }
  };
  HOUSES.push(newHouse);
  return newHouse;
};
