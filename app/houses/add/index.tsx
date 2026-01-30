import { categories } from "@/data/HOUSES";
import { addHouse } from "@/services/houses";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddHouseScreen() {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
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

    const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400";

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
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-gray-50 rounded-full">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Ajouter une propriété</Text>
                <View className="w-10" />
            </View>
                
            <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Image Section */}
                <View className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-8 items-center justify-center">
                    <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center m-3">
                        <Ionicons name="image-outline" size={30} color="#3b82f6" />
                    </View>
                    <Text className="text-gray-900 font-medium mb-1">Image de couverture</Text>
                    <Text className="text-gray-500 text-center text-sm px-4 mb-4">Une image par défaut sera utilisée pour cette démo</Text>

                    <Image
                        source={{ uri: DEFAULT_IMAGE }}
                        className="w-full h-40 rounded-xl mb-4"
                        resizeMode="cover"
                    />
                </View>
                {/* Basic Info Section */}
                <Text className="text-lg font-semibold text-gray-800 my-4">Informations de base</Text>

                <View className="space-y-4">
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text className="text-sm font-medium text-gray-500 mb-1">Nom de la propriété</Text>
                                <TextInput
                                    className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                    placeholder="Ex: Villa du Soleil"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.name && <Text className="text-red-500 text-xs mt-1">Ce champ est requis.</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="location"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text className="text-sm font-medium text-gray-500 mb-1">Lieu</Text>
                                <TextInput
                                    className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                    placeholder="Ex: Paris, France"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.location && <Text className="text-red-500 text-xs mt-1">Ce champ est requis.</Text>}
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
                                        <Text className="text-sm font-medium text-gray-500 mb-1">Prix / nuit</Text>
                                        <TextInput
                                            className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                            placeholder="150"
                                            keyboardType="numeric"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                        {errors.price && <Text className="text-red-500 text-xs mt-1">Requis</Text>}
                                    </View>
                                )}
                            />
                        </View>
                        <View className="flex-1">
                            <Controller
                                control={control}
                                name="category"
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <Text className="text-sm font-medium text-gray-500 mb-1">Catégorie</Text>
                                        <View className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                                            {/* Simple Dropdown Simulator or just text input for now, using TextInput for simplicity or could be horizontal scroll */}
                                            <TextInput
                                                className="p-4 text-gray-900"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>

                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Text className="text-sm font-medium text-gray-500 mb-1">Description</Text>
                                <TextInput
                                    className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 h-32"
                                    placeholder="Décrivez votre propriété..."
                                    multiline
                                    textAlignVertical="top"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.description && <Text className="text-red-500 text-xs mt-1">Ce champ est requis.</Text>}
                            </View>
                        )}
                    />
                </View>

                {/* Features Section */}
                <Text className="text-lg font-semibold text-gray-800 mt-8 mb-4">Caractéristiques</Text>
                <View className="flex-row flex-wrap justify-between">
                    <View className="w-[48%] mb-4">
                        <Controller
                            control={control}
                            name="bedrooms"
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text className="text-sm font-medium text-gray-500 mb-1">Chambres</Text>
                                    <TextInput
                                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                        keyboardType="numeric"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                </View>
                            )}
                        />
                    </View>
                    <View className="w-[48%] mb-4">
                        <Controller
                            control={control}
                            name="bathrooms"
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text className="text-sm font-medium text-gray-500 mb-1">Salles de bain</Text>
                                    <TextInput
                                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                        keyboardType="numeric"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                </View>
                            )}
                        />
                    </View>
                    <View className="w-[48%] mb-4">
                        <Controller
                            control={control}
                            name="parking"
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text className="text-sm font-medium text-gray-500 mb-1">Parking</Text>
                                    <TextInput
                                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                        keyboardType="numeric"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                </View>
                            )}
                        />
                    </View>
                    <View className="w-[48%] mb-4">
                        <Controller
                            control={control}
                            name="kitchen"
                            render={({ field: { onChange, value } }) => (
                                <View>
                                    <Text className="text-sm font-medium text-gray-500 mb-1">Cuisine</Text>
                                    <TextInput
                                        className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                </View>
                            )}
                        />
                    </View>
                </View>

                <View className="bg-gray-50 rounded-2xl p-4 mt-2 space-y-4">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-base font-medium text-gray-900">Wifi inclus</Text>
                        <Controller
                            control={control}
                            name="wifi"
                            render={({ field: { onChange, value } }) => (
                                <Switch
                                    trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                                    thumbColor={"#fff"}
                                    onValueChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>
                    <View className="h-[1px] bg-gray-200" />
                    <View className="flex-row items-center justify-between">
                        <Text className="text-base font-medium text-gray-900">Garage</Text>
                        <Controller
                            control={control}
                            name="garage"
                            render={({ field: { onChange, value } }) => (
                                <Switch
                                    trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                                    thumbColor={"#fff"}
                                    onValueChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>
                </View>

                


                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="bg-blue-600 p-4 rounded-2xl mt-8 shadow-lg shadow-blue-200 active:bg-blue-700"
                >
                    <Text className="text-white text-center font-bold text-lg">Ajouter la propriété</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
