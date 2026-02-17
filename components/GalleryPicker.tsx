import { COLORS } from "@/constants/COLORS";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface GalleryImage {
  uri: string;
  type: string;
  name: string;
}

interface GalleryPickerProps {
  images: GalleryImage[];
  onImagesChange: (images: GalleryImage[]) => void;
  maxImages?: number;
}

const REQUIRED_IMAGES = 5;

export const GalleryPicker: React.FC<GalleryPickerProps> = ({
  images,
  onImagesChange,
  maxImages = REQUIRED_IMAGES,
}) => {
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Accès refusé",
        "Nous avons besoin de l'accès à votre galerie.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultiple: true,
      aspect: [4, 3],
      quality: 0.8,
      selectionLimit: maxImages - images.length,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => ({
        uri: asset.uri,
        type: "image/jpeg",
        name: asset.fileName || `image-${Date.now()}.jpg`,
      }));

      const updatedImages = [...images, ...newImages].slice(0, maxImages);
      onImagesChange(updatedImages);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const isComplete = images.length === REQUIRED_IMAGES;

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-ink font-semibold text-base">
          Galerie ({images.length}/{REQUIRED_IMAGES})
        </Text>
        {isComplete && (
          <View className="flex-row items-center bg-green-50 px-3 py-1 rounded-full">
            <MaterialIcons name="check-circle" size={16} color="#10B981" />
            <Text className="text-green-700 text-xs font-semibold ml-1">
              Complet
            </Text>
          </View>
        )}
      </View>

      {/* Grid des images */}
      <FlatList
        data={images}
        keyExtractor={(_, index) => `gallery-${index}`}
        numColumns={3}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
        renderItem={({ item, index }) => (
          <View className="flex-1 relative">
            <Image
              source={{ uri: item.uri }}
              className="w-full h-24 rounded-lg bg-gray-200"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
            >
              <MaterialIcons name="close" size={16} color="white" />
            </TouchableOpacity>
            <View className="absolute bottom-1 right-1 bg-black/60 rounded-full px-1.5 py-0.5">
              <Text className="text-white text-xs font-semibold">
                {index + 1}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Add More Button */}
      {images.length < REQUIRED_IMAGES && (
        <TouchableOpacity
          onPress={pickImage}
          className="items-center justify-center border-2 border-dashed border-border rounded-lg py-8 bg-primaryLight/30"
        >
          <MaterialIcons name="image" size={40} color={COLORS.primary} />
          <Text className="text-primary font-semibold mt-2">
            Ajouter des images
          </Text>
          <Text className="text-muted text-xs mt-1">
            {REQUIRED_IMAGES - images.length} image
            {REQUIRED_IMAGES - images.length > 1 ? "s" : ""} manquante
            {REQUIRED_IMAGES - images.length > 1 ? "s" : ""}
          </Text>
        </TouchableOpacity>
      )}

      {/* Requirement Note */}
      {!isComplete && (
        <Text className="text-muted text-xs mt-3 text-center">
          Vous devez ajouter exactement {REQUIRED_IMAGES} images pour continuer.
        </Text>
      )}
    </View>
  );
};
