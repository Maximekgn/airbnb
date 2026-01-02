import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CategoryButtonProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

const CategoryButton = ({
  label,
  isActive = false,
  onPress,
}: CategoryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full mr-2 ${
        isActive ? "bg-gray-900" : "bg-white border border-gray-200"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          isActive ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
