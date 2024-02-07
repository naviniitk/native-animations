import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Retro",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="headphones"
        options={{
          title: "Headphones",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="shopping"
        options={{
          title: "Shopping Item",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="camera" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="timer"
        options={{
          title: "Timer",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="parallax"
        options={{
          title: "Parallax",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="camera" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="album"
        options={{
          title: "3D Album",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="albums" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="colors"
        options={{
          title: "Colors",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="color-palette" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="sticky"
        options={{
          title: "Sticky",
          headerTransparent: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="magnet" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="accordion"
        options={{
          title: "Accordion",
          headerTransparent: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="expand" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="stacked"
        options={{
          title: "Stack",
          headerTransparent: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="file-tray-stacked" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="pincode"
        options={{
          title: "Pincode",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="keypad" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="switch"
        options={{
          title: "Switch",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="toggle" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="image-viewer"
        options={{
          title: "Image Viewer",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="image" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="scroller"
        options={{
          title: "Scroller",
          headerTransparent: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="ringer"
        options={{
          title: "Ringer",
          headerTransparent: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="call" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="carousal"
        options={{
          title: "Carousal",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="aperture" color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
