import { COLORS } from "@/constants/COLORS";
import { categories } from "@/data/HOUSES";
import { addHouse } from "@/services/properties";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddHouseScreen() {
  const router = useRouter();
  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400";
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
      price: "",
      description: "",
      category: categories[0],
      bedrooms: "2",
      bathrooms: "1",
      parking: "1",
      kitchen: "Équipée",
      garage: false,
      wifi: true,
    },
  });

  const onSubmit = (data: any) => {
    try {
      addHouse({
        image: DEFAULT_IMAGE,
        price: data.price,
        name: data.name,
        location: data.location,
        category: data.category,
        coordinates: { lat: 10.0, lng: 76.0 }, // Mock coordinates
        description: data.description,
        features: {
          bedrooms: parseInt(data.bedrooms),
          bathrooms: parseInt(data.bathrooms),
          garage: data.garage,
          parking: parseInt(data.parking),
          wifi: data.wifi,
          kitchen: data.kitchen,
        },
        gallery: [DEFAULT_IMAGE, DEFAULT_IMAGE], // Mock gallery
      });
      Alert.alert("Succès", "Maison ajoutée avec succès !");
      router.back();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'ajouter la maison.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="px-6 pt-4 pb-3 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-surface border border-border rounded-full"
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.ink} />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-lg font-bold text-ink">Nouvelle propriété</Text>
          <Text className="text-xs text-muted">Étape 1 sur 3</Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Cover Image */}
        <View className="bg-surface border border-border rounded-2xl p-4 shadow-sm">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-base font-semibold text-ink">
              Photo de couverture
            </Text>
            <View className="px-2 py-1 rounded-full bg-primaryLight">
              <Text className="text-xs text-primary font-semibold">Auto</Text>
            </View>
          </View>
          <Text className="text-sm text-muted mb-3">
            Une image par défaut sera utilisée pour cette démo.
          </Text>
          <Image
            source={{ uri: DEFAULT_IMAGE }}
            className="w-full h-44 rounded-xl"
            resizeMode="cover"
          />
          <View className="flex-row items-center mt-3">
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={COLORS.muted}
            />
            <Text className="text-xs text-muted ml-2">
              Vous pourrez modifier les photos plus tard.
            </Text>
          </View>
        </View>

        {/* Basic Info */}
        <Text className="text-lg font-semibold text-ink mt-6 mb-3">
          Informations de base
        </Text>
        <View className="bg-surface border border-border rounded-2xl p-4 space-y-4">
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, value } }) => (
              <View>
                <Text className="text-sm font-medium text-muted mb-1">
                  Nom de la propriété
                </Text>
                <View className="bg-bg border border-border rounded-xl px-4 py-3.5 flex-row items-center">
                  <Ionicons
                    name="home-outline"
                    size={18}
                    color={COLORS.muted}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-ink"
                    placeholder="Ex : Villa du Soleil"
                    placeholderTextColor={COLORS.muted}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
                {errors.name && (
                  <Text className="text-danger text-xs mt-1">
                    Ce champ est requis.
                  </Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            rules={{ required: true }}
            name="location"
            render={({ field: { onChange, value } }) => (
              <View>
                <Text className="text-sm font-medium text-muted mb-1">
                  Lieu
                </Text>
                <View className="bg-bg border border-border rounded-xl px-4 py-3.5 flex-row items-center">
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={COLORS.muted}
                  />
                  <TextInput
                    className="flex-1 ml-3 text-ink"
                    placeholder="Ex : Paris, France"
                    placeholderTextColor={COLORS.muted}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
                {errors.location && (
                  <Text className="text-danger text-xs mt-1">
                    Ce champ est requis.
                  </Text>
                )}
              </View>
            )}
          />

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Controller
                control={control}
                rules={{ required: true }}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Text className="text-sm font-medium text-muted mb-1">
                      Prix / nuit
                    </Text>
                    <View className="bg-bg border border-border rounded-xl px-4 py-3.5 flex-row items-center">
                      <Ionicons
                        name="cash-outline"
                        size={18}
                        color={COLORS.muted}
                      />
                      <Text className="ml-2 text-muted">€</Text>
                      <TextInput
                        className="flex-1 ml-2 text-ink"
                        placeholder="150"
                        placeholderTextColor={COLORS.muted}
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                      />
                    </View>
                    {errors.price && (
                      <Text className="text-danger text-xs mt-1">Requis</Text>
                    )}
                  </View>
                )}
              />
            </View>
          </View>

          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <View>
                <Text className="text-sm font-medium text-muted mb-2">
                  Catégorie
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="-mx-1"
                >
                  {categories.map((category) => {
                    const selected = category === value;
                    return (
                      <TouchableOpacity
                        key={category}
                        onPress={() => onChange(category)}
                        className={
                          "px-4 py-2 rounded-full mx-1 border " +
                          (selected
                            ? "bg-primary border-primary"
                            : "bg-bg border-border")
                        }
                      >
                        <Text
                          className={
                            selected ? "text-white font-semibold" : "text-ink"
                          }
                        >
                          {category}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          />

          <Controller
            control={control}
            rules={{ required: true }}
            name="description"
            render={({ field: { onChange, value } }) => (
              <View>
                <Text className="text-sm font-medium text-muted mb-1">
                  Description
                </Text>
                <View className="bg-bg border border-border rounded-xl px-4 py-3.5">
                  <TextInput
                    className="text-ink h-28"
                    placeholder="Décrivez votre propriété..."
                    placeholderTextColor={COLORS.muted}
                    multiline
                    textAlignVertical="top"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
                {errors.description && (
                  <Text className="text-danger text-xs mt-1">
                    Ce champ est requis.
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        {/* Details */}
        <Text className="text-lg font-semibold text-ink mt-6 mb-3">
          Caractéristiques
        </Text>
        <View className="bg-surface border border-border rounded-2xl p-4 space-y-4">
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="bedrooms"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Text className="text-sm font-medium text-muted mb-1">
                      Chambres
                    </Text>
                    <TextInput
                      className="bg-bg border border-border rounded-xl px-4 py-3.5 text-ink"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="bathrooms"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Text className="text-sm font-medium text-muted mb-1">
                      Salles de bain
                    </Text>
                    <TextInput
                      className="bg-bg border border-border rounded-xl px-4 py-3.5 text-ink"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
            </View>
          </View>
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="parking"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Text className="text-sm font-medium text-muted mb-1">
                      Parking
                    </Text>
                    <TextInput
                      className="bg-bg border border-border rounded-xl px-4 py-3.5 text-ink"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="kitchen"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Text className="text-sm font-medium text-muted mb-1">
                      Cuisine
                    </Text>
                    <TextInput
                      className="bg-bg border border-border rounded-xl px-4 py-3.5 text-ink"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
            </View>
          </View>
        </View>

        {/* Amenities */}
        <Text className="text-lg font-semibold text-ink mt-6 mb-3">
          Équipements
        </Text>
        <View className="bg-surface border border-border rounded-2xl p-4 space-y-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="wifi-outline" size={18} color={COLORS.muted} />
              <Text className="text-base font-medium text-ink ml-2">
                Wifi inclus
              </Text>
            </View>
            <Controller
              control={control}
              name="wifi"
              render={({ field: { onChange, value } }) => (
                <Switch
                  trackColor={{ false: COLORS.border, true: COLORS.success }}
                  thumbColor={COLORS.surface}
                  onValueChange={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View className="h-[1px] bg-border" />
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="car-outline" size={18} color={COLORS.muted} />
              <Text className="text-base font-medium text-ink ml-2">
                Garage
              </Text>
            </View>
            <Controller
              control={control}
              name="garage"
              render={({ field: { onChange, value } }) => (
                <Switch
                  trackColor={{ false: COLORS.border, true: COLORS.success }}
                  thumbColor={COLORS.surface}
                  onValueChange={onChange}
                  value={value}
                />
              )}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-primary rounded-2xl py-4 items-center mt-8 shadow-lg active:bg-primaryDark"
        >
          <Text className="text-white text-center font-bold text-lg">
            Continuer
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
