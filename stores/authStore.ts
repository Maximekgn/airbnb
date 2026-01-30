// stores/authStore.js
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../interfaces/User';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // État initial
      user: null,
      token: null,
      isAuthenticated: false,
      
      // Actions
      login: (userData: User, authToken: string) => {
        set({
          user: userData,
          token: authToken,
          isAuthenticated: true,
        });
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      
      updateUser: (userData: User) => {
        set((state: { user: User }) => ({
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
    }),
    {
      name: 'auth-storage', // nom unique pour le stockage
      storage: createJSONStorage(() => AsyncStorage),
      // Optionnel: spécifier quels champs persister
      // partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export default useAuthStore;