// app/profile/index.tsx - Clean White Theme Profile
import { USER } from "@/data/USER";
import useAuthStore from "@/stores/authStore";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");
const GRID_GAP = 12;
const ITEM_SIZE = (width - 32 - GRID_GAP) / 2; // 2 columns with padding

const ProfileScreen = () => {
  const storedUser = useAuthStore((state: any) => state.user);
  const user = storedUser
    ? {
        ...USER,
        first_name: storedUser.name?.split(" ")[0] || USER.first_name,
        last_name:
          storedUser.name?.split(" ").slice(1).join(" ") || USER.last_name,
        email: storedUser.email || USER.email,
        tel: storedUser.phone || USER.tel,
        avatar: storedUser.avatar || USER.avatar,
      }
    : USER;
  const [activeTab, setActiveTab] = useState<"properties" | "favorites">(
    "properties",
  );
  const storeLogout = useAuthStore((state: any) => state.logout);
  // Calcul des statistiques
  const totalProperties = user.properties.length;

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: () => {
          storeLogout();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec options */}
        <View className="flex-row justify-between items-center px-6 py-4">
          <TouchableOpacity>
            {/* Placeholder for left action if needed */}
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-bold">Mon Profil</Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-gray-100 p-2 rounded-full"
          >
            <MaterialIcons name="logout" size={20} color="#F43F5E" />
          </TouchableOpacity>
        </View>

        {/* Section Profil */}
        <View className="items-center mt-2 px-6">
          {/* Photo de profil */}
          <View className="relative shadow-lg shadow-gray-200">
            <Image
              source={require("../../assets/images/avatar.jpg")}
              className="w-28 h-28 rounded-full border-4 border-white"
            />
            {/* Badge vérifié */}
            <View className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
              <MaterialIcons name="check" size={12} color="white" />
            </View>
          </View>

          {/* Nom d'utilisateur */}
          <Text className="text-gray-900 text-2xl font-bold mt-4">
            {user.first_name} {user.last_name}
          </Text>
          <Text className="text-gray-500 text-sm font-medium">
            investisseur
          </Text>

          {/* Statistiques */}
          {/* r */}
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-gray-100 mt-4 mx-6">
          <TouchableOpacity
            className={`flex-1 pb-3 items-center ${activeTab === "properties" ? "border-b-2 border-rose-500" : ""}`}
            onPress={() => setActiveTab("properties")}
          >
            <Text
              className={`font-semibold text-base ${activeTab === "properties" ? "text-rose-500" : "text-gray-400"}`}
            >
              Mes Biens
            </Text>
          </TouchableOpacity>
        </View>

        {/* Listing Properties */}
        <View className="p-4 pt-6">
          <View className="flex-row flex-wrap justify-between">
            {/* Add New Card */}
            <TouchableOpacity
              className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 items-center justify-center mb-4"
              style={{ width: ITEM_SIZE, height: ITEM_SIZE * 1.2 }}
            >
              <View className="w-12 h-12 rounded-full bg-rose-50 items-center justify-center mb-2">
                <Ionicons name="add" size={24} color="#F43F5E" />
              </View>
              <Text className="text-gray-500 font-medium">Ajouter</Text>
            </TouchableOpacity>

            {user.properties.map((property) => (
              <TouchableOpacity
                key={property.id}
                className="bg-white rounded-2xl mb-4 shadow-sm shadow-gray-200 border border-gray-100 overflow-hidden"
                style={{ width: ITEM_SIZE, height: ITEM_SIZE * 1.2 }}
              >
                <Image
                  source={{ uri: property.image }}
                  className="w-full h-32"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text
                    className="text-gray-900 font-bold text-sm mb-1"
                    numberOfLines={1}
                  >
                    {property.name}
                  </Text>
                  <View className="flex-row items-center justify-between mt-1">
                    <Text className="text-rose-500 font-semibold text-xs">
                      ${property.price}/nuit
                    </Text>
                    <View className="flex-row items-center bg-yellow-50 px-1.5 py-0.5 rounded-md">
                      <FontAwesome5
                        name="star"
                        size={8}
                        color="#F59E0B"
                        solid
                      />
                      <Text className="text-yellow-700 text-[10px] ml-1 font-bold">
                        {property.rating}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-400 text-[10px] mt-2 capitalize">
                    {property.category}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
