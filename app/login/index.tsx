import { COLORS } from "@/constants/COLORS";
import { loginUser } from "@/services/auth";
import useAuthStore from "@/stores/authStore";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ONBOARDING_KEY = "onboardingSeen";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const storeLogin = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    AsyncStorage.setItem(ONBOARDING_KEY, "true");
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide";
    }

    if (!password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(email, password);

      if (result.success && result.user && result.access_token) {
        storeLogin(result.user, result.access_token);
        router.replace("/home");
      } else {
        const errorMessage = result.message || "Identifiants incorrects";
        Alert.alert("Erreur de connexion", errorMessage);

        // Afficher les erreurs de validation si disponibles
        if (result.errors) {
          const newErrors: Record<string, string> = {};
          Object.entries(result.errors).forEach(
            ([key, value]: [string, any]) => {
              newErrors[key] = Array.isArray(value) ? value[0] : value;
            },
          );
          setErrors(newErrors);
        }
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur inattendue s'est produite");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header Section */}
          <View className="items-center mt-16 mb-10">
            <View className="w-20 h-20 bg-primaryLight rounded-2xl items-center justify-center mb-4 -rotate-3">
              <Ionicons name="home" size={40} color={COLORS.primary} />
            </View>
            <Text className="text-3xl font-bold text-ink text-center">
              Bon retour !
            </Text>
            <Text className="text-muted text-center mt-2 text-base">
              Connectez-vous pour accéder à votre compte.
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-5">
            {/* Email */}
            <View>
              <Text className="text-ink font-medium mb-2 ml-1">Email</Text>
              <View
                className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
              >
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={errors.email ? "#EF4444" : COLORS.muted}
                />
                <TextInput
                  className="flex-1 ml-3 text-ink"
                  placeholder="exemple@email.com"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      const newErrors = { ...errors };
                      delete newErrors.email;
                      setErrors(newErrors);
                    }
                  }}
                  editable={!loading}
                />
              </View>
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Password */}
            <View>
              <Text className="text-ink font-medium mb-2 ml-1">
                Mot de passe
              </Text>
              <View
                className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
              >
                <Feather
                  name="lock"
                  size={20}
                  color={errors.password ? "#EF4444" : COLORS.muted}
                />
                <TextInput
                  className="flex-1 ml-3 text-ink"
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.muted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      const newErrors = { ...errors };
                      delete newErrors.password;
                      setErrors(newErrors);
                    }
                  }}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color={COLORS.muted}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.password}
                </Text>
              )}
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="mt-4 self-end" disabled={loading}>
            <Text className="text-primary font-semibold">
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`rounded-xl py-4 items-center mt-8 shadow-lg ${
              loading ? "bg-primaryLight" : "bg-primary active:bg-primaryDark"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Se connecter</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center items-center mt-8">
            <Text className="text-muted">Pas encore de compte ?</Text>
            <Link href="/register" asChild>
              <TouchableOpacity disabled={loading}>
                <Text className="text-primary font-bold ml-2">
                  S&apos;inscrire
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
