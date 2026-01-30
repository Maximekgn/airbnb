import { register } from "@/services/auth";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
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
  const storeLogin = useAuthStore((state: any) => state.login);

  useEffect(() => {
    AsyncStorage.setItem(ONBOARDING_KEY, "true");
  }, []);

  const handleRegister = async () => {
    // Basic validation
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.tel
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      const response = await register(
        form.email,
        form.password,
        form.firstName,
        form.lastName,
        form.tel,
      );

      if (response.user) {
        await AsyncStorage.setItem(ONBOARDING_KEY, "true");
        storeLogin(response.user, response.token);
        Alert.alert("Succès", "Votre compte a été créé avec succès", [
          { text: "OK", onPress: () => router.replace("/home") },
        ]);
      } else {
        Alert.alert(
          "Erreur",
          response.message || "Une erreur est survenue lors de l'inscription",
        );
      }
    } catch (error) {
      Alert.alert("Erreur", "Une erreur inattendue s'est produite");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
            <View className="w-20 h-20 bg-rose-50 rounded-2xl items-center justify-center mb-4 rotate-3">
              <Ionicons name="home" size={40} color="#F43F5E" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 text-center">
              Rejoignez-nous
            </Text>
            <Text className="text-gray-500 text-center mt-2 text-base">
              Créez votre compte pour explorer des logements d'exception.
            </Text>
          </View>

          {/* Social Auth Buttons (Visual only for now) */}
          <View className="flex-row justify-between mb-8">
            <TouchableOpacity className="flex-1 flex-row bg-white border border-gray-200 p-4 rounded-xl items-center justify-center mr-2 shadow-sm">
              <FontAwesome name="google" size={20} color="#DB4437" />
              <Text className="ml-3 font-semibold text-gray-700">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row bg-white border border-gray-200 p-4 rounded-xl items-center justify-center ml-2 shadow-sm">
              <FontAwesome name="apple" size={20} color="black" />
              <Text className="ml-3 font-semibold text-gray-700">Apple</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-gray-200" />
            <Text className="mx-4 text-gray-400 font-medium">
              Ou continuer avec email
            </Text>
            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>

          {/* Form Fields */}
          <View className="space-y-5">
            <View className="flex-row space-x-4">
              {/* First Name */}
              <View className="flex-1">
                <Text className="text-gray-700 font-medium mb-2 ml-1">
                  Prénom
                </Text>
                <View className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 flex-row items-center focus:border-rose-500 focus:bg-white transition-colors">
                  <Feather name="user" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900"
                    placeholder="John"
                    placeholderTextColor="#9CA3AF"
                    value={form.firstName}
                    onChangeText={(text) =>
                      setForm({ ...form, firstName: text })
                    }
                  />
                </View>
              </View>

              {/* Last Name */}
              <View className="flex-1">
                <Text className="text-gray-700 font-medium mb-2 ml-1">Nom</Text>
                <View className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 flex-row items-center focus:border-rose-500 focus:bg-white transition-colors">
                  <Feather name="user" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-gray-900"
                    placeholder="Doe"
                    placeholderTextColor="#9CA3AF"
                    value={form.lastName}
                    onChangeText={(text) =>
                      setForm({ ...form, lastName: text })
                    }
                  />
                </View>
              </View>
            </View>

            {/* Email */}
            <View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">Email</Text>
              <View className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 flex-row items-center focus:border-rose-500 focus:bg-white transition-colors">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color="#9CA3AF"
                />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="exemple@email.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                />
              </View>
            </View>

            {/* Phone */}
            <View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">
                Téléphone
              </Text>
              <View className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 flex-row items-center focus:border-rose-500 focus:bg-white transition-colors">
                <Feather name="smartphone" size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="+33 6 12 34 56 78"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={form.tel}
                  onChangeText={(text) => setForm({ ...form, tel: text })}
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text className="text-gray-700 font-medium mb-2 ml-1">
                Mot de passe
              </Text>
              <View className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 flex-row items-center focus:border-rose-500 focus:bg-white transition-colors">
                <Feather name="lock" size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-3 text-gray-900"
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={form.password}
                  onChangeText={(text) => setForm({ ...form, password: text })}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Terms */}
          <View className="flex-row mt-6 items-start">
            <View className="mt-1 w-5 h-5 rounded border border-rose-500 bg-rose-500 items-center justify-center">
              <Ionicons name="checkmark" size={14} color="white" />
            </View>
            <Text className="ml-3 text-gray-500 text-sm flex-1 leading-5">
              En vous inscrivant, vous acceptez nos{" "}
              <Text className="text-rose-500 font-bold">
                Conditions générales{" "}
              </Text>
              et notre{" "}
              <Text className="text-rose-500 font-bold">
                Politique de confidentialité
              </Text>
              .
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            className="bg-rose-500 rounded-xl py-4 items-center mt-8 shadow-lg shadow-rose-200 active:bg-rose-600 mb-6"
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
            <Text className="text-gray-500">Déjà un compte ?</Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-rose-500 font-bold ml-2">
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
