import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import * as Location from 'expo-location';

const TopBar = () => {
  const router = useRouter();
  const [locationText, setLocationText] = useState("Chargement...");

  const requestPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          'L\'application a besoin de la permission de localisation pour fonctionner.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erreur permission:', error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        setLocationText("-, -");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const { city, country } = reverseGeocode[0];
        setLocationText(`${city || 'Ville inconnue'}, ${country || 'Pays inconnu'}`);
      }
    } catch (error) {
      console.error('Erreur location:', error);
      setLocationText("Lomé, TOGO");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      {/* Location */}
      <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2">
        <Ionicons name="location-outline" size={18} color="#666" />
        <Text className="ml-2 text-gray-700 font-medium">{locationText}</Text>
      </View>

      {/* Right side icons */}
      <View className="flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Image
            source={require('../assets/images/avatar.jpg')}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
