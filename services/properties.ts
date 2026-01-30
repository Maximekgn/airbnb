import { Property } from "@/interfaces/Property";
import { api } from "./api";

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

// Ajouter une nouvelle propriété
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
    const response = await api.put(`/properties/${id}`, house);
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
