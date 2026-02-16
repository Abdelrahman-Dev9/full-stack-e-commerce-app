import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Search" />
      <Tabs.Screen name="WishList" />
      <Tabs.Screen name="Cart" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
};

export default _layout;
