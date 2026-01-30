import axios from "axios";
// import Constants from "expo-constants";



// Créer une instance axios avec la configuration de base
export const api = axios.create({
  baseURL: "http://192.168.1.68:3000", // Remplace par l'URL de ton backend
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis AsyncStorage ou SecureStore
    const token = ""; // À implémenter avec AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs HTTP globales
    if (error.response?.status === 401) {
      console.error("❌ Session expirée");
    } else if (error.response?.status === 500) {
      console.error("❌ Erreur serveur:", error.response.data);
    } else if (
      error.code === "ECONNREFUSED" ||
      error.message === "Network Error"
    ) {
      console.error(
        "❌ Impossible de se connecter au serveur sur",
        api.defaults.baseURL,
      );
      console.log("💡 Vérifie que:");
      console.log(
        "  1. Ton serveur backend est lancé sur",
        api.defaults.baseURL,
      );
      console.log("  2. L'URL du backend est correcte dans services/api.ts");
      console.log("  3. Le CORS est configuré sur ton serveur");
    } else if (error.request && !error.response) {
      console.error("❌ Pas de réponse du serveur:", error.message);
    } else {
      console.error("❌ Erreur réseau:", error.message);
    }
    return Promise.reject(error);
  },
);
