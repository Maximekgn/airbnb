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
        isActive ? "bg-primary" : "bg-surface border border-border"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          isActive ? "text-white" : "text-ink"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;
