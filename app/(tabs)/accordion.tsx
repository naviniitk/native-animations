import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

const DATA = [
  {
    bg: "#A8DDE9",
    color: "#3F5B98",
    category: "Healthcare",
    subCategories: ["Skincare", "Personal care", "Health", "Eye care"],
  },
  {
    bg: "#086E4B",
    color: "#FCBE4A",
    category: "Food & Drink",
    subCategories: [
      "Fruits & Vegetables",
      "Frozen Food",
      "Bakery",
      "Snacks & Desserts",
      "Beverages",
      "Alcoholic beverages",
      "Noodles & Pasta",
      "Rice & Cooking oil",
    ],
  },
  {
    bg: "#FECBCA",
    color: "#FD5963",
    category: "Beauty",
    subCategories: ["Skincare", "Makeup", "Nail care", "Perfume"],
  },
  {
    bg: "#193B8C",
    color: "#FECBCD",
    category: "Baby & Kids",
    subCategories: [
      "Toys",
      "Trolleys",
      "LEGO®",
      "Electronics",
      "Puzzles",
      "Costumes",
      "Food",
      "Hygiene & Care",
      "Child's room",
      "Feeding accessories",
    ],
  },
  {
    bg: "#FDBD50",
    color: "#F5F5EB",
    category: "Homeware",
    subCategories: [
      "Air purifiers",
      "Stoves, hoods & ovens",
      "Refrigerators",
      "Coffee & Tea",
      "Air conditioning",
      "Grilling",
      "Vacuum cleaners",
    ],
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>();
  const ref = useRef<Animated.View>(null);

  return (
    <Animated.View
      ref={ref}
      style={styles.container}
      layout={LinearTransition.duration(1000)}
    >
      <StatusBar hidden />
      {DATA.map((item, index) => {
        return (
          <TouchableOpacity
            key={item.category}
            onPress={() => {
              setCurrentIndex(index === currentIndex ? undefined : index);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <View style={[styles.card, { backgroundColor: item.bg }]}>
              <Animated.View>
                <Text style={[styles.heading, { color: item.color }]}>
                  {item.category}
                </Text>
                {index === currentIndex && (
                  <Animated.View
                    style={[styles.subCategoriesList]}
                    entering={FadeInDown.easing(
                      Easing.out(Easing.ease)
                    )}
                    exiting={FadeOutUp.easing(
                      Easing.in(Easing.ease)
                    )}
                  >
                    {item.subCategories.map((subCategory) => {
                      return (
                        <Text
                          key={subCategory}
                          style={[styles.body, { color: item.color }]}
                        >
                          {subCategory}
                        </Text>
                      );
                    })}
                  </Animated.View>
                )}
              </Animated.View>
            </View>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 38,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  subCategoriesList: {
    marginTop: 20,
  },
});
