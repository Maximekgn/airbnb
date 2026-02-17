import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HouseCard from "../../components/HouseCard";
import TopBar from "../../components/TopBar";
import { HOUSES } from "../../data/HOUSES";
import SearchBar from "@/components/SearchBar";

const TEXTS = {
  results: "Résultats",
  emptyTitle: "Aucun logement trouvé",
  emptySubtitle: "Essayez une autre catégorie, description ou localisation.",
};

const Houses = () => {
  const { s } = useLocalSearchParams<{ s?: string }>();
  const router = useRouter();

  const searchTerm = useMemo(() => {
    const raw = Array.isArray(s) ? s[0] : s;
    return (raw || "").trim();
  }, [s]);

  const normalized = searchTerm.toLowerCase();

  const filteredHouses = useMemo(
    () =>
      normalized
        ? HOUSES.filter((house) => {
            const fields = [
                house.name ,house.category,
              house.description,
              house.location,
            ];
            return fields.some((field) =>
              (field || "").toLowerCase().includes(normalized)
            );
          })
        : HOUSES,
    [normalized]
  );

  const onHousePress = (id: string) =>
    router.push({ pathname: "/houses/[id]", params: { id } });

  const renderSummary = () => {
    if (searchTerm) {
      return `${filteredHouses.length} logement${
        filteredHouses.length > 1 ? "s" : ""
      } pour "${searchTerm}"`;
    }
    return `${filteredHouses.length} logement${
      filteredHouses.length > 1 ? "s" : ""
    } disponibles`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
              <TopBar />
              
              <SearchBar  />

        <View className="px-4 pb-4">
          <Text className="text-2xl font-bold text-gray-900">
            {TEXTS.results}
          </Text>
          <Text className="text-sm text-gray-600 mt-1">{renderSummary()}</Text>
        </View>

        {filteredHouses.length > 0 ? (
          <View className="px-4 flex-row flex-wrap justify-between">
            {filteredHouses.map((house) => (
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
        ) : (
          <View className="px-4 py-12 items-center">
            <Text className="text-lg font-semibold text-gray-900">
              {TEXTS.emptyTitle}
            </Text>
            <Text className="text-sm text-gray-600 mt-2 text-center">
              {TEXTS.emptySubtitle}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Houses;
