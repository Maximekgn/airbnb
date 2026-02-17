import { Property } from "@/interfaces/Property";
import { api } from "./api";

// Interface pour la création de propriété
export interface CreatePropertyData {
  price: string;
  name: string;
  location: string;
  categoryId: string; // UUID de la catégorie
  description: string;
  bedrooms: number;
  bathrooms: number;
  garage: boolean;
  wifi: boolean;
  kitchen: boolean;
}

// Récupérer toutes les propriétés
export const getAllProperties = async (): Promise<Property[]> => {
  try {
    const response = await api.get("/properties");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des propriétés: ", error);
    throw error;
  }
};

// Récupérer une propriété par ID
export const getPropertyById = async (id: string): Promise<Property> => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la propriété ${id}: `,
      error,
    );
    throw error;
  }
};

// Créer une nouvelle propriété avec upload d'images
export const createProperty = async (
  propertyData: CreatePropertyData,
  mainImage: { uri: string; type: string; name: string },
  galleryImages: { uri: string; type: string; name: string }[],
): Promise<Property> => {
  try {
    const formData = new FormData();

    // Ajouter les données de la propriété
    Object.entries(propertyData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Ajouter l'image principale
    formData.append("image", {
      uri: mainImage.uri,
      type: mainImage.type,
      name: mainImage.name,
    } as unknown);

    // Ajouter les images de la galerie (exactement 5)
    galleryImages.forEach((img) => {
      formData.append("gallery", {
        uri: img.uri,
        type: img.type,
        name: img.name,
      } as unknown);
    });

    const response = await api.post("/properties", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la propriété: ", error);
    throw error;
  }
};

// Ajouter une nouvelle propriété (version legacy)
export const addHouse = async (
  house: Omit<Property, "id" | "isSelected" | "rating">,
): Promise<Property> => {
  try {
    const response = await api.post("/properties", {
      ...house,
      isSelected: false,
      rating: 0,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la propriété: ", error);
    throw error;
  }
};

// Mettre à jour une propriété
export const updateProperty = async (
  id: string,
  house: Partial<Property>,
): Promise<Property> => {
  try {
    const response = await api.patch(`/properties/${id}`, house);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de la propriété ${id}: `,
      error,
    );
    throw error;
  }
};

// Supprimer une propriété
export const deleteProperty = async (id: string): Promise<void> => {
  try {
    await api.delete(`/properties/${id}`);
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de la propriété ${id}: `,
      error,
    );
    throw error;
  }
};
