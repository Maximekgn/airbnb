import { APP_INFO } from "@/constants/APP_INFO";
import { getPropertyById } from "@/services/properties";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEXTS = {
  title: "Détails du logement",
  notFound: "Maison non trouvée",
  photos: "Photos du bien",
  details: "Caractéristiques",
  about: "À propos",
  host: "Hôte",
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
};

export default function PropertyDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 380;
  const isLargeScreen = width >= 500;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProperty = async () => {
      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);
  const CURRENCY = APP_INFO.curency || "fcfa";

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!property) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{TEXTS.notFound}</Text>
      </View>
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
  }[] = [
    {
      key: "bedrooms",
      label: TEXTS.bedrooms,
      value: String(property.bedrooms ?? "-"),
      icon: "bed-outline",
    },
    {
      key: "bathrooms",
      label: TEXTS.bathrooms,
      value: String(property.bathrooms ?? "-"),
      icon: "water-outline",
    },
    {
      key: "garage",
      label: TEXTS.garage,
      value: property.garage ? TEXTS.yes : TEXTS.no,
      icon: "car-outline",
    },
    {
      key: "parking",
      label: TEXTS.parking,
      value:
        property.parking !== undefined && property.parking !== null
          ? `${property.parking} place${(property.parking || 0) > 1 ? "s" : ""}`
          : "-",
      icon: "car-sport-outline",
    },
    {
      key: "wifi",
      label: TEXTS.wifi,
      value: property.wifi ? TEXTS.available : TEXTS.unavailable,
      icon: "wifi-outline",
    },
    {
      key: "kitchen",
      label: TEXTS.kitchen,
      value: property.kitchen || "-",
      icon: "restaurant-outline",
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

  const handleOpenImage = (uri: string) => setSelectedImage(uri);

  const TITLE = TEXTS.title;

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
          style={[
            styles.imageCard,
            {
              width: width - 40,
              height: isSmallScreen ? (width - 40) * 0.7 : (width - 40) * 0.6,
            },
          ]}
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

        <View
          style={[styles.rowBetween, isSmallScreen && styles.rowBetweenSmall]}
        >
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text
              style={[styles.propertyName, isSmallScreen && { fontSize: 16 }]}
              numberOfLines={2}
            >
              {property.name}
            </Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#777" />
              <Text style={styles.locationText} numberOfLines={1}>
                {" "}
                {property.location}
              </Text>
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#f5a623" />
              <Text style={styles.ratingText}>
                {property.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Call and whatsapp button */}
          <View style={{ flexDirection: "row", gap: isSmallScreen ? 8 : 12 }}>
            <TouchableOpacity
              style={[styles.mapButton, isSmallScreen && styles.smallButton]}
              onPress={handleCall}
            >
              <Ionicons
                name="call-outline"
                size={isSmallScreen ? 18 : 20}
                color="#333"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.whatsappButton,
                isSmallScreen && styles.smallButton,
              ]}
              onPress={handleWhatsApp}
            >
              <Ionicons
                name="logo-whatsapp"
                size={isSmallScreen ? 18 : 20}
                color="#fff"
              />
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
              <Image
                source={{ uri: item }}
                style={[
                  styles.thumb,
                  {
                    width: isSmallScreen ? 72 : isLargeScreen ? 110 : 88,
                    height: isSmallScreen ? 52 : isLargeScreen ? 80 : 64,
                  },
                ]}
              />
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ width: isSmallScreen ? 8 : 12 }} />
          )}
          contentContainerStyle={{ paddingVertical: 8 }}
        />

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
          {TEXTS.details}
        </Text>
        <View style={styles.detailsGrid}>
          {details.map((d) => (
            <View
              key={d.key}
              style={[
                styles.detailItem,
                {
                  width: isSmallScreen ? "48%" : isLargeScreen ? "30%" : "30%",
                  marginBottom: isSmallScreen ? 14 : 18,
                },
              ]}
            >
              <Ionicons
                name={d.icon}
                size={isSmallScreen ? 20 : 24}
                color="#333"
                style={styles.detailIcon}
              />
              <Text
                style={[styles.detailValue, isSmallScreen && { fontSize: 14 }]}
              >
                {d.value}
              </Text>
              <Text
                style={[styles.detailLabel, isSmallScreen && { fontSize: 11 }]}
              >
                {d.label}
              </Text>
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
              style={[
                styles.hostAvatar,
                isSmallScreen && { width: 44, height: 44, borderRadius: 22 },
              ]}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.hostName, isSmallScreen && { fontSize: 14 }]}
                numberOfLines={1}
              >
                {property.owner?.firstName} {property.owner?.lastName}
              </Text>
              {property.owner?.tel ? (
                <Text
                  style={[
                    styles.hostContact,
                    isSmallScreen && { fontSize: 12 },
                  ]}
                  numberOfLines={1}
                >
                  {property.owner.tel}
                </Text>
              ) : null}
              {property.owner?.email ? (
                <Text
                  style={[
                    styles.hostContact,
                    isSmallScreen && { fontSize: 11 },
                  ]}
                  numberOfLines={1}
                >
                  {property.owner.email}
                </Text>
              ) : null}
            </View>
          </View>
          <View
            style={[
              styles.hostActions,
              isSmallScreen && { justifyContent: "space-between" },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.hostButton,
                isSmallScreen && styles.hostButtonSmall,
              ]}
              onPress={handleCall}
            >
              <Ionicons
                name="call"
                size={isSmallScreen ? 14 : 16}
                color="#111"
              />
              <Text
                style={[
                  styles.hostButtonText,
                  isSmallScreen && { fontSize: 11 },
                ]}
              >
                {TEXTS.call}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.hostButton,
                isSmallScreen && styles.hostButtonSmall,
              ]}
              onPress={handleWhatsApp}
            >
              <Ionicons
                name="logo-whatsapp"
                size={isSmallScreen ? 14 : 16}
                color="#111"
              />
              <Text
                style={[
                  styles.hostButtonText,
                  isSmallScreen && { fontSize: 11 },
                ]}
              >
                {TEXTS.whatsapp}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.hostButton,
                isSmallScreen && styles.hostButtonSmall,
              ]}
              onPress={handleEmail}
            >
              <Ionicons
                name="mail"
                size={isSmallScreen ? 14 : 16}
                color="#111"
              />
              <Text
                style={[
                  styles.hostButtonText,
                  isSmallScreen && { fontSize: 11 },
                ]}
              >
                {TEXTS.email}
              </Text>
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
                style={[
                  styles.modalImage,
                  {
                    width: width - 32,
                    height: Math.min(width - 32, height * 0.7),
                  },
                ]}
              />
            ) : null}
          </View>
        </Modal>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

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
  rowBetweenSmall: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  smallButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
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
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 8,
  },
  detailItem: {
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
  hostButtonSmall: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
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
