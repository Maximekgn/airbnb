import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/home")}
      >
        <Text>LOGIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
