import { APP_INFO } from "@/constants/APP_INFO";
import { getPropertyById } from "@/services/properties";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
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
import {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TEXTS = {
  title: "Détails du logement",
  notFound: "Maison non trouvée",
  notFoundDesc: "Ce logement n'existe pas ou a été supprimé.",
  photos: "Galerie photos",
  details: "Caractéristiques",
  about: "À propos du logement",
  host: "Votre hôte",
  call: "Appeler",
  whatsapp: "WhatsApp",
  email: "Email",
  pricePer: "/ mois",
  bedrooms: "Chambres",
  bathrooms: "Salles de bain",
  garage: "Garage",
  parking: "Parking",
  wifi: "Wi-Fi",
  kitchen: "Cuisine",
  available: "Disponible",
  unavailable: "Non disponible",
  yes: "Oui",
  no: "Non",
  contactHost: "Contacter l'hôte",
  goBack: "Retour",
  loading: "Chargement...",
};

const COLORS = {
  primary: "#FF385C",
  primaryDark: "#E31C5F",
  secondary: "#00A699",
  background: "#FFFFFF",
  surface: "#F7F7F7",
  surfaceHover: "#EBEBEB",
  text: "#222222",
  textSecondary: "#717171",
  textLight: "#B0B0B0",
  border: "#DDDDDD",
  success: "#25D366",
  star: "#FFB400",
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(0,0,0,0.5)",
};

const COLORS = {
  primary: "#FF385C",
  primaryDark: "#E31C5F",
  secondary: "#00A699",
  background: "#FFFFFF",
  surface: "#F7F7F7",
  surfaceHover: "#EBEBEB",
  text: "#222222",
  textSecondary: "#717171",
  textLight: "#B0B0B0",
  border: "#DDDDDD",
  success: "#25D366",
  star: "#FFB400",
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(0,0,0,0.5)",
};

// Responsive breakpoints
const getResponsiveValues = (width: number) => {
  const isTablet = width >= 768;
  const isDesktop = width >= 1024;

  return {
    containerPadding: isDesktop ? 40 : isTablet ? 32 : 20,
    imageHeight: isDesktop ? 450 : isTablet ? 380 : width * 0.65,
    thumbnailSize: isDesktop ? 120 : isTablet ? 100 : 88,
    detailColumns: isDesktop ? 6 : isTablet ? 4 : 3,
    fontSize: {
      title: isDesktop ? 28 : isTablet ? 24 : 22,
      subtitle: isDesktop ? 18 : isTablet ? 16 : 15,
      body: isDesktop ? 16 : 14,
      small: isDesktop ? 14 : 12,
    },
    spacing: {
      section: isDesktop ? 32 : isTablet ? 28 : 24,
      item: isDesktop ? 20 : isTablet ? 16 : 12,
    },
  };
};

export default function PropertyDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width: windowWidth } = useWindowDimensions();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollY = useSharedValue(0);

  const responsive = getResponsiveValues(windowWidth);

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  const CURRENCY = APP_INFO.curency || "FCFA";

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [0, 1]);
    return {
      opacity,
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    };
  });

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="mt-4 text-gray-500 text-base">{TEXTS.loading}</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-8">
          <View className="w-24 h-24 rounded-full bg-red-50 justify-center items-center mb-6">
            <Ionicons name="home-outline" size={48} color={COLORS.primary} />
          </View>
          <Text className="text-xl font-bold text-gray-900 mb-2">
            {TEXTS.notFound}
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            {TEXTS.notFoundDesc}
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black px-8 py-4 rounded-xl"
          >
            <Text className="text-white font-semibold">{TEXTS.goBack}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const photos =
    property.gallery && property.gallery.length > 0
      ? property.gallery.map((item: any) => item.url)
      : [property.image];

  const details: {
    key: string;
    label: string;
    value: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
    color: string;
  }[] = [
    {
      key: "bedrooms",
      label: TEXTS.bedrooms,
      value: String(property.bedrooms ?? "-"),
      icon: "bed-outline",
      color: "#6366F1",
    },
    {
      key: "bathrooms",
      label: TEXTS.bathrooms,
      value: String(property.bathrooms ?? "-"),
      icon: "water-outline",
      color: "#0EA5E9",
    },
    {
      key: "garage",
      label: TEXTS.garage,
      value: property.garage ? TEXTS.yes : TEXTS.no,
      icon: "car-outline",
      color: "#8B5CF6",
    },
    {
      key: "parking",
      label: TEXTS.parking,
      value:
        property.parking !== undefined && property.parking !== null
          ? `${property.parking} place${(property.parking || 0) > 1 ? "s" : ""}`
          : "-",
      icon: "car-sport-outline",
      color: "#EC4899",
    },
    {
      key: "wifi",
      label: TEXTS.wifi,
      value: property.wifi ? TEXTS.available : TEXTS.unavailable,
      icon: "wifi-outline",
      color: "#10B981",
    },
    {
      key: "kitchen",
      label: TEXTS.kitchen,
      value: property.kitchen || "-",
      icon: "restaurant-outline",
      color: "#F59E0B",
    },
  ];

  const handleCall = () => {
    if (property.owner?.tel) {
      Linking.openURL(`tel:${property.owner.tel}`);
    }
  };

  const handleWhatsApp = () => {
    if (property.owner?.tel) {
      const phone = property.owner.tel.replace(/\s+/g, "");
      Linking.openURL(`https://wa.me/${phone}`);
    }
  };

  const handleEmail = () => {
    if (property.owner?.email) {
      Linking.openURL(`mailto:${property.owner.email}`);
    }
  };

  const handleOpenImage = (uri: string, index: number) => {
    setSelectedImage(uri);
    setSelectedImageIndex(index);
  };

  const handleShare = async () => {
    // Placeholder for share functionality
  };

  // Detail Card Component
  const DetailCard = ({
    item,
    index,
  }: {
    item: (typeof details)[0];
    index: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 50).springify()}
      className="items-center justify-center p-4 bg-white rounded-2xl border border-gray-100"
      style={{
        width: windowWidth >= 1024 ? "15%" : windowWidth >= 768 ? "22%" : "30%",
        marginBottom: responsive.spacing.item,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center mb-3"
        style={{ backgroundColor: `${item.color}15` }}
      >
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <Text
        className="font-bold text-gray-900"
        style={{ fontSize: responsive.fontSize.subtitle }}
      >
        {item.value}
      </Text>
      <Text
        className="text-gray-500 text-center mt-1"
        style={{ fontSize: responsive.fontSize.small }}
      >
        {item.label}
      </Text>
    </Animated.View>
  );

  // Action Button Component
  const ActionButton = ({
    icon,
    label,
    onPress,
    variant = "default",
  }: {
    icon: React.ComponentProps<typeof Ionicons>["name"];
    label: string;
    onPress: () => void;
    variant?: "default" | "whatsapp" | "primary";
  }) => {
    const bgColor =
      variant === "whatsapp"
        ? COLORS.success
        : variant === "primary"
          ? COLORS.primary
          : COLORS.white;
    const textColor = variant === "default" ? COLORS.text : COLORS.white;
    const iconColor = variant === "default" ? COLORS.text : COLORS.white;

    return (
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-center px-5 py-3 rounded-xl"
        style={{
          backgroundColor: bgColor,
          borderWidth: variant === "default" ? 1 : 0,
          borderColor: COLORS.border,
          flex: 1,
          minWidth: 100,
        }}
        activeOpacity={0.8}
      >
        <Ionicons name={icon} size={18} color={iconColor} />
        <Text
          className="font-semibold ml-2"
          style={{ color: textColor, fontSize: responsive.fontSize.body }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{TITLE}</Text>
          <View style={{ width: 40 }} />
        </View>

        <TouchableOpacity
          style={styles.imageCard}
          activeOpacity={0.9}
          onPress={() => handleOpenImage(property.image)}
        >
          <Image source={{ uri: property.image }} style={styles.mainImage} />

          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>
              {CURRENCY} {property.price}
            </Text>
            <Text style={styles.pricePer}>{TEXTS.pricePer}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.propertyName}>{property.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#777" />
              <Text style={styles.locationText}> {property.location}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#f5a623" />
              <Text style={styles.ratingText}>
                {property.rating.toFixed(1)}
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity style={styles.mapButton}>
            <Text>Localisation</Text>
            <Ionicons name="map-outline" size={20} color="#333" />
          </TouchableOpacity> */}

          {/* Call and whatsap button */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity style={styles.mapButton} onPress={handleCall}>
              <Ionicons name="call-outline" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={handleWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{TEXTS.photos}</Text>
        <FlatList
          data={photos}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpenImage(item)}>
              <Image source={{ uri: item }} style={styles.thumb} />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          contentContainerStyle={{ paddingVertical: 8 }}
        />

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
          {TEXTS.details}
        </Text>
        <View style={styles.detailsGrid}>
          {details.map((d) => (
            <View key={d.key} style={styles.detailItem}>
              <Ionicons
                name={d.icon}
                size={24}
                color="#333"
                style={styles.detailIcon}
              />
              <Text style={styles.detailValue}>{d.value}</Text>
              <Text style={styles.detailLabel}>{d.label}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 4 }]}>
          {TEXTS.about}
        </Text>
        <Text style={styles.description}>{property.description}</Text>

        <Text style={styles.sectionTitle}>{TEXTS.host}</Text>
        <View style={styles.hostCard}>
          <View style={styles.hostInfo}>
            <Image
              source={{ uri: property.owner?.avatar || property.image }}
              style={styles.hostAvatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.hostName}>
                {property.owner?.firstName} {property.owner?.lastName}
              </Text>
              {property.owner?.tel ? (
                <Text style={styles.hostContact}>{property.owner.tel}</Text>
              ) : null}
              {property.owner?.email ? (
                <Text style={styles.hostContact}>{property.owner.email}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.hostActions}>
            <TouchableOpacity style={styles.hostButton} onPress={handleCall}>
              <Ionicons name="call" size={16} color="#111" />
              <Text style={styles.hostButtonText}>{TEXTS.call}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.hostButton}
              onPress={handleWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={16} color="#111" />
              <Text style={styles.hostButtonText}>{TEXTS.whatsapp}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hostButton} onPress={handleEmail}>
              <Ionicons name="mail" size={16} color="#111" />
              <Text style={styles.hostButtonText}>{TEXTS.email}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={!!selectedImage}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedImage(null)}
        >
          <View style={styles.modalBackdrop}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSelectedImage(null)}
            >
              <Ionicons name="close" size={22} color="#111" />
            </TouchableOpacity>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.modalImage}
              />
            ) : null}
          </View>
        </Modal>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_WIDTH = width - 40;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  imageCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.6,
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 12,
  },
  mainImage: { width: "100%", height: "100%" },
  leftBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  priceBadge: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceBadgeText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  pricePer: { color: "#fff", fontSize: 12, marginLeft: 2 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  propertyName: { fontSize: 20, fontWeight: "700", color: "#111" },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: { color: "#777", fontSize: 14 },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  ratingText: { color: "#444", fontWeight: "600" },
  mapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  thumb: {
    width: 88,
    height: 64,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  detailItem: {
    width: "30%",
    marginBottom: 18,
    alignItems: "center",
  },
  detailIcon: {
    marginBottom: 6,
  },
  detailValue: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 4,
  },
  whatsappButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
  },
  detailLabel: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  description: {
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
  },
  hostCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  hostAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ddd",
  },
  hostName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  hostContact: {
    color: "#555",
    fontSize: 13,
    marginTop: 2,
  },
  hostActions: {
    flexDirection: "row",
    gap: 3,
    flexWrap: "wrap",
  },
  hostButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  hostButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalImage: {
    width: "100%",
    height: width,
    borderRadius: 12,
    resizeMode: "contain",
  },
  modalClose: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { fontSize: 18, color: "#d32f2f" },
});
