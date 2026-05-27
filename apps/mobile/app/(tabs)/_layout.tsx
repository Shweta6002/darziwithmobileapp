import React from "react";
import { Tabs } from "expo-router";
import { Compass, ShoppingBag, FolderHeart, User } from "lucide-react-native";
import { View, Text } from "react-native";

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#faf9f6",
          borderTopColor: "#eae6df",
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.02,
          shadowRadius: 8,
          elevation: 2,
        },
        tabBarActiveTintColor: "#17181c",
        tabBarInactiveTintColor: "#8e8a82",
        tabBarLabelStyle: {
          fontFamily: "SpaceGrotesk-Regular",
          fontSize: 9,
          letterSpacing: 1.2,
          textTransform: "uppercase" as any,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Compass size={focused ? 20 : 18} color={color} strokeWidth={focused ? 2.5 : 1.7} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, focused }) => (
            <ShoppingBag size={focused ? 20 : 18} color={color} strokeWidth={focused ? 2.5 : 1.7} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <FolderHeart size={focused ? 20 : 18} color={color} strokeWidth={focused ? 2.5 : 1.7} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <User size={focused ? 20 : 18} color={color} strokeWidth={focused ? 2.5 : 1.7} />
          ),
        }}
      />
    </Tabs>
  );
}
