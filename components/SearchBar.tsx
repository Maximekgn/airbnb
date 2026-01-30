import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const value = query.trim();
    router.push({ pathname: "/houses", params: value ? { s: value } : {} });
  };

  return (
    <View className="flex-row items-center mx-4 my-3 bg-gray-100 rounded-xl px-4 py-3">
      <Ionicons name="search-outline" size={22} color="#999" />
      <TextInput
        placeholder="Search Place..."
        placeholderTextColor="#999"
        className="flex-1 ml-3 text-base text-gray-700"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity
        className="bg-white rounded-lg p-2 shadow-sm"
        onPress={handleSearch}
        activeOpacity={0.8}
      >
        <Ionicons name="options-outline" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
