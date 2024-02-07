import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const images = {
  man: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids: "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
};

const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i as keyof typeof images],
  ref: createRef<View>(),
}));

const { width, height } = Dimensions.get("window");

type Measurement = { x: number; y: number; width: number; height: number };

const Indicator = ({
  scrollX,
  measurements,
}: {
  scrollX: Animated.Value;
  measurements: Measurement[];
}) => {
  const inputRange = data.map((_, index) => index * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measurements.map((m) => m.width),
  });
  const indicatorLeft = scrollX.interpolate({
    inputRange,
    outputRange: measurements.map((m) => m.x),
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 4,
        width: indicatorWidth,
        left: 0,
        backgroundColor: "#fff",
        bottom: -10,
        transform: [{ translateX: indicatorLeft }],
      }}
    />
  );
};

const Tab = forwardRef<
  View,
  { item: string; onPress: () => void }
>(({ item, onPress }, ref) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View ref={ref}>
        <Text
          style={{
            color: "#fff",
            fontSize: 84 / data.length,
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Tabs = ({
  scrollX,
  onPress,
}: {
  scrollX: Animated.Value;
  onPress: (itemIndex: number) => void;
}) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const containerRef = useRef<View>(null);

  useEffect(() => {
    let m: Measurement[] = [];
    data.forEach((item) => {
      item.ref.current?.measureLayout(
        containerRef?.current!,
        (x, y, width, height) => {
          m.push({ x, y, width, height });
          if (m.length === data.length) {
            setMeasurements(m);
          }
        }
      );
    });
  }, []);

  return (
    <View style={{ position: "absolute", top: 100, width }}>
      <View
        ref={containerRef}
        style={{
          justifyContent: "space-evenly",
          flex: 1,
          flexDirection: "row",
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={index}
              item={item.title}
              ref={item.ref}
              onPress={() => onPress(index)}
            />
          );
        })}
      </View>
      {measurements.length > 0 && (
        <Indicator scrollX={scrollX} measurements={measurements} />
      )}
    </View>
  );
};

export default function AnimatedTabs() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef<FlatList>(null);

  const onItemPress = useCallback((itemIndex: number) => {
    ref?.current!.scrollToOffset({ offset: itemIndex * width, animated: true });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.image }}
                style={{ width, height }}
                resizeMode="cover"
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: "rgba(0, 0, 0, 0.3)" },
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} onPress={onItemPress} />
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
