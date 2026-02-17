import { COLORS } from "@/constants/COLORS";
import { getPropertyById } from "@/services/properties";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEXTS = {
  title: "Détails du bien",
  notFound: "Propriété non trouvée",
  photos: "Photos",
  features: "Caractéristiques",
  about: "À propos du bien",
  owner: "Propriétaire",
  call: "Appeler",
  whatsapp: "WhatsApp",
  email: "Email",
  pricePer: "/nuit",
  bedrooms: "Chambres",
  bathrooms: "Salles de bain",
  garage: "Garage",
  wifi: "WiFi",
  kitchen: "Cuisine équipée",
  yes: "Oui",
  no: "Non",
  loading: "Chargement...",
};

interface PropertyDetail {
  id: string;
  price: string;
  name: string;
  location: string;
  category: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  garage: boolean;
  wifi: boolean;
  kitchen: boolean;
  image: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    tel?: string;
    createdAt: string;
    updatedAt: string;
  };
  gallery?: Array<{
    id: string;
    url: string;
    propertyId: string;
  }>;
}

export default function PropertyDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = (await getPropertyById(id!)) as PropertyDetail;
        setProperty(data);
      } catch (err: any) {
        console.error("Error fetching property:", err);
        setError(TEXTS.notFound);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleCall = () => {
    if (property?.owner?.tel) {
      Linking.openURL(`tel:${property.owner.tel}`);
    } else {
      Alert.alert("Erreur", "Numéro de téléphone non disponible");
    }
  };

  const handleWhatsApp = () => {
    if (property?.owner?.tel) {
      const phone = property.owner.tel.replace(/\D/g, "");
      Linking.openURL(`https://wa.me/${phone}`);
    } else {
      Alert.alert("Erreur", "Numéro de téléphone non disponible");
    }
  };

  const handleEmail = () => {
    if (property?.owner?.email) {
      Linking.openURL(`mailto:${property.owner.email}`);
    } else {
      Alert.alert("Erreur", "Email non disponible");
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-bg items-center justify-center">
        <Text className="text-ink text-base">{TEXTS.loading}</Text>
      </SafeAreaView>
    );
  }

  if (!property || error) {
    return (
      <SafeAreaView className="flex-1 bg-bg items-center justify-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-ink items-center justify-center"
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-danger text-base font-semibold">
          {error || TEXTS.notFound}
        </Text>
      </SafeAreaView>
    );
  }

  const photos =
    property.gallery && property.gallery.length > 0
      ? property.gallery.map((item) => item.url)
      : [property.image];

  const features = [
    {
      key: "bedrooms",
      label: TEXTS.bedrooms,
      value: String(property.bedrooms),
      icon: "bedroom-parent",
    },
    {
      key: "bathrooms",
      label: TEXTS.bathrooms,
      value: String(property.bathrooms),
      icon: "bathroom",
    },
    {
      key: "garage",
      label: TEXTS.garage,
      value: property.garage ? TEXTS.yes : TEXTS.no,
      icon: "garage",
    },
    {
      key: "wifi",
      label: TEXTS.wifi,
      value: property.wifi ? TEXTS.yes : TEXTS.no,
      icon: "wifi",
    },
    {
      key: "kitchen",
      label: TEXTS.kitchen,
      value: property.kitchen ? TEXTS.yes : TEXTS.no,
      icon: "kitchen",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-ink items-center justify-center"
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-ink font-bold text-lg flex-1 text-center">
            {TEXTS.title}
          </Text>
          <View className="w-10" />
        </View>

        {/* Main Image */}
        <TouchableOpacity
          onPress={() => setSelectedImage(property.image)}
          className="mx-6 h-60 rounded-2xl overflow-hidden bg-border relative mb-4"
        >
          <Image
            source={{ uri: property.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Price Badge */}
          <View className="absolute bottom-4 left-4 bg-ink/70 rounded-full px-4 py-2 flex-row items-baseline">
            <Text className="text-white font-bold text-lg">€</Text>
            <Text className="text-white font-bold text-lg ml-1">
              {property.price}
            </Text>
            <Text className="text-white text-xs ml-1">{TEXTS.pricePer}</Text>
          </View>
        </TouchableOpacity>

        {/* Name & Location */}
        <View className="px-6 mb-4">
          <Text className="text-ink font-bold text-2xl mb-2">
            {property.name}
          </Text>
          <View className="flex-row items-center mb-3">
            <MaterialIcons
              name="location-on"
              size={18}
              color={COLORS.primary}
            />
            <Text className="text-muted text-base ml-2">
              {property.location}
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="bg-primaryLight/50 rounded-lg px-3 py-1">
              <Text className="text-primary text-xs font-semibold">
                {property.category}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 mb-6 flex-row gap-3">
          <TouchableOpacity
            onPress={handleCall}
            className="flex-1 flex-row items-center justify-center bg-surface border border-border rounded-lg py-3 gap-2"
          >
            <MaterialIcons name="call" size={20} color={COLORS.primary} />
            <Text className="text-primary font-semibold">{TEXTS.call}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleWhatsApp}
            className="flex-1 flex-row items-center justify-center bg-green-600 rounded-lg py-3 gap-2"
          >
            <MaterialIcons name="chat" size={20} color="white" />
            <Text className="text-white font-semibold">{TEXTS.whatsapp}</Text>
          </TouchableOpacity>
        </View>

        {/* Gallery */}
        {photos.length > 0 && (
          <View className="mb-6">
            <Text className="text-ink font-bold text-lg px-6 mb-3">
              {TEXTS.photos}
            </Text>
            <FlatList
              data={photos}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => `photo-${index}`}
              contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedImage(item)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: item }}
                    className="w-24 h-24 rounded-lg bg-border"
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Features */}
        <View className="mb-6">
          <Text className="text-ink font-bold text-lg px-6 mb-4">
            {TEXTS.features}
          </Text>
          <View className="flex-row flex-wrap px-6 gap-4 justify-between">
            {features.map((feature) => (
              <View key={feature.key} className="w-[30%] items-center">
                <View className="bg-primaryLight/30 w-14 h-14 rounded-2xl items-center justify-center mb-2">
                  <MaterialIcons
                    name={feature.icon as any}
                    size={28}
                    color={COLORS.primary}
                  />
                </View>
                <Text className="text-ink font-bold text-base text-center">
                  {feature.value}
                </Text>
                <Text className="text-muted text-xs text-center">
                  {feature.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View className="mb-6 px-6">
          <Text className="text-ink font-bold text-lg mb-3">{TEXTS.about}</Text>
          <Text className="text-muted text-base leading-6">
            {property.description}
          </Text>
        </View>

        {/* Owner Card */}
        {property.owner && (
          <View className="mb-6 px-6">
            <Text className="text-ink font-bold text-lg mb-3">
              {TEXTS.owner}
            </Text>
            <View className="bg-surface border border-border rounded-2xl p-4">
              <View className="flex-row items-center mb-4">
                {property.owner.avatar ? (
                  <Image
                    source={{ uri: property.owner.avatar }}
                    className="w-16 h-16 rounded-full bg-border mr-3"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-16 h-16 rounded-full bg-primaryLight items-center justify-center mr-3">
                    <MaterialIcons
                      name="person"
                      size={32}
                      color={COLORS.primary}
                    />
                  </View>
                )}
                <View className="flex-1">
                  <Text className="text-ink font-bold text-base">
                    {property.owner.firstName} {property.owner.lastName}
                  </Text>
                  {property.owner.tel && (
                    <Text className="text-muted text-sm mt-1">
                      {property.owner.tel}
                    </Text>
                  )}
                  {property.owner.email && (
                    <Text className="text-muted text-sm">
                      {property.owner.email}
                    </Text>
                  )}
                </View>
              </View>

              {/* Contact Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={handleCall}
                  className="flex-1 flex-row items-center justify-center bg-primaryLight rounded-lg py-2.5 gap-2"
                >
                  <MaterialIcons name="call" size={18} color={COLORS.primary} />
                  <Text className="text-primary font-semibold text-sm">
                    {TEXTS.call}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleEmail}
                  className="flex-1 flex-row items-center justify-center bg-primaryLight rounded-lg py-2.5 gap-2"
                >
                  <MaterialIcons name="mail" size={18} color={COLORS.primary} />
                  <Text className="text-primary font-semibold text-sm">
                    {TEXTS.email}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <View className="h-8" />
      </ScrollView>

      {/* Image Modal */}
      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View className="flex-1 bg-black/90 items-center justify-center">
          <TouchableOpacity
            onPress={() => setSelectedImage(null)}
            className="absolute top-10 right-6 z-10 w-10 h-10 rounded-full bg-white items-center justify-center"
          >
            <MaterialIcons name="close" size={20} color={COLORS.ink} />
          </TouchableOpacity>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-2/3"
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
