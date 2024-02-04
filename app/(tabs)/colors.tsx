import React, { useRef, useState } from "react";
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const DURATION = 2000;
const TEXT_DURATION = DURATION * 0.8;

const quotes = [
  {
    quote:
      "For the things we have to learn before we can do them, we learn by doing them.",
    author: "Aristotle, The Nicomachean Ethics",
  },
  {
    quote: "The fastest way to build an app.",
    author: "The Expo Team",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
    author: "Steve Jobs",
  },
  {
    quote:
      "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey",
  },
  {
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
];

const colors = [
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "#222",
  },
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "yellowgreen",
  },
  {
    initialBgColor: "#222",
    bgColor: "yellowgreen",
    nextBgColor: "midnightblue",
  },
  {
    initialBgColor: "yellowgreen",
    bgColor: "midnightblue",
    nextBgColor: "turquoise",
  },
  {
    initialBgColor: "midnightblue",
    bgColor: "turquoise",
    nextBgColor: "goldenrod",
  },
  {
    initialBgColor: "turquoise",
    bgColor: "goldenrod",
    nextBgColor: "#222",
  },
];

type CircleProps = {
  onPress: () => void;
  animatedValue: Animated.Value;
};

const Circle: React.FC<CircleProps> = ({ onPress, animatedValue }) => {
  const inputRange = [0, 0.001, 0.5, 0.5001, 1];
  const containerBackground = animatedValue.interpolate({
    inputRange,
    outputRange: ["gold", "gold", "gold", "turquoise", "turquoise"],
  });

  const circleBackground = animatedValue.interpolate({
    inputRange,
    outputRange: ["turquoise", "turquoise", "turquoise", "gold", "gold"],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        { backgroundColor: containerBackground },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBackground,
            transform: [
              { perspective: 100 },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circleButton]}>
            <AnimatedAntDesign name="arrowright" size={28} color="white" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function App() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration: DURATION,
      useNativeDriver: true,
    });
  };

  const onCirclePress = () => {
    setIndex(index === 0 ? 1 : 0);
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", paddingTop: 100 }}>
      <StatusBar hidden />
      <Circle onPress={onCirclePress} animatedValue={animatedValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  circleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "gold",
    padding: 8,
    paddingBottom: 100,
    alignItems: "center",
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "turquoise",
  },
  circleButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
