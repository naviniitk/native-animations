import { useRouter } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";
import ReAnimated, {
  SharedTransition,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function Transition() {
  const router = useRouter();

  const transition = SharedTransition.custom((values) => {
    "worklet";
    return {
      height: withSpring(values.targetHeight, {
        damping: 100,
        mass: 1,
        stiffness: 100,
      }),
      width: withSpring(values.targetWidth, {
        damping: 100,
        mass: 1,
        stiffness: 100,
      }),
    };
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ReAnimated.View
        sharedTransitionTag="Transition"
        style={{ width: 150, height: 150, backgroundColor: "green" }}
      >
        <Text>I am Transitioning</Text>
      </ReAnimated.View>
      <Button
        title="Go Back"
        onPress={() => router.push("/(tabs)/native-docs")}
      />
    </View>
  );
}
