// import { useGetWishListQuery } from "@/src/services/wishlistApi";
// import { RootState } from "@/src/store/store";
// import React from "react";
// import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
// import { useSelector } from "react-redux";

// const WishListScreen = () => {
//   // Grab userId directly from Redux auth slice
//   const userId = useSelector((state: RootState) => state.auth.userId);
//   // console.log(userId);

//   // Fetch wishlist
//   const { data, isLoading, error } = useGetWishListQuery(userId);

//   if (isLoading) return <ActivityIndicator size="large" />;
//   if (error) return <Text>Error loading wishlist</Text>;

//   return (
//     <FlatList
//       data={data?.items || []}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View style={{ margin: 10 }}>
//           <Image
//             source={{ uri: item.product.image }}
//             style={{ width: 100, height: 100 }}
//           />
//           <Text>{item.product.name}</Text>
//           <Text>{item.product.price}</Text>
//         </View>
//       )}
//     />
//   );
// };

// export default WishListScreen;

// import { useGetWishListQuery } from "@/src/services/wishlistApi";
// import { RootState } from "@/src/store/store";
// import React from "react";
// import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
// import { useSelector } from "react-redux";

// const WishListScreen = () => {
//   // Grab userId directly from Redux auth slice
//   const userId = useSelector((state: RootState) => state.auth.userId);
//   console.log(userId);

//   // Fetch wishlist
//   const { data, isLoading, error } = useGetWishListQuery(userId);

//   if (isLoading) return <ActivityIndicator size="large" />;
//   if (error) return console.log(error);
//   return (
//     <FlatList
//       data={data?.items || []}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View style={{ margin: 10 }}>
//           <Image
//             source={{ uri: item.product.image }}
//             style={{ width: 100, height: 100 }}
//           />
//           <Text>{item.product.name}</Text>
//           <Text>{item.product.price}</Text>
//         </View>
//       )}
//     />
//   );
// };

// export default WishListScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useGetWishListQuery } from "@/src/services/wishlistApi";
import { RootState } from "@/src/store/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2; // 2 columns with padding

// ─── Product Card Component ──────────────────────────────────────────────────

