import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface EmptyStateProps {
  type: "loading" | "error" | "no-properties";
  errorMessage?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, errorMessage }) => {
  const router = useRouter();

  if (type === "loading") {
    return (
      <View className="flex-1 justify-center items-center py-12">
        <View className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 justify-center items-center mb-4">
          <MaterialCommunityIcons name="home" size={32} color="white" />
        </View>
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Chargement...
        </Text>
        <Text className="text-sm text-gray-500">
          Nous trouvons les meilleures propriétés pour vous
        </Text>
      </View>
    );
  }

  if (type === "error") {
    return (
      <View className="flex-1 justify-center items-center py-12 px-4">
        <View className="w-16 h-16 rounded-full bg-red-100 justify-center items-center mb-4">
          <FontAwesome name="exclamation-circle" size={32} color="#ef4444" />
        </View>
        <Text className="text-lg font-semibold text-gray-800 mb-2 text-center">
          Oups! Une erreur est survenue
        </Text>
        <Text className="text-sm text-gray-600 text-center mb-6">
          {errorMessage ||
            "Impossible de charger les propriétés. Vérifiez votre connexion."}
        </Text>
        <Pressable
          onPress={() => router.replace("/home")}
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Réessayer</Text>
        </Pressable>
      </View>
    );
  }

  // type === "no-properties"
  return (
    <View className="flex-1 justify-center items-center py-12 px-4">
      <View className="w-20 h-20 rounded-full0 justify-center items-center mb-4">
        <MaterialCommunityIcons name="magnify" size={40} color="#3b82f6" />
      </View>
      <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
        Aucune propriété trouvée
      </Text>
      <Text className="text-sm text-gray-600 text-center mb-6 leading-5">
        Il n&apos;y a pas de propriété disponible pour le moment. 
      </Text>
      
    </View>
  );
};

export default EmptyState;
