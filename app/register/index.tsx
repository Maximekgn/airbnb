import { COLORS } from "@/constants/COLORS";
import { registerUser } from "@/services/auth";
import useAuthStore from "@/stores/authStore";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const ONBOARDING_KEY = "onboardingSeen";

const RegisterScreen = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const storeLogin = useAuthStore((state) => state.login);

  useEffect(() => {
    AsyncStorage.setItem(ONBOARDING_KEY, "true");
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }

    if (!form.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email invalide";
    }

    if (!form.tel.trim()) {
      newErrors.tel = "Le téléphone est requis";
    }

    if (!form.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!termsAccepted) {
      Alert.alert("Erreur", "Veuillez accepter les conditions générales");
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        tel: form.tel,
        password: form.password,
      });

      if (response.success && response.user) {
        // Auto-login après l'inscription
        await AsyncStorage.setItem(ONBOARDING_KEY, "true");

        // Le token n'est pas retourné à l'inscription selon les spécifications
        // L'utilisateur doit se connecter après l'inscription
        Alert.alert(
          "Succès",
          "Votre compte a été créé avec succès. Veuillez vous connecter.",
          [
            {
              text: "OK",
              onPress: () => {
                router.replace("/login");
              },
            },
          ],
        );
      } else {
        const errorMessage =
          response.message || "Une erreur est survenue lors de l'inscription";
        Alert.alert("Erreur d'inscription", errorMessage);

        // Afficher les erreurs de validation si disponibles
        if (response.errors) {
          const newErrors: Record<string, string> = {};
          Object.entries(response.errors).forEach(
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

  const updateField = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
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
          <View className="items-center mt-10 mb-8">
            <View className="w-20 h-20 bg-primaryLight rounded-2xl items-center justify-center mb-4 rotate-3">
              <Ionicons name="home" size={40} color={COLORS.primary} />
            </View>
            <Text className="text-3xl font-bold text-ink text-center">
              Rejoignez-nous
            </Text>
            <Text className="text-muted text-center mt-2 text-base">
              Créez votre compte pour explorer des logements d&apos;exception.
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-5">
            <View className="flex-row space-x-4">
              {/* First Name */}
              <View className="flex-1">
                <Text className="text-ink font-medium mb-2 ml-1">Prénom</Text>
                <View
                  className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                    errors.firstName ? "border-red-500" : "border-border"
                  }`}
                >
                  <Feather
                    name="user"
                    size={20}
                    color={errors.firstName ? "#EF4444" : COLORS.muted}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-ink"
                    placeholder="John"
                    placeholderTextColor={COLORS.muted}
                    value={form.firstName}
                    onChangeText={(text) => updateField("firstName", text)}
                    editable={!loading}
                  />
                </View>
                {errors.firstName && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.firstName}
                  </Text>
                )}
              </View>

              {/* Last Name */}
              <View className="flex-1">
                <Text className="text-ink font-medium mb-2 ml-1">Nom</Text>
                <View
                  className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                    errors.lastName ? "border-red-500" : "border-border"
                  }`}
                >
                  <Feather
                    name="user"
                    size={20}
                    color={errors.lastName ? "#EF4444" : COLORS.muted}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-ink"
                    placeholder="Doe"
                    placeholderTextColor={COLORS.muted}
                    value={form.lastName}
                    onChangeText={(text) => updateField("lastName", text)}
                    editable={!loading}
                  />
                </View>
                {errors.lastName && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.lastName}
                  </Text>
                )}
              </View>
            </View>

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
                  value={form.email}
                  onChangeText={(text) => updateField("email", text)}
                  editable={!loading}
                />
              </View>
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Phone */}
            <View>
              <Text className="text-ink font-medium mb-2 ml-1">Téléphone</Text>
              <View
                className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                  errors.tel ? "border-red-500" : "border-border"
                }`}
              >
                <Feather
                  name="smartphone"
                  size={20}
                  color={errors.tel ? "#EF4444" : COLORS.muted}
                />
                <TextInput
                  className="flex-1 ml-3 text-ink"
                  placeholder="+33 6 12 34 56 78"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="phone-pad"
                  value={form.tel}
                  onChangeText={(text) => updateField("tel", text)}
                  editable={!loading}
                />
              </View>
              {errors.tel && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.tel}
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
                  value={form.password}
                  onChangeText={(text) => updateField("password", text)}
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

          {/* Terms */}
          <TouchableOpacity
            onPress={() => setTermsAccepted(!termsAccepted)}
            disabled={loading}
            className="flex-row mt-6 items-start"
          >
            <View
              className={`w-5 h-5 rounded border items-center justify-center ${
                termsAccepted
                  ? "bg-primary border-primary"
                  : "border-border bg-surface"
              }`}
            >
              {termsAccepted && (
                <Ionicons name="checkmark" size={14} color="white" />
              )}
            </View>
            <Text className="ml-3 text-muted text-sm flex-1 leading-5">
              En vous inscrivant, vous acceptez nos{" "}
              <Text className="text-primary font-bold">
                Conditions générales{" "}
              </Text>
              et notre{" "}
              <Text className="text-primary font-bold">
                Politique de confidentialité
              </Text>
              .
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading || !termsAccepted}
            className={`rounded-xl py-4 items-center mt-8 shadow-lg mb-6 ${
              loading || !termsAccepted
                ? "bg-primaryLight"
                : "bg-primary active:bg-primaryDark"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Créer un compte
              </Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-muted">Déjà un compte ?</Text>
            <Link href="/login" asChild>
              <TouchableOpacity disabled={loading}>
                <Text className="text-primary font-bold ml-2">
                  Se connecter
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