function WishlistCard({
  item,
  onRemove,
  onMoveToCart,
}: {
  item: any;
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
}) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    onRemove(item.id);
    setTimeout(() => setIsRemoving(false), 300);
  };

  return (
    <View
      className="mb-4 overflow-hidden bg-white rounded-2xl"
      style={{
        width: CARD_WIDTH,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Image Container */}
      <View className="relative">
        <Image
          source={{ uri: item.product.image }}
          className="w-full bg-gray-50"
          style={{ height: CARD_WIDTH * 1.2 }}
          resizeMode="cover"
        />

        {/* Favorite Button */}
        <TouchableOpacity
          onPress={handleRemove}
          disabled={isRemoving}
          className="absolute items-center justify-center w-10 h-10 bg-white rounded-full top-3 right-3"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 2,
            opacity: isRemoving ? 0.5 : 1,
          }}
        >
          <MaterialIcons name="favorite" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View className="p-3.5">
        {/* Brand */}
        <Text className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
          {item.product.brand || "BRAND"}
        </Text>

        {/* Product Name */}
        <Text
          className="text-sm font-bold text-[#1a1a1a] mb-2"
          numberOfLines={2}
        >
          {item.product.name}
        </Text>

        {/* Price */}
        <Text className="text-lg font-bold text-[#007AFF] mb-3">
          ${item.product.price}
        </Text>

        {/* Move to Cart Button */}
        <TouchableOpacity
          onPress={() => onMoveToCart(item.id)}
          className="w-full py-2.5 rounded-full bg-[#007AFF] items-center"
          style={{
            shadowColor: "#007AFF",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text className="text-xs font-bold tracking-wider text-white uppercase">
            Move to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── First Item Card with Remove Panel ──────────────────────────────────────

function FirstItemCard({
  item,
  onRemove,
  onMoveToCart,
}: {
  item: any;
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
}) {
  return (
    <View className="mx-6 mb-4">
      <View
        className="flex-row overflow-hidden bg-white rounded-2xl"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        {/* Left Side - Product Info */}
        <View className="flex-1 p-4">
          {/* Brand */}
          <Text className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
            {item.product.brand || "AETHER LAB"}
          </Text>

          {/* Product Name */}
          <Text className="text-base font-bold text-[#1a1a1a] mb-3">
            {item.product.name}
          </Text>

          {/* Price */}
          <Text className="text-xl font-bold text-[#007AFF] mb-4">
            ${item.product.price}
          </Text>

          {/* Move to Cart Button */}
          <TouchableOpacity
            onPress={() => onMoveToCart(item.id)}
            className="flex-row items-center justify-center py-3 rounded-full bg-[#007AFF]"
            style={{
              shadowColor: "#007AFF",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <MaterialIcons name="shopping-bag" size={16} color="#fff" />
            <Text className="ml-2 text-xs font-bold tracking-wider text-white uppercase">
              Move to Cart
            </Text>
          </TouchableOpacity>
        </View>

        {/* Right Side - Remove Panel */}
        <View className="w-24 bg-[#FFE5E5] items-center justify-center">
          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            className="items-center"
          >
            <MaterialIcons name="delete-outline" size={28} color="#FF4444" />
            <Text className="text-[10px] font-bold text-[#FF4444] uppercase tracking-wider mt-1">
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── Main Wishlist Screen ────────────────────────────────────────────────────

const WishListScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Grab userId from Redux
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Fetch wishlist using RTK Query
  const { data, isLoading, error, refetch } = useGetWishListQuery(userId);

  const handleRemoveItem = async (itemId: string) => {
    try {
      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item from your wishlist?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: async () => {
              // Call your remove mutation here
              // await removeFromWishlist({ userId, itemId });
              refetch(); // Refresh the list
            },
          },
        ]
      );
    } catch (err) {
      console.error("Error removing item:", err);
      Alert.alert("Error", "Failed to remove item");
    }
  };

  const handleMoveToCart = async (itemId: string) => {
    try {
      // Call your add to cart mutation here
      // await addToCart({ userId, productId: itemId });

      Alert.alert("Success", "Item moved to cart!", [
        { text: "Continue Shopping", style: "cancel" },
        { text: "View Cart" },
      ]);
    } catch (err) {
      console.error("Error moving to cart:", err);
      Alert.alert("Error", "Failed to add item to cart");
    }
  };

  const wishlistItems = data?.items || [];

  return (
    <View className="flex-1 bg-[#F8F9FA]">
      {/* Header */}
      <View
        className="px-6 pb-4 bg-white"
        style={{ paddingTop: insets.top + 12 }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/home")}
              className="items-center justify-center w-10 h-10"
            >
              <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
            </TouchableOpacity>
            <View>
              <Text className="text-xl font-bold text-[#1a1a1a]">Wishlist</Text>
              <Text className="text-xs tracking-wider text-gray-400 uppercase">
                {wishlistItems.length} ITEMS SAVED
              </Text>
            </View>
          </View>

          <View className="w-12 h-12 rounded-full bg-[#E5F2FF] items-center justify-center">
            <MaterialIcons name="favorite" size={24} color="#007AFF" />
          </View>
        </View>
      </View>

      {/* Loading State */}
      {isLoading && (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#007AFF" />
          <Text className="mt-4 text-gray-500">Loading your wishlist...</Text>
        </View>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <View className="items-center justify-center flex-1 px-6">
          <MaterialIcons name="error-outline" size={64} color="#EF4444" />
          <Text className="mt-4 text-lg font-bold text-gray-900">
            Error loading wishlist
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            className="px-6 py-3 rounded-full bg-[#007AFF] mt-4"
          >
            <Text className="font-bold text-white">Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Empty State */}
      {!isLoading && !error && wishlistItems.length === 0 && (
        <View className="items-center justify-center flex-1 px-6">
          <View className="items-center justify-center w-24 h-24 mb-6 bg-gray-100 rounded-full">
            <MaterialIcons name="favorite-border" size={48} color="#9CA3AF" />
          </View>
          <Text className="mb-2 text-xl font-bold text-gray-900">
            Your wishlist is empty
          </Text>
          <Text className="mb-6 text-center text-gray-500">
            Start adding items you love to keep track of them
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/home")}
            className="px-6 py-3 rounded-full bg-[#007AFF]"
            style={{
              shadowColor: "#007AFF",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text className="font-bold text-white">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Wishlist Items */}
      {!isLoading && !error && wishlistItems.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}
        >
          {/* First Item with Remove Panel */}
          {wishlistItems[0] && (
            <FirstItemCard
              item={wishlistItems[0]}
              onRemove={handleRemoveItem}
              onMoveToCart={handleMoveToCart}
            />
          )}

          {/* Rest of Items in Grid */}
          {wishlistItems.length > 1 && (
            <View
              className="px-6"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {wishlistItems.slice(1).map((item: any) => (
                <WishlistCard
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onMoveToCart={handleMoveToCart}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default WishListScreen;
