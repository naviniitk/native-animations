import React, { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, Text, View, ViewStyle } from "react-native";

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

const FadeInView: React.FC<FadeInViewProps> = ({ style, children }) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim])

  return (
    <Animated.View style={{ backgroundColor: "aqua", width: 200, height: 40, opacity: fadeInAnim, ...style }}>
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
      <FadeInView style={{borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Hello World</Text>
      </FadeInView>
    </View>
  );
}
