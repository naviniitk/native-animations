import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  Pressable,
} from "react-native";
const { width, height } = Dimensions.get("screen");

type PexelPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const API_URL =
  "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";

const IMAGE_SIZE = 80;
const SPACING = 10;

const fetchImages = async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY!,
    },
  });
  const data = await response.json();
  return data.photos as PexelPhoto[];
};

export default function ImageViewer() {
  const [images, setImages] = useState<PexelPhoto[]>();
  const topRef = useRef<FlatList>(null);
  const bottomRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
    topRef.current?.scrollToIndex({ index, animated: true });
    bottomRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchImages();
      setImages(data);
    };
    if (!images) {
      fetchData();
    }
  }, []);

  if (!images) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={"fast"}
        onMomentumScrollEnd={(ev) => {
          handleIndexChange(Math.round(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.src.portrait }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={bottomRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={"fast"}
        style={{ position: "absolute", bottom: IMAGE_SIZE }}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => {
                handleIndexChange(index);
              }}
            >
              <Image
                source={{ uri: item.src.portrait }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: activeIndex === index ? 4 : 0,
                  borderColor: "gold",
                }}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}
