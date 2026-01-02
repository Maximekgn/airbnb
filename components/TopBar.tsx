import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TopBar = () => {
  const LOCATION = "Lomé, TOGO";
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      {/* Location */}
      <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2">
        <Ionicons name="location-outline" size={18} color="#666" />
        <Text className="ml-2 text-gray-700 font-medium">{LOCATION}</Text>
      </View>

      {/* Right side icons */}
      <View className="flex-row items-center gap-3">
        <TouchableOpacity className="bg-gray-100 rounded-full p-2">
          <Ionicons name="chatbubble-outline" size={22} color="#333" />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/avatar.jpg')}
          className="w-10 h-10 rounded-full"
        />
      </View>
    </View>
  );
};

export default TopBar;
