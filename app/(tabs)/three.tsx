import { useRouter } from "expo-router";
import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";

export default function Three() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => router.push("/two")}>
        <Animated.Text>Hello World</Animated.Text>
      </TouchableOpacity>
    </View>
  );
}
