import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { clearAuth } from "@/src/store/authSlice";
import {
  useGetProfileQuery,
  useUploadUserImageMutation,
} from "@/src/services/profileApi";

const UserProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  // Fetch profile
  const {
    data: profileData,
    refetch: refetchProfile,
    isLoading: profileLoading,
  } = useGetProfileQuery(token);

  // Upload mutation
  const [uploadUserImage, { isLoading: uploading }] =
    useUploadUserImageMutation();

  // Optimistic avatar state
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  // Shadow style
  const shadowStyle =
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
        }
      : { elevation: 4 };

  // Logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(clearAuth());
          router.replace("/Login");
        },
      },
    ]);
  };

  // Request permission
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "We need gallery access to upload your avatar."
      );
      return false;
    }
    return true;
  };

  // Pick image and upload
  const pickImageAndUpload = async () => {
    const granted = await requestPermission();
    if (!granted) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const image = result.assets[0];
        const localUri = image.uri;
        const filename = image.fileName || localUri.split("/").pop();
        const type = image.type || "image/jpeg";

        setLocalAvatar(localUri); // Optimistic update

        await uploadUserImage({
          userId: profileData?.id!,
          image: { uri: localUri, name: filename!, type },
        }).unwrap();

        // Refetch profile to get updated avatar
        refetchProfile();
      }
    } catch (err) {
      console.log("Upload failed:", err);
      Alert.alert("Upload failed", "Could not upload image. Try again.");
    }
  };

  if (profileLoading)
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );

  const user = {
    name: profileData?.name ?? "Your Name",
    email: profileData?.email ?? "your.email@example.com",
    avatar:
      localAvatar ??
      profileData?.avatarUrl ??
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGHwjvpWUaqTusRRVMxcCddA3ZM6YottUmkxhEkKGOU6s6hXkzPlrnfLjq5VMJR_j3fcuWmmtBBwG92it1-fDTz26N17iDU0Bwtt7VV47P7pZ6qefXR17ZCAsAV8Pl2SqTsQ8yoff-JTgnJG6xyCCHAyMEgOb_SWU4hO9jHdu90Jea1_-bvbWtvZhIP07984GavOvZu78Nu2dZY3nBnWquAGoEeEb0tA3T3iZ8JUJFtZEBJPzL0lPJ9BCiqZF7JBax0Tin_saHpGIU",
    balance: profileData?.balance ?? 0,
    cardNumber: profileData?.cardNumber ?? "0000",
    orders: profileData?.orders ?? {
      toReceive: 0,
      processing: 0,
      completed: 0,
    },
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="bg-white">
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
            <TouchableOpacity
              className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full"
              onPress={pickImageAndUpload}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <MaterialIcons name="edit" size={18} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <Text className="mt-4 text-xl font-bold">{user.name}</Text>
          <View className="px-3 py-1 mt-1 bg-blue-100 rounded-full">
            <Text className="text-sm text-blue-600">{user.email}</Text>
          </View>
        </View>

        {/* Balance */}
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
          onPress={handleLogout}
        >
          <Text className="font-semibold text-red-600">Log Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default UserProfileScreen;
