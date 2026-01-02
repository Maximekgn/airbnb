import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryButton from "../../components/CategoryButton";
import HouseCard from "../../components/HouseCard";
import SearchBar from "../../components/SearchBar";
import TopBar from "../../components/TopBar";
import { HOUSES } from "../../data/HOUSES";

const categories = [
  "Rental House",
  "Apartment",
  "Houses",
  "Rooms",
  "Villas",
  "Cabins",
  "Cottages",
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Rental House");
  const TITLE_1 = "Trouvez";
  const TITLE_2 = "Votre nouveaux logement";
  const TITLE_3 = "Logements proches de vous";
  const router = useRouter();
  const onHousePress = (id: string) => {
    router.push({
      pathname: "/houses/[id]",
      params: { id },
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <TopBar />

        {/* Title */}
        <View className="px-4 mt-4">
          <Text className="text-3xl font-bold text-gray-900">{TITLE_1}</Text>
          <Text className="text-3xl font-bold text-gray-900">{TITLE_2}</Text>
        </View>

        {/* Search Bar */}
        <SearchBar />

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
              onPress={() => setActiveCategory(category)}
            />
          ))}
        </ScrollView>

        {/* Section Title */}
        <View className="px-4 mt-2 mb-3">
          <Text className="text-lg font-bold text-gray-900">{TITLE_3}</Text>
        </View>

        {/* House Cards Grid */}
        <View className="px-4 flex-row flex-wrap justify-between">
          {HOUSES.map((house) => (
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
