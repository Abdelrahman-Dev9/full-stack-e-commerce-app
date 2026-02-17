import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="home"
              size={size}
              color={focused ? "#0d7ff2" : "#9ca3af"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              name="explore"
              size={size}
              color={focused ? "#0d7ff2" : "#9ca3af"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="WishList"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              name="favorite"
              size={size}
              color={focused ? "#0d7ff2" : "#9ca3af"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              name="shopping-bag"
              size={size}
              color={focused ? "#0d7ff2" : "#9ca3af"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              name="person"
              size={size}
              color={focused ? "#0d7ff2" : "#9ca3af"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
