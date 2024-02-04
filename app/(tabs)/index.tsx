import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import EARRINGS from "../../assets/images/earrings.png";
import FLAMINGO from "../../assets/images/flamingo.png";
import HAIR_SPRAY from "../../assets/images/hair-spray.png";
import GAME_CONTROLLER from "../../assets/images/game-controller.png";
import { useRef } from "react";
import { StatusBar } from "expo-status-bar";

// const EARRINGS = await Asset.loadAsync(require("../../images/earrings.png"));
// const FLAMINGO = await Asset.loadAsync(require("../../images/flamingo.png"));
// const HAIR_SPRAY = await Asset.loadAsync(
//   require("../../images/hair-spray.png")
// );
// const GAME_CONTROLLER = await Asset.loadAsync(
//   require("../../images/game-controller.png")
// );

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: GAME_CONTROLLER,
  },

  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: EARRINGS,
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: HAIR_SPRAY,
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: FLAMINGO,
  },
];

const { width, height } = Dimensions.get("window");

const Square = ({ scrollX }: { scrollX: Animated.Value }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "#fff",
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.65,
        left: -height * 0.3,
        transform: [{ rotate }, { translateX }],
      }}
    />
  );
};

const Indicator = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 100,
        flexDirection: "row",
        backgroundColor: "transparent",
      }}
    >
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              margin: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              opacity,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }: { scrollX: Animated.Value }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((color) => color),
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

export default function TabOneScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        pagingEnabled
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
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width,
                alignItems: "center",
                padding: 20,
                backgroundColor: "transparent",
              }}
            >
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: width / 2, height: width / 2 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 0.3, backgroundColor: "transparent" }}>
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 28,
                    marginBottom: 10,
                    color: "#fff",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontWeight: "300", color: "#fff" }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
