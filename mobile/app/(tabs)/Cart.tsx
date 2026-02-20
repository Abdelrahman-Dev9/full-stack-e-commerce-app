import { useGetCartMutation } from "@/src/services/cartApi";
import { RootState } from "@/src/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

// ─── Cart Item ───────────────────────────────────────────────
const CartItem = React.memo(function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: any;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onUpdateQuantity(item.id, newQty);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onUpdateQuantity(item.id, newQty);
    }
  };

  return (
    <View
      className="flex-row items-center p-4 mb-4 bg-white rounded-3xl"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View className="w-24 h-24 mr-4 overflow-hidden rounded-2xl bg-gray-50">
        <Image
          source={{ uri: item.product.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1">
        <View className="flex-row items-start justify-between mb-1">
          <Text
            className="text-base font-bold text-[#1a1a1a] flex-1 mr-2"
            numberOfLines={1}
          >
            {item.product.name}
          </Text>

          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <MaterialIcons name="close" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <Text className="mb-3 text-sm text-gray-500" numberOfLines={1}>
          {item.product.description}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-[#007AFF]">
            {item.product.price}
          </Text>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={handleDecrement}
              className="items-center justify-center bg-gray-100 rounded-full w-9 h-9"
            >
              <MaterialIcons name="remove" size={18} color="#1a1a1a" />
            </TouchableOpacity>

            <Text className="text-base font-bold text-[#1a1a1a]">
              {quantity}
            </Text>

            <TouchableOpacity
              onPress={handleIncrement}
              className="w-9 h-9 rounded-full bg-[#007AFF] items-center justify-center"
            >
              <MaterialIcons name="add" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
});

// ─── Cart Screen ─────────────────────────────────────────────
const Cart = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [getCart, { isLoading }] = useGetCartMutation();
  const [refreshing, setRefreshing] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // ─── Fetch cart
  const handleGetCart = useCallback(async () => {
    if (!userId) return;
    setRefreshing(true);
    try {
      const res = await getCart({ userId }).unwrap();
      if (res?.items) setCartItems(res.items);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setRefreshing(false);
    }
  }, [userId, getCart]);

  useEffect(() => {
    handleGetCart();
  }, [handleGetCart]);

  // ─── Actions
  const handleUpdateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      console.log("Update quantity:", itemId, quantity);
      // TODO: call update quantity mutation
      handleGetCart();
    },
    [handleGetCart]
  );

  const handleRemoveItem = useCallback(
    async (itemId: string) => {
      console.log("Remove item:", itemId);
      // TODO: call remove item mutation
      handleGetCart();
    },
    [handleGetCart]
  );

  const handleClearAll = useCallback(async () => {
    console.log("Clear all");
    // TODO: call clear cart mutation
    handleGetCart();
  }, [handleGetCart]);

  const showInitialLoader = isLoading && cartItems.length === 0;

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
              onPress={() => router.back()}
              className="items-center justify-center w-12 h-12 bg-gray-100 rounded-full"
            >
              <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
            </TouchableOpacity>

            <Text className="text-2xl font-bold text-[#1a1a1a]">Your Cart</Text>
          </View>

          {cartItems.length > 0 && (
            <TouchableOpacity onPress={handleClearAll}>
              <Text className="text-base font-semibold text-[#007AFF]">
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Free Shipping Banner */}
      <View className="mx-6 mt-4 mb-1">
        <View
          className="bg-[#E5F2FF] rounded-2xl p-4 flex-row items-center"
          style={{
            shadowColor: "#007AFF",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <View className="items-center justify-center w-12 h-12 mr-3 bg-white rounded-full">
            <MaterialIcons name="local-shipping" size={24} color="#007AFF" />
          </View>

          <View className="flex-1">
            <Text className="text-base font-bold text-[#007AFF] mb-0.5">
              Free Express Shipping
            </Text>
            <Text className="text-sm text-[#007AFF]/70">
              Your order qualifies for premium delivery
            </Text>
          </View>
        </View>
      </View>

      {/* Loader */}
      {showInitialLoader && (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {/* Empty */}
      {!showInitialLoader && cartItems.length === 0 && (
        <View className="items-center justify-center flex-1 px-6">
          <MaterialIcons name="shopping-cart" size={60} color="#9CA3AF" />
          <Text className="mt-4 text-xl font-bold">Your cart is empty</Text>
        </View>
      )}

      {/* Cart Items */}
      {!showInitialLoader && cartItems.length > 0 && (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 24 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleGetCart}
              colors={["#007AFF"]}
              tintColor="#007AFF"
            />
          }
        >
          <View className="px-6 mt-6">
            {cartItems.map((item: any) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </View>

          {/* Summary */}
          {/* <View className="flex-row justify-between px-6 py-4 border-t">
            <Text className="text-xl font-bold">Total</Text>
            <Text className="text-xl font-bold">1223</Text>
          </View> */}

          <TouchableOpacity className="m-6 p-4 bg-[#007AFF] rounded-full items-center">
            <Text className="text-lg font-bold text-white">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default Cart;
