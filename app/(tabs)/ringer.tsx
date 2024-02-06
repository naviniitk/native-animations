import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Easing } from "react-native-reanimated";

const SIZE = 100;
const COLOR = "#FE5E5E";

export default function Ringer() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={[
          styles.dot,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        {["1", "2", "3"].map((_, index) => {
          return (
            <MotiView
              key={index}
              from={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 4 }}
              transition={{
                type: "timing",
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
                delay: index * 400,
                loop: true,
                repeatReverse: false,
              }}
              style={[StyleSheet.absoluteFillObject, styles.dot]}
            />
          );
        })}
        <Feather name="phone-outgoing" size={32} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: COLOR,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
});
