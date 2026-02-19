import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
  RefreshControl,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootState } from "@/src/store/store";
import { useGetWishListQuery } from "@/src/services/wishlistApi";

// ─── Types ───────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  image: string;
}

interface WishlistItem {
  id: string;
  product: Product;
}

interface CardProps {
  item: WishlistItem;
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
}

// ─── Screen Constants ─────────────────────────────────────
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

// ─── Wishlist Card ───────────────────────────────────────
function WishlistCard({ item, onRemove, onMoveToCart }: CardProps) {
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
      <View className="relative">
        <Image
          source={{ uri: item.product.image }}
          className="w-full bg-gray-50"
          style={{ height: CARD_WIDTH * 1.2 }}
          resizeMode="cover"
        />

        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          className="absolute items-center justify-center w-10 h-10 bg-white rounded-full top-3 right-3"
        >
          <MaterialIcons name="favorite" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View className="p-3.5">
        <Text className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
          {item.product.brand || "BRAND"}
        </Text>

        <Text
          className="text-sm font-bold text-[#1a1a1a] mb-2"
          numberOfLines={2}
        >
          {item.product.name}
        </Text>

        <Text className="text-lg font-bold text-[#007AFF] mb-3">
          ${item.product.price}
        </Text>

        <TouchableOpacity
          onPress={() => onMoveToCart(item.id)}
          className="w-full py-2.5 rounded-full bg-[#007AFF] items-center"
        >
          <Text className="text-xs font-bold tracking-wider text-white uppercase">
            Move to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── First Item Card ─────────────────────────────────────
function FirstItemCard({ item, onRemove, onMoveToCart }: CardProps) {
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
        <View className="flex-1 p-4">
          <Text className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
            {item.product.brand || "BRAND"}
          </Text>

          <Text className="text-base font-bold text-[#1a1a1a] mb-3">
            {item.product.name}
          </Text>

          <Text className="text-xl font-bold text-[#007AFF] mb-4">
            ${item.product.price}
          </Text>

          <TouchableOpacity
            onPress={() => onMoveToCart(item.id)}
            className="flex-row items-center justify-center py-3 rounded-full bg-[#007AFF]"
          >
            <MaterialIcons name="shopping-bag" size={16} color="#fff" />
            <Text className="ml-2 text-xs font-bold tracking-wider text-white uppercase">
              Move to Cart
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-24 bg-[#FFE5E5] items-center justify-center">
          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            className="items-center"
          >
            <MaterialIcons name="delete-outline" size={28} color="#FF4444" />
            <Text className="text-[10px] font-bold text-[#FF4444] uppercase mt-1">
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── Main Wishlist Screen ─────────────────────────────────
const WishListScreen: React.FC = () => {
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

  const handleRemoveItem = (itemId: string) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => refetch() },
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
          {wishlistItems[0] && (
            <FirstItemCard
              item={wishlistItems[0]}
              onRemove={handleRemoveItem}
              onMoveToCart={handleMoveToCart}
            />
          )}

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
