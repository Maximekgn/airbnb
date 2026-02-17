import { api } from "./api";

// Interface pour une catégorie
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

// Récupérer toutes les catégories
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/categories");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories: ", error);
    throw error;
  }
};

// Récupérer une catégorie par ID
export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la catégorie ${id}: `,
      error,
    );
    throw error;
  }
};
