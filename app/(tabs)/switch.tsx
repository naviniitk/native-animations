import { MotiView } from "moti";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Easing } from "react-native-reanimated";

const COLORS = {
  active: "#2C2C2C",
  inActive: "#DCDCDC",
};

type SwitchProps = {
  size: number;
  onPress: () => void;
  isActive: boolean;
};

const Switch: React.FC<SwitchProps> = ({ size, onPress, isActive }) => {
  const trackWidth = useMemo(() => size * 1.5, [size]);
  const trackHeight = useMemo(() => size * 0.4, [size]);
  const knobSize = useMemo(() => size * 0.6, [size]);
  return (
    <Pressable onPress={onPress}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MotiView
          style={{
            position: "absolute",
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
          }}
          from={{
            backgroundColor: isActive ? COLORS.active : COLORS.inActive,
          }}
          animate={{
            backgroundColor: isActive ? COLORS.inActive : COLORS.active,
          }}
          transition={{
            type: "timing",
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }}
        />
        <MotiView
          style={{
            width: size,
            height: size,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: size / 2,
          }}
          transition={{
            type: "timing",
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          }}
          animate={{
            translateX: isActive ? -trackWidth / 4 : trackWidth / 4,
          }}
        >
          <MotiView
            transition={{
              type: "timing",
              duration: 300,
              easing: Easing.inOut(Easing.ease),
            }}
            style={{
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: size / 10,
            }}
            animate={{
              width: isActive ? knobSize : 0,
              borderColor: isActive ? COLORS.inActive : COLORS.active,
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

export default function SwitchScreen() {
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.container}>
      <Switch
        size={120}
        onPress={() => {
          setIsActive(!isActive);
        }}
        isActive={isActive}
      />
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
