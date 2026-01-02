import { APP_INFO } from "@/constants/APP_INFO";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HOUSES } from "../../data/HOUSES";

const { width } = Dimensions.get("window");

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

export default function HouseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const CURRENCY = APP_INFO.curency || "fcfa";
  const house = HOUSES.find((h) => h.id === id);

  if (!house) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{TEXTS.notFound}</Text>
      </View>
    );
  }

  const photos =
    house.gallery && house.gallery.length > 0 ? house.gallery : [house.image];

  const details = [
    {
      key: "bedrooms",
      label: TEXTS.bedrooms,
      value: String(house.features?.bedrooms ?? "-"),
      icon: "bed-outline",
    },
    {
      key: "bathrooms",
      label: TEXTS.bathrooms,
      value: String(house.features?.bathrooms ?? "-"),
      icon: "water-outline",
    },
    {
      key: "garage",
      label: TEXTS.garage,
      value: house.features?.garage ? TEXTS.yes : TEXTS.no,
      icon: "car-outline",
    },
    {
      key: "parking",
      label: TEXTS.parking,
      value:
        house.features?.parking !== undefined &&
        house.features?.parking !== null
          ? `${house.features?.parking} place${(house.features?.parking || 0) > 1 ? "s" : ""}`
          : "-",
      icon: "car-sport-outline",
    },
    {
      key: "wifi",
      label: TEXTS.wifi,
      value: house.features?.wifi ? TEXTS.available : TEXTS.unavailable,
      icon: "wifi-outline",
    },
    {
      key: "kitchen",
      label: TEXTS.kitchen,
      value: house.features?.kitchen || "-",
      icon: "restaurant-outline",
    },
  ];

  const handleCall = () => {
    if (house.owner?.phone) {
      Linking.openURL(`tel:${house.owner.phone}`);
    }
  };

  const handleWhatsApp = () => {
    if (house.owner?.phone) {
      const phone = house.owner.phone.replace(/\s+/g, "");
      Linking.openURL(`https://wa.me/${phone}`);
    }
  };

  const handleEmail = () => {
    if (house.owner?.email) {
      Linking.openURL(`mailto:${house.owner.email}`);
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
          style={styles.imageCard}
          activeOpacity={0.9}
          onPress={() => handleOpenImage(house.image)}
        >
          <Image source={{ uri: house.image }} style={styles.mainImage} />

          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>
              {CURRENCY} {house.price}
            </Text>
            <Text style={styles.pricePer}>{TEXTS.pricePer}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.houseName}>{house.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#777" />
              <Text style={styles.locationText}> {house.location}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color="#f5a623" />
              <Text style={styles.ratingText}>{house.rating.toFixed(1)}</Text>
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
        <Text style={styles.description}>{house.description}</Text>

        <Text style={styles.sectionTitle}>{TEXTS.host}</Text>
        <View style={styles.hostCard}>
          <View style={styles.hostInfo}>
            <Image
              source={{ uri: house.owner?.avatar || house.image }}
              style={styles.hostAvatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.hostName}>{house.owner?.name}</Text>
              {house.owner?.phone ? (
                <Text style={styles.hostContact}>{house.owner.phone}</Text>
              ) : null}
              {house.owner?.email ? (
                <Text style={styles.hostContact}>{house.owner.email}</Text>
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
  houseName: { fontSize: 20, fontWeight: "700", color: "#111" },
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
