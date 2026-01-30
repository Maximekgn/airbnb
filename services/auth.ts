import { api } from "./api";
import { User, LoginResponse, RegisterPayload } from "@/interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Inscription - Crée un nouveau compte
 * POST /users
 */
export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await api.post<User>("/users", {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      tel: payload.tel,
      password: payload.password,
      ...(payload.avatar && { avatar: payload.avatar }),
    });
    return {
      success: true,
      user: response.data,
      message: "Inscription réussie",
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Erreur lors de l'inscription";
    return {
      success: false,
      user: null,
      message: errorMessage,
      errors: error.response?.data?.errors,
    };
  }
};

/**
 * Connexion - Authentifie l'utilisateur et retourne un JWT
 * POST /auth/login
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
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
 * GET /users/me
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get<User>("/users/me");
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
  } catch (error) {
    return {
      success: false,
      message: "Erreur lors de la déconnexion",
    };
  }
};
    
  

