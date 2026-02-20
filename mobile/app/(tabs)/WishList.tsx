import FirstItemCard, { WishlistItem } from "@/src/components/ItemCard";
import WishlistCard from "@/src/components/WishLIstCard";
import {
  useGetWishListQuery,
  useRemoveFromWishListMutation,
} from "@/src/services/wishlistApi";
import { RootState } from "@/src/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const WishListScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data, isLoading, error, refetch, isFetching } = useGetWishListQuery(
    userId,
    {
      skip: !userId, // 🔥 skip until userId exists
      refetchOnMountOrArgChange: true,
    }
  );

  const wishlistItems: WishlistItem[] = data?.items || [];

  const [removeProduct] = useRemoveFromWishListMutation();

  const handleRemoveItem = (productId: string) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            await removeProduct({
              userId: userId,
              productId: productId,
            }).unwrap();
            refetch(); // refresh the list after removal
          } catch (error) {
            console.log("Remove error ❌", error);
            Alert.alert("Error", "Failed to remove item.");
          }
        },
      },
    ]);
  };

  const handleMoveToCart = (itemId: string) => {
    Alert.alert("Success", "Item moved to cart!");
  };

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

      {/* Loading */}
      {isLoading && (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {/* Error */}
      {error && !isLoading && (
        <View className="items-center justify-center flex-1">
          <Text>Error loading wishlist</Text>
          <TouchableOpacity onPress={refetch}>
            <Text>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Wishlist Items with Pull-to-Refresh */}
      {!isLoading && !error && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching} // 🔥 automatic refresh spinner
              onRefresh={refetch} // 🔄 fetch latest items
              colors={["#007AFF"]}
              tintColor="#007AFF"
            />
          }
        >
          {/* Empty State */}
          {wishlistItems.length === 0 && (
            <View className="items-center mt-20">
              <Text>Your wishlist is empty</Text>
            </View>
          )}

          {/* First Item */}
          {/* {wishlistItems[0] && (
            <FirstItemCard
              item={wishlistItems[0]}
              onRemove={handleRemoveItem}
              onMoveToCart={handleMoveToCart}
            />
          )} */}

          {/* Remaining Items */}
          {wishlistItems.length > 1 && (
            <View
              className="px-6"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {wishlistItems.slice(1).map((item: WishlistItem) => (
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
