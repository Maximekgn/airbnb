import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

interface HouseCardProps {
  image: string;
  price: string | number;
  name: string;
  location: string;
  onPress?: () => void;
}

const HouseCard = ({
  image,
  price,
  name,
  location,
  onPress,
}: HouseCardProps) => {
  return (
    <TouchableOpacity
      className="mb-4 rounded-2xl overflow-hidden"
      style={{ width: cardWidth }}
      onPress={onPress}
    >
      {/* Image Container */}
      <ImageBackground
        source={{ uri: image }}
        className="w-full rounded-2xl relative"
        style={{ height: cardWidth * 1.1 }}
        resizeMode="cover"
      >
        {/* Slight dark overlay to "assombrir un peu l'image" */}
        <View
          pointerEvents="none"
          className="absolute inset-0 rounded-2xl"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
        />

        

        {/* Price Tag */}
        <View className="absolute top-3 right-3 bg-gray-800/80 rounded-full px-2 py-1">
          <Text className="text-white text-xs font-semibold">
            {price} FCFA/ Mois
          </Text>
        </View>

        {/* Name and Location */}
        <View className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <Text className="text-white font-bold text-sm">{name}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="location" size={12} color="#ccc" />
            <Text className="text-white text-xs ml-1">{location}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default HouseCard;
