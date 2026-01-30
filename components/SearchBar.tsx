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
    <View className="flex-row items-center mx-4 my-3 bg-surface border border-border rounded-xl px-4 py-3">
      <Ionicons name="search-outline" size={22} color="#6B7280" />
      <TextInput
        placeholder="Search Place..."
        placeholderTextColor="#6B7280"
        className="flex-1 ml-3 text-base text-ink"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity
        className="bg-primary rounded-lg p-2"
        onPress={handleSearch}
        activeOpacity={0.8}
      >
        <Ionicons name="search" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
