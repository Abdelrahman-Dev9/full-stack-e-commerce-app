import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

  return (
    <View className="flex-1 pt-20 bg-white">
      {/* Scrollable content */}
      <ScrollView>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-8">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-400">PROFILE</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
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
        <View className="p-6 mx-4 mt-6 bg-blue-600 shadow-lg rounded-xl">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-medium text-white">
              Total Balance
            </Text>
            <FontAwesome5 name="wallet" size={20} color="white" />
          </View>
          <Text className="mt-2 text-2xl font-bold text-white">
            ${user.balance.toLocaleString()}
          </Text>
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-white">•••• {user.cardNumber}</Text>
            <TouchableOpacity className="px-4 py-1 bg-white rounded-full">
              <Text className="font-semibold text-blue-600">Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* My Orders */}
        <View className="px-4 mt-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-lg font-semibold">My Orders</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between">
            {/* To Receive */}
            <View className="items-center flex-1 p-4 mr-2 bg-white shadow rounded-xl">
              <MaterialIcons name="local-shipping" size={24} color="#3b82f6" />
              <Text className="mt-2 font-medium">To Receive</Text>
              <Text className="text-sm text-gray-400">
                {user.orders.toReceive} items
              </Text>
            </View>
            {/* Processing */}
            <View className="items-center flex-1 p-4 mx-1 bg-white shadow rounded-xl">
              <MaterialIcons name="inventory" size={24} color="#f59e0b" />
              <Text className="mt-2 font-medium">Processing</Text>
              <Text className="text-sm text-gray-400">
                {user.orders.processing} item
              </Text>
            </View>
            {/* Completed */}
            <View className="items-center flex-1 p-4 ml-2 bg-white shadow rounded-xl">
              <MaterialIcons name="check-circle" size={24} color="#10b981" />
              <Text className="mt-2 font-medium">Completed</Text>
              <Text className="text-sm text-gray-400">
                {user.orders.completed} items
              </Text>
            </View>
          </View>
        </View>
        {/* Settings */}
        <View className="mx-4 mt-6 bg-white shadow rounded-xl">
          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
            <View className="flex-row items-center">
              <MaterialIcons name="person" size={24} color="#374151" />
              <Text className="ml-4 text-base">Personal Details</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
            <View className="flex-row items-center">
              <MaterialIcons name="credit-card" size={24} color="#374151" />
              <Text className="ml-4 text-base">Payment Methods</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-row items-center">
              <MaterialIcons name="notifications" size={24} color="#374151" />
              <Text className="ml-4 text-base">Notifications</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 mr-2 bg-red-500 rounded-full" />
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        </View>
        {/* Log Out */}
        <TouchableOpacity className="items-center py-4 mx-4 mt-6 bg-white shadow rounded-xl">
          <Text className="font-semibold text-red-600">Log Out</Text>
        </TouchableOpacity>
        <View className="h-24" /> {/* Space for bottom tabs */}
      </ScrollView>
    </View>
  );
};

export default UserProfileScreen;
