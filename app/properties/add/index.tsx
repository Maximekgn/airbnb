import { COLORS } from "@/constants/COLORS";
import { Category, getAllCategories } from "@/services/categories";
import { CreatePropertyData, createProperty } from "@/services/properties";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GalleryPicker } from "../../../components/GalleryPicker";

interface GalleryImage {
  uri: string;
  type: string;
  name: string;
}

export default function AddPropertyScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    price: "",
    name: "",
    location: "",
    categoryId: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    garage: false,
    wifi: false,
    kitchen: false,
  });

  const [mainImage, setMainImage] = useState<GalleryImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
        Alert.alert(
          "Erreur",
          "Impossible de charger les catégories. Vérifiez votre connexion.",
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const pickMainImage = async () => {
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
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setMainImage({
        uri: asset.uri,
        type: "image/jpeg",
        name: asset.fileName || `main-${Date.now()}.jpg`,
      });
      if (errors.mainImage) {
        const newErrors = { ...errors };
        delete newErrors.mainImage;
        setErrors(newErrors);
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.price.trim()) {
      newErrors.price = "Le prix est requis";
    } else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = "Le prix doit être un nombre positif";
    }

    if (!form.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!form.location.trim()) {
      newErrors.location = "L'adresse est requise";
    }

    if (!form.categoryId) {
      newErrors.categoryId = "La catégorie est requise";
    }

    if (!form.description.trim()) {
      newErrors.description = "La description est requise";
    }

    if (
      !form.bedrooms.trim() ||
      isNaN(Number(form.bedrooms)) ||
      Number(form.bedrooms) < 0
    ) {
      newErrors.bedrooms = "Nombre de chambres invalide";
    }

    if (
      !form.bathrooms.trim() ||
      isNaN(Number(form.bathrooms)) ||
      Number(form.bathrooms) < 0
    ) {
      newErrors.bathrooms = "Nombre de salles de bain invalide";
    }

    if (!mainImage) {
      newErrors.mainImage = "L'image principale est requise";
    }

    if (galleryImages.length !== 5) {
      newErrors.gallery = "Vous devez ajouter exactement 5 images à la galerie";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs requis");
      return;
    }

    setLoading(true);
    try {
      const propertyData: CreatePropertyData = {
        price: form.price,
        name: form.name,
        location: form.location,
        categoryId: form.categoryId,
        description: form.description,
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        garage: form.garage,
        wifi: form.wifi,
        kitchen: form.kitchen,
      };

      await createProperty(propertyData, mainImage!, galleryImages);

      Alert.alert("Succès", "Votre propriété a été créée avec succès!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      console.error("Erreur lors de la création:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Une erreur est survenue lors de la création";
      Alert.alert("Erreur", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  if (loadingCategories) {
    return (
      <SafeAreaView className="flex-1 bg-bg items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="text-muted mt-4">Chargement des catégories...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mt-4 mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-surface border border-border p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.ink} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-ink">Ajouter un bien</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Main Image */}
          <View className="mb-6">
            <Text className="text-ink font-semibold mb-3 text-base">
              Image principale *
            </Text>
            <TouchableOpacity
              onPress={pickMainImage}
              className={`border-2 border-dashed rounded-xl overflow-hidden ${
                errors.mainImage ? "border-red-500" : "border-border"
              }`}
            >
              {mainImage ? (
                <View className="relative">
                  <Image
                    source={{ uri: mainImage.uri }}
                    className="w-full h-48"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 right-2 bg-primary rounded-full p-2">
                    <MaterialIcons name="edit" size={20} color="white" />
                  </View>
                </View>
              ) : (
                <View className="items-center justify-center py-12 bg-primaryLight/30">
                  <MaterialCommunityIcons
                    name="image-plus"
                    size={48}
                    color={COLORS.primary}
                  />
                  <Text className="text-primary font-semibold mt-3">
                    Ajouter une image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            {errors.mainImage && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.mainImage}
              </Text>
            )}
          </View>

          {/* Gallery Images */}
          <GalleryPicker
            images={galleryImages}
            onImagesChange={setGalleryImages}
            maxImages={5}
          />
          {errors.gallery && (
            <Text className="text-red-500 text-sm -mt-4 mb-4">
              {errors.gallery}
            </Text>
          )}

          {/* Form Fields */}
          <View className="space-y-5">
            {/* Name */}
            <View>
              <Text className="text-ink font-medium mb-2 ml-1">Nom *</Text>
              <View
                className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
              >
                <Feather
                  name="home"
                  size={20}
                  color={errors.name ? "#EF4444" : COLORS.muted}
                />
                <TextInput
                  className="flex-1 ml-3 text-ink"
                  placeholder="Appartement moderne"
                  placeholderTextColor={COLORS.muted}
                  value={form.name}
                  onChangeText={(text) => updateField("name", text)}
                  editable={!loading}
                />
              </View>
              {errors.name && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.name}
                </Text>
              )}
            </View>

            {/* Price */}
            <View>
              <Text className="text-ink font-medium mb-2 ml-1">
                Prix (€/nuit) *
              </Text>
              <View
                className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                  errors.price ? "border-red-500" : "border-border"
                }`}
              >
                <MaterialIcons
                  name="attach-money"
                  size={20}
                  color={errors.price ? "#EF4444" : COLORS.muted}
                />
                <TextInput
                  className="flex-1 ml-3 text-ink"
                  placeholder="250.00"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="decimal-pad"
                  value={form.price}
                  onChangeText={(text) => updateField("price", text)}
                  editable={!loading}
                />
              </View>
              {errors.price && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.price}
                </Text>
              )}
            </View>

            {/* Location */}
            <View>
              <Text className="text-ink font-medium mb-2 ml-1">Adresse *</Text>
              <View
                className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                  errors.location ? "border-red-500" : "border-border"
                }`}
              >
                <MaterialIcons
                  name="location-on"
                  size={20}
                  color={errors.location ? "#EF4444" : COLORS.muted}
                />
                <TextInput
                  className="flex-1 ml-3 text-ink"
                  placeholder="75001 Paris, France"
                  placeholderTextColor={COLORS.muted}
                  value={form.location}
                  onChangeText={(text) => updateField("location", text)}
                  editable={!loading}
                />
              </View>
              {errors.location && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.location}
                </Text>
              )}
            </View>

            {/* Category */}
            <View>
              <Text className="text-ink font-medium mb-2 ml-1">
                Catégorie *
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => updateField("categoryId", category.id)}
                    disabled={loading}
                    className={`mr-3 px-4 py-3 rounded-xl border-2 flex-row items-center ${
                      form.categoryId === category.id
                        ? "bg-primary border-primary"
                        : "bg-surface border-border"
                    }`}
                  >
                    {category.icon && (
                      <Text className="text-xl mr-2">{category.icon}</Text>
                    )}
                    <Text
                      className={`font-semibold ${
                        form.categoryId === category.id
                          ? "text-white"
                          : "text-ink"
                      }`}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {errors.categoryId && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.categoryId}
                </Text>
              )}
            </View>

            {/* Description */}
            <View>
              <Text className="text-ink font-medium mb-2 ml-1">
                Description *
              </Text>
              <View
                className={`bg-surface border rounded-xl px-4 py-3 ${
                  errors.description ? "border-red-500" : "border-border"
                }`}
              >
                <TextInput
                  className="text-ink min-h-[100px]"
                  placeholder="Décrivez votre propriété..."
                  placeholderTextColor={COLORS.muted}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={form.description}
                  onChangeText={(text) => updateField("description", text)}
                  editable={!loading}
                />
              </View>
              {errors.description && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  {errors.description}
                </Text>
              )}
            </View>

            {/* Bedrooms & Bathrooms */}
            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-ink font-medium mb-2 ml-1">
                  Chambres *
                </Text>
                <View
                  className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                    errors.bedrooms ? "border-red-500" : "border-border"
                  }`}
                >
                  <Ionicons
                    name="bed-outline"
                    size={20}
                    color={errors.bedrooms ? "#EF4444" : COLORS.muted}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-ink"
                    placeholder="3"
                    placeholderTextColor={COLORS.muted}
                    keyboardType="number-pad"
                    value={form.bedrooms}
                    onChangeText={(text) => updateField("bedrooms", text)}
                    editable={!loading}
                  />
                </View>
                {errors.bedrooms && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.bedrooms}
                  </Text>
                )}
              </View>

              <View className="flex-1">
                <Text className="text-ink font-medium mb-2 ml-1">
                  Salle de bain *
                </Text>
                <View
                  className={`bg-surface border rounded-xl px-4 py-3.5 flex-row items-center ${
                    errors.bathrooms ? "border-red-500" : "border-border"
                  }`}
                >
                  <MaterialCommunityIcons
                    name="shower"
                    size={20}
                    color={errors.bathrooms ? "#EF4444" : COLORS.muted}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-ink"
                    placeholder="2"
                    placeholderTextColor={COLORS.muted}
                    keyboardType="number-pad"
                    value={form.bathrooms}
                    onChangeText={(text) => updateField("bathrooms", text)}
                    editable={!loading}
                  />
                </View>
                {errors.bathrooms && (
                  <Text className="text-red-500 text-sm mt-1 ml-1">
                    {errors.bathrooms}
                  </Text>
                )}
              </View>
            </View>

            {/* Amenities */}
            <View>
              <Text className="text-ink font-semibold mb-3 text-base">
                Équipements
              </Text>

              {/* Garage */}
              <View className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3.5 mb-3">
                <View className="flex-row items-center flex-1">
                  <MaterialCommunityIcons
                    name="garage"
                    size={22}
                    color={COLORS.muted}
                  />
                  <Text className="text-ink font-medium ml-3">Garage</Text>
                </View>
                <Switch
                  value={form.garage}
                  onValueChange={(value) => updateField("garage", value)}
                  trackColor={{
                    false: COLORS.border,
                    true: COLORS.primaryLight,
                  }}
                  thumbColor={form.garage ? COLORS.primary : COLORS.muted}
                  disabled={loading}
                />
              </View>

              {/* WiFi */}
              <View className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3.5 mb-3">
                <View className="flex-row items-center flex-1">
                  <MaterialIcons name="wifi" size={22} color={COLORS.muted} />
                  <Text className="text-ink font-medium ml-3">WiFi</Text>
                </View>
                <Switch
                  value={form.wifi}
                  onValueChange={(value) => updateField("wifi", value)}
                  trackColor={{
                    false: COLORS.border,
                    true: COLORS.primaryLight,
                  }}
                  thumbColor={form.wifi ? COLORS.primary : COLORS.muted}
                  disabled={loading}
                />
              </View>

              {/* Kitchen */}
              <View className="flex-row items-center justify-between bg-surface border border-border rounded-xl px-4 py-3.5">
                <View className="flex-row items-center flex-1">
                  <MaterialCommunityIcons
                    name="stove"
                    size={22}
                    color={COLORS.muted}
                  />
                  <Text className="text-ink font-medium ml-3">Cuisine</Text>
                </View>
                <Switch
                  value={form.kitchen}
                  onValueChange={(value) => updateField("kitchen", value)}
                  trackColor={{
                    false: COLORS.border,
                    true: COLORS.primaryLight,
                  }}
                  thumbColor={form.kitchen ? COLORS.primary : COLORS.muted}
                  disabled={loading}
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`rounded-xl py-4 items-center mt-8 shadow-lg ${
              loading ? "bg-primaryLight" : "bg-primary active:bg-primaryDark"
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Créer la propriété
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
