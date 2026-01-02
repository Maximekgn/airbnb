import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = () => {
  return (
    <View className="flex-row items-center mx-4 my-3 bg-gray-100 rounded-xl px-4 py-3">
      <Ionicons name="search-outline" size={22} color="#999" />
      <TextInput
        placeholder="Search Place..."
        placeholderTextColor="#999"
        className="flex-1 ml-3 text-base text-gray-700"
      />
      <TouchableOpacity className="bg-white rounded-lg p-2 shadow-sm">
        <Ionicons name="options-outline" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
