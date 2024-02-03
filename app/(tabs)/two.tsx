import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { DATA } from "../../data";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef } from "react";

const { width, height } = Dimensions.get("window");

const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Circle = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      {DATA.map((item, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0],
        });
        return (
          <Animated.View
            key={index}
            style={{
              backgroundColor: item.color,
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              borderRadius: CIRCLE_SIZE / 2,
              position: "absolute",
              top: "15%",
              opacity,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const Ticker = ({ scrollX }: { scrollX: Animated.Value }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });

  return (
    <View
      style={{
        position: "absolute",
        top: 40,
        left: 20,
        overflow: "hidden",
        height: TICKER_HEIGHT,
      }}
    >
      <Animated.View style={{ transform: [{ translateY }] }}>
        {DATA.map((item, index) => {
          return (
            <Text
              key={index}
              style={{
                fontSize: TICKER_HEIGHT,
                lineHeight: TICKER_HEIGHT,
                textTransform: "uppercase",
                letterSpacing: 2,
                fontWeight: "800",
                fontFamily: "SpaceMono-Bold",
              }}
            >
              {item.type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Item = ({
  imageUri,
  heading,
  description,
  index,
  scrollX,
}: {
  imageUri: any;
  heading: string;
  description: string;
  index: number;
  scrollX: Animated.Value;
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.2, 0, -width * 0.2],
  });

  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.6, 0, -width * 0.6],
  });

  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <View
      style={{
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Animated.Image
        source={imageUri}
        style={{
          width: width * 0.75,
          height: width * 0.75,
          resizeMode: "contain",
          flex: 0.7,
          transform: [{ scale }],
        }}
      />
      <View
        style={{
          alignItems: "flex-start",
          alignSelf: "flex-end",
          flex: 0.5,
        }}
      >
        <Animated.Text
          style={{
            color: "#444",
            textTransform: "uppercase",
            fontSize: 24,
            fontWeight: "800",
            letterSpacing: 2,
            marginBottom: 5,
            transform: [{ translateX: translateXHeading }],
          }}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={{
            color: "#ccc",
            fontWeight: "600",
            textAlign: "left",
            width: width * 0.75,
            marginRight: 10,
            fontSize: 16,
            lineHeight: 16 * 1.5,
            opacity,
            transform: [{ translateX: translateXDescription }],
          }}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const Pagination = ({ scrollX }: { scrollX: Animated.Value }) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });

  return (
    <View
      style={{
        position: "absolute",
        right: 20,
        bottom: 40,
        flexDirection: "row",
        height: DOT_SIZE,
      }}
    >
      <Animated.View
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          borderWidth: 2,
          borderColor: '#ddd',
          position: "absolute",
          transform: [{ translateX }],
        }}
      />
      {DATA.map((item) => {
        return (
          <View
            key={item.key}
            style={{
              width: DOT_SIZE,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: 'transparent',
            }}
          >
            <View
              style={{
                width: DOT_SIZE * 0.3,
                height: DOT_SIZE * 0.3,
                borderRadius: DOT_SIZE * 0.15,
                backgroundColor: item.color,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default function TabTwoScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
      <View style={styles.container}>
        <Circle scrollX={scrollX} />
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Item {...item} index={index} scrollX={scrollX} />
          )}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        />
        <Image
          style={styles.logo}
          source={require("../../assets/images/ue_black_logo.png")}
        />
        <Pagination scrollX={scrollX} />
        <Ticker scrollX={scrollX} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: "-90deg" },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
});
