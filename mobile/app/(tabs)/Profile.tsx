import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const UserProfileScreen = () => {
  const router = useRouter();

  const user = {
    name: "Alex Sterling",
    status: "Premium Member",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328e9999?auto=format&fit=crop&w=200&q=80",
    balance: 14250.0,
    cardNumber: "8829",
    orders: {
      toReceive: 3,
      processing: 1,
      completed: 12,
    },
  };

  const shadowStyle =
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
        }
      : {
          elevation: 4,
        };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="bg-white ">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-gray-400">PROFILE</Text>

          <TouchableOpacity>
            <Ionicons name="settings-sharp" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View className="items-center mt-6">
          <View className="relative">
            <Image
              source={{ uri: user.avatar }}
              className="w-24 h-24 rounded-full"
            />

            <TouchableOpacity className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full">
              <MaterialIcons name="edit" size={18} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="mt-4 text-xl font-bold">{user.name}</Text>

          <View className="px-3 py-1 mt-1 bg-blue-100 rounded-full">
            <Text className="text-sm text-blue-600">{user.status}</Text>
          </View>
        </View>

        {/* Balance Card */}
        <View
          style={shadowStyle}
          className="p-6 mx-4 mt-6 bg-blue-600 rounded-2xl"
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-white">
              Total Balance
            </Text>
            <FontAwesome5 name="wallet" size={20} color="white" />
          </View>

          <Text className="mt-2 text-3xl font-bold text-white">
            ${user.balance.toLocaleString()}
          </Text>

          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-white">•••• {user.cardNumber}</Text>

            <TouchableOpacity className="px-4 py-2 bg-white rounded-full">
              <Text className="font-semibold text-blue-600">Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Orders */}
        <View className="px-4 mt-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold">My Orders</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            {[
              {
                title: "To Receive",
                count: user.orders.toReceive,
                icon: "local-shipping",
                color: "#3b82f6",
              },
              {
                title: "Processing",
                count: user.orders.processing,
                icon: "inventory",
                color: "#f59e0b",
              },
              {
                title: "Completed",
                count: user.orders.completed,
                icon: "check-circle",
                color: "#10b981",
              },
            ].map((item, index) => (
              <View
                key={index}
                style={shadowStyle}
                className="items-center flex-1 p-4 mx-1 bg-white rounded-xl"
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
                <Text className="mt-2 font-medium">{item.title}</Text>
                <Text className="text-sm text-gray-400">
                  {item.count} items
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={shadowStyle} className="mx-4 mt-6 bg-white rounded-2xl">
          {[
            { icon: "person", title: "Personal Details" },
            { icon: "credit-card", title: "Payment Methods" },
            { icon: "notifications", title: "Notifications" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center justify-between px-4 py-4 ${
                index !== 2 ? "border-b border-gray-200" : ""
              }`}
            >
              <View className="flex-row items-center">
                <MaterialIcons
                  name={item.icon as any}
                  size={24}
                  color="#374151"
                />
                <Text className="ml-4 text-base">{item.title}</Text>
              </View>

              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={shadowStyle}
          className="items-center py-4 mx-4 mt-6 bg-white rounded-2xl"
        >
          <Text className="font-semibold text-red-600">Log Out</Text>
        </TouchableOpacity>

        <View />
      </SafeAreaView>
    </ScrollView>
  );
};

export default UserProfileScreen;
