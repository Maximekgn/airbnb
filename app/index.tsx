import { APP_INFO } from "@/constants/APP_INFO";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WelcomeScreen = () => {
  const router = useRouter();
  const WELCOME = "Bienvenue";
  const APP_NAME = APP_INFO.name;
  const APP_DESCRIPTION = APP_INFO.description;
  const LOGIN = "Se Connecter";
  const REGISTER = "S'inscrire";
  const DESCRIPTION =
    "Trouvez votre logement idéal parmi notre vaste sélection d'appartements et de maisons adaptés à tous les styles de vie et budgets.";

  return (
    <ImageBackground
      source={require("../assets/images/home_house.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Logo Section - Positioned in the center/upper area */}
      <View style={styles.logoSection}>
        {/* Logo Circle */}
        <View style={styles.logoCircle}>
          <Ionicons name="snow-outline" size={32} color="black" />
        </View>

        {/* Main Title */}
        <Text style={styles.mainTitle}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>{APP_DESCRIPTION}</Text>
      </View>

      {/* Bottom White Container */}
      <View style={styles.bottomContainer}>
        <Text style={styles.welcomeText}>{WELCOME}</Text>

        <Text style={styles.tagline}>{DESCRIPTION}</Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.8}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginButtonText}>{LOGIN}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          activeOpacity={0.8}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.signupButtonText}>{REGISTER}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  logoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  logoCircle: {
    width: 110,
    height: 110,
    backgroundColor: "white",
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  logoSubtext: {
    fontSize: 9,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center",
    lineHeight: 11,
    color: "#000",
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: "700",
    color: "white",
    letterSpacing: 4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  bottomContainer: {
    backgroundColor: "white",
    borderTopRightRadius: 100,
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 40,
    alignItems: "center",
    minHeight: "45%",
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 16,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  signupButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  signupButtonText: {
    color: "#111827",
    fontWeight: "700",
    fontSize: 17,
  },
});

export default WelcomeScreen;
