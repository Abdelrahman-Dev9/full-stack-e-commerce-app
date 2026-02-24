import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import EditableInput from "@/src/components/EditableInput";
import {
  useCreateAddressMutation,
  useGetAddressQuery,
} from "@/src/services/addressApi";
import {
  useGetProfileQuery,
  useUploadUserImageMutation,
} from "@/src/services/profileApi";
import { clearAuth } from "@/src/store/authSlice";
import { RootState } from "@/src/store/store";

type AddressFormData = {
  phone: string;
  city: string;
  area: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  notes: string;
};

const UserProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  // RTK Mutations
  const [createAddress, { isLoading }] = useCreateAddressMutation();
  const [uploadUserImage, { isLoading: uploading }] =
    useUploadUserImageMutation();

  const { data: addressData, isLoading: addressLoading } = useGetAddressQuery(
    token || "",
    { skip: !token }
  );

  const { control, handleSubmit, setValue } = useForm<AddressFormData>({
    defaultValues: {
      phone: "",
      city: "",
      area: "",
      street: "",
      building: "",
      floor: "",
      apartment: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (addressData?.userAddress?.length > 0) {
      const addr = addressData.userAddress[0];
      setValue("phone", addr.phone);
      setValue("city", addr.city);
      setValue("area", addr.area);
      setValue("street", addr.street);
      setValue("building", addr.building);
      setValue("floor", addr.floor);
      setValue("apartment", addr.apartment);
      setValue("notes", addr.notes);
    }
  }, [addressData]);

  // Profile query
  const {
    data: profileData,
    refetch: refetchProfile,
    isLoading: profileLoading,
  } = useGetProfileQuery(token);

  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  const shadowStyle =
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
        }
      : { elevation: 4 };

  // ─── Handlers ─────────────────────────────────────────────────────
  const onSubmit = async (data: AddressFormData) => {
    if (!token) {
      Alert.alert("Error", "No auth token found.");
      return;
    }

    try {
      await createAddress({
        ...data,
        isDefault: true,
        token,
      }).unwrap();

      Alert.alert("Success", "Home address saved successfully!");
    } catch (error) {
      console.error("Create address error:", error);
      Alert.alert("Error", "Could not save address. Try again.");
    }
  };

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
        const type = image.mimeType || "image/jpeg";

        setLocalAvatar(localUri); // Optimistic update

        await uploadUserImage({
          userId: profileData?.id!,
          image: { uri: localUri, name: filename!, type },
        }).unwrap();

        refetchProfile();
      }
    } catch (err) {
      console.log("Upload failed:", err);
      Alert.alert("Upload failed", "Could not upload image. Try again.");
    }
  };

  if (profileLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );

  const user = {
    name: profileData?.name ?? "Your Name",
    email: profileData?.email ?? "your.email@example.com",
    avatar:
      localAvatar ??
      profileData?.avatarUrl ??
      "https://via.placeholder.com/150",
  };

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#fff" }}
    >
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PROFILE</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile Avatar */}
        <View style={styles.profileContainer}>
          <View style={{ position: "relative" }}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editAvatarBtn}
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
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.userEmailContainer}>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>

        {/* Edit Home Address */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Edit Home Address</Text>

          <EditableInput
            control={control}
            name="phone"
            label="Phone Number"
            placeholder="Phone"
            keyboardType="phone-pad"
          />
          <EditableInput
            control={control}
            name="city"
            label="City"
            placeholder="City"
          />
          <EditableInput
            control={control}
            name="area"
            label="Area"
            placeholder="Area"
          />
          <EditableInput
            control={control}
            name="street"
            label="Street"
            placeholder="Street"
          />
          <EditableInput
            control={control}
            name="building"
            label="Building"
            placeholder="Building"
          />
          <EditableInput
            control={control}
            name="floor"
            label="Floor"
            placeholder="Floor"
          />
          <EditableInput
            control={control}
            name="apartment"
            label="Apartment"
            placeholder="Apartment"
          />
          <EditableInput
            control={control}
            name="notes"
            label="Delivery Notes"
            placeholder="Notes"
          />

          <TouchableOpacity
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
            style={styles.saveBtn}
          >
            <Text style={styles.saveBtnText}>
              {isLoading ? "Saving..." : "Save Address"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutBtn, shadowStyle]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#9CA3AF" },
  profileContainer: { alignItems: "center", marginTop: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2563EB",
    padding: 8,
    borderRadius: 999,
  },
  userName: { marginTop: 16, fontSize: 20, fontWeight: "700" },
  userEmailContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#DBEAFE",
    borderRadius: 999,
    marginTop: 4,
  },
  userEmail: { fontSize: 14, color: "#2563EB" },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 20,
    marginTop: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  saveBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 16,
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  logoutBtn: {
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  logoutText: { fontWeight: "600", color: "#DC2626" },
});
