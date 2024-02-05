import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];

const pinLength = 4;
const pinContainerSize = width / 2;
const pinFullSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinFullSize - pinSpacing * 2;

const dialPadWidth = width / 5;
const dialPadText = dialPadWidth * 0.4;
const itemsGap = 15;

const randomColor = (hue?: number, luminosity?: number) => {
  const hueRange = 360;
  const luminosityRange = 100;
  const newHue = hue || Math.floor(Math.random() * hueRange);
  const newLuminosity =
    luminosity || Math.round(Math.random() * luminosityRange);
  return {
    color: `hsl(${newHue}, 100%, ${newLuminosity}%)`,
    hue: newHue,
    luminosity: newLuminosity,
  };
};

const baseColor = randomColor();

const _colors = {
  primary: baseColor.color,
  secondary: randomColor(baseColor.hue, -20),
};

function DialPad({
  onPress,
}: {
  onPress: (value: (typeof dialPad)[number]) => void;
}) {
  return (
    <FlatList
      data={dialPad}
      keyExtractor={(item) => item.toString()}
      numColumns={3}
      style={{ flexGrow: 0 }}
      columnWrapperStyle={{ gap: itemsGap * 2 }}
      contentContainerStyle={{ gap: itemsGap * 2 }}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <TouchableOpacity disabled={item === ""} onPress={() => onPress(item)}>
          <View
            style={{
              width: dialPadWidth,
              height: dialPadWidth,
              borderRadius: dialPadWidth,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: typeof item === "number" ? 1 : 0,
            }}
          >
            {item === "del" ? (
              <Ionicons
                name="backspace-outline"
                size={dialPadText}
                color={_colors.secondary.color}
              />
            ) : (
              <Text
                style={{
                  fontSize: dialPadText,
                  color: _colors.secondary.color,
                }}
              >
                {item}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default function Pincode() {
  const [code, setCode] = useState<number[]>([]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: _colors.primary,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: pinSpacing * 2,
          height: pinSize * 2,
          marginBottom: pinSize * 2,
          alignItems: "flex-end",
        }}
      >
        {[...Array(pinLength).keys()].map((i) => {
          const isSelected = !!code[i];
          return (
            <MotiView
              style={{
                width: pinSize,

                borderRadius: pinSize,
                backgroundColor: _colors.secondary.color,
              }}
              key={i}
              animate={{
                height: isSelected ? pinSize : 2,
                marginBottom: isSelected ? pinSize / 2 : 0,
              }}
              transition={{
                type: "timing",
                duration: 200,
              }}
            />
          );
        })}
      </View>
      <DialPad
        onPress={(value) => {
          if (value === "del") {
            setCode((prev) => prev.slice(0, -1));
          } else if (value === "") {
            setCode([]);
          } else if (typeof value === "number") {
            if (code.length < pinLength) setCode((prev) => [...prev, value]);
          }
        }}
      />
    </View>
  );
}
