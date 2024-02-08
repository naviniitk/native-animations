import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, Text, View, ViewStyle } from "react-native";

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle; loop?: boolean }>;

const FadeInView: React.FC<FadeInViewProps> = ({
  style,
  children,
  loop = false,
}) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loop) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeInAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeInAnim, {
            toValue: 0,
            delay: 100,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeInAnim]);

  return (
    <Animated.View
      style={{
        backgroundColor: "aqua",
        width: 200,
        height: 40,
        opacity: fadeInAnim,
        ...style,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default function NativeDocs() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 20,
      }}
    >
      <FadeInView
        style={{
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Hello World</Text>
      </FadeInView>
    </View>
  );
}
