// stores/authStore.ts
import { getCurrentUser, logoutUser as logoutService } from "@/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../interfaces/User";

interface AuthStore {
  // État
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  isLoading: boolean;

  // Actions
  login: (userData: User, authToken: string) => void;
  logout: () => Promise<void>;
  updateUser: (userData: User) => void;
  clearAuth: () => void;
  setHasHydrated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthStore>(
  persist(
    (set, get) => ({
      // État initial
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      isLoading: false,

      // Actions
      login: (userData: User, authToken: string) => {
        set({
          user: userData,
          token: authToken,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        await logoutService();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userData: User) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },

      setIsLoading: (value: boolean) => {
        set({ isLoading: value });
      },

      // Vérifier si l'utilisateur est encore authentifié
      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const token = await AsyncStorage.getItem("authToken");

          if (token) {
            const result = await getCurrentUser();
            if (result.success && result.user) {
              set({
                user: result.user,
                token,
                isAuthenticated: true,
              });
            } else {
              // Le token est expiré ou invalide
              set({
                user: null,
                token: null,
                isAuthenticated: false,
              });
              await AsyncStorage.removeItem("authToken");
            }
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          console.error(
            "Erreur lors de la vérification d'authentification:",
            error,
          );
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage", // nom unique pour le stockage
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      // Persister seulement user, token, et isAuthenticated
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
