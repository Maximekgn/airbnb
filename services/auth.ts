import { api } from "./api";
import { User, LoginResponse, RegisterPayload, LoginPayload } from "@/interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Inscription - Crée un nouveau compte
 * POST /auth/register (selon la documentation)
 */
export const registerUser = async (payload: RegisterPayload) => {
  try {
    // Préparer les données de base
    const data: any = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    };

    // Ajouter les champs optionnels
    if (payload.tel) {
      data.tel = payload.tel;
    }

    const response = await api.post<User>("/auth/register", data);

    return {
      success: true,
      user: response.data,
      message: "Inscription réussie",
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.[0] || // Gère les erreurs de validation sous forme de tableau
      "Erreur lors de l'inscription";

    return {
      success: false,
      user: null,
      message: errorMessage,
      errors: error.response?.data?.message || error.response?.data?.errors,
    };
  }
};

/**
 * Connexion - Authentifie l'utilisateur et retourne un JWT
 * POST /auth/login
 */
export const loginUser = async (payload: LoginPayload) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      email: payload.email,
      password: payload.password,
    });

    const { access_token, user } = response.data;

    // Stocker le token dans AsyncStorage
    await AsyncStorage.setItem("authToken", access_token);

    return {
      success: true,
      access_token,
      user,
      message: "Connexion réussie",
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.message?.[0] ||
      "Erreur lors de la connexion";
    return {
      success: false,
      access_token: null,
      user: null,
      message: errorMessage,
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Récupérer le profil actuel
 * GET /users/profile
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get<User>("/users/profile");
    return {
      success: true,
      user: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      user: null,
      message:
        error.response?.data?.message || "Erreur lors de la récupération du profil",
    };
  }
};

/**
 * Déconnexion - Supprime le token du stockage
 */
export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    return {
      success: true,
      message: "Déconnexion réussie",
    };
  } catch (_error) {
    return {
      success: false,
      message: "Erreur lors de la déconnexion",
    };
  }
};
    
  

