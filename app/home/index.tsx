import type { Property } from "@/interfaces/Property";
import { getAllProperties } from "@/services/properties";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AdBanner from "../../components/AdBanner";
import CategoryButton from "../../components/CategoryButton";
import EmptyState from "../../components/EmptyState";
import HouseCard from "../../components/HouseCard";
import SearchBar from "../../components/SearchBar";
import TopBar from "../../components/TopBar";
import { categories } from "../../data/HOUSES";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Rental House");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const TITLE_1 = "Trouvez";
  const TITLE_2 = "Votre nouveaux logement";
  const TITLE_3 = "Logements proches de vous";
  const router = useRouter();

  const onCategoryPress = (category: string) => {
    setActiveCategory(category);
    router.push({ pathname: "/houses", params: { s: category } });
  };

  const onHousePress = (id: string) => {
    router.push({
      pathname: "/houses/[id]",
      params: { id },
    });
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProperties();
        setProperties(Array.isArray(data) ? data : []);
      } catch (error: any) {
        console.error("Erreur lors du chargement des propriétés:", error);
        setProperties([]);
        let errorMessage =
          "Impossible de charger les propriétés. Vérifiez votre connexion.";

        if (error.code === "ECONNREFUSED") {
          errorMessage =
            "Le serveur n'est pas accessible. Vérifiez que localhost:3000 est en cours d'exécution.";
        } else if (error.response?.status === 500) {
          errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-bg">
      {/* Contenu principal avec défilement */}
      <ScrollView showsVerticalScrollIndicator={false} className="pb-20 bg-bg">
        {/* Top Bar */}
        <TopBar />

        {/* Title */}
        <View className="px-4 mt-4">
          <Text className="text-3xl font-bold text-ink">{TITLE_1}</Text>
          <Text className="text-3xl font-bold text-ink">{TITLE_2}</Text>
        </View>

        {/* Search Bar */}
        <SearchBar />

        {/* Pub intégrée dans le contenu */}
        <View className="mt-4 mx-4">
          <AdBanner />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-3"
        >
          {categories.map((category) => (
            <CategoryButton
              key={category}
              label={category}
              isActive={activeCategory === category}
              onPress={() => onCategoryPress(category)}
            />
          ))}
        </ScrollView>

        {/* Section Title */}
        <View className="px-4 mt-2 mb-3">
          <Text className="text-lg font-bold text-ink">{TITLE_3}</Text>
        </View>

        {/* House Cards Grid */}
        <View className="px-4 flex-row flex-wrap justify-between">
          {loading && <EmptyState type="loading" />}
          {error && <EmptyState type="error" errorMessage={error} />}
          {!loading && !error && properties.length === 0 && (
            <EmptyState type="no-properties" />
          )}
          {!loading &&
            !error &&
            properties.length > 0 &&
            properties.map((house) => (
              <HouseCard
                key={house.id}
                image={house.image}
                price={house.price}
                name={house.name}
                location={house.location}
                onPress={() => onHousePress(house.id)}
              />
            ))}
        </View>

        {/* Espace en bas */}
        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
