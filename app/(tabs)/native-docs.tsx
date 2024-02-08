import React, { PropsWithChildren, useEffect, useRef } from "react";
import {
  Animated,
  Text,
  View,
  ViewStyle,
  PanResponder,
  Button,
  LayoutAnimation,
} from "react-native";

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

const PanResponderComp = () => {
  const panRef = useRef(new Animated.ValueXY()).current;
  const responderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: panRef.x, dy: panRef.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(panRef, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 16 }}>Drag & Release this box!</Text>
      <Animated.View
        style={{
          transform: [{ translateX: panRef.x }, { translateY: panRef.y }],
        }}
        {...responderRef.panHandlers}
      >
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "red",
            borderRadius: 10,
          }}
        />
      </Animated.View>
    </View>
  );
};

const LayoutAnim = () => {
  const [boxPosition, setBoxPosition] = React.useState<"left" | "right">("left");

  const toggleBox = () => {
    LayoutAnimation.configureNext({
      duration: 1000,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'spring', springDamping: 0.8},
      delete: {type: 'linear', property: 'opacity'},
    })
    setBoxPosition(boxPosition === "left"? "right" : "left");
  };
  
  return (
    <View style={{ alignItems: "flex-start", justifyContent: "center", width: '100%' }}>
      <View style={{ alignSelf: "center" }}>
        <Button title="Toggle Layout" onPress={toggleBox} />
      </View>
      <View
        style={[
          {
            height: 100,
            width: 100,
            borderRadius: 5,
            margin: 8,
            backgroundColor: "blue",
          },
          boxPosition === "left"
            ? null
            : {
                alignSelf: "flex-end",
                height: 200,
                width: 200,
              },
        ]}
      />
    </View>
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
        gap: 20,
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

      <PanResponderComp />

      <LayoutAnim />
    </View>
  );
}
