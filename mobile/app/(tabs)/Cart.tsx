// import { useGetCartMutation } from "@/src/services/cartApi";
// import { RootState } from "@/src/store/store";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Dimensions,
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useSelector } from "react-redux";

// const { width: SCREEN_WIDTH } = Dimensions.get("window");

// // ─── Cart Item Component ─────────────────────────────────────────────────────

// function CartItem({
//   item,
//   onUpdateQuantity,
//   onRemove,
// }: {
//   item: any;
//   onUpdateQuantity: (id: string, quantity: number) => void;
//   onRemove: (id: string) => void;
// }) {
//   const [quantity, setQuantity] = React.useState(item.quantity || 1);

//   const handleIncrement = () => {
//     const newQty = quantity + 1;
//     setQuantity(newQty);
//     onUpdateQuantity(item.id, newQty);
//   };

//   const handleDecrement = () => {
//     if (quantity > 1) {
//       const newQty = quantity - 1;
//       setQuantity(newQty);
//       onUpdateQuantity(item.id, newQty);
//     }
//   };

//   return (
//     <View
//       className="flex-row items-center p-4 mb-4 bg-white rounded-3xl"
//       style={{
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.06,
//         shadowRadius: 8,
//         elevation: 2,
//       }}
//     >
//       {/* Product Image */}
//       <View
//         className="w-24 h-24 mr-4 overflow-hidden rounded-2xl bg-gray-50"
//         style={{
//           shadowColor: "#000",
//           shadowOffset: { width: 0, height: 1 },
//           shadowOpacity: 0.05,
//           shadowRadius: 4,
//           elevation: 1,
//         }}
//       >
//         <Image
//           source={{ uri: item.product.image }}
//           className="w-full h-full"
//           resizeMode="cover"
//         />
//       </View>

//       {/* Product Info */}
//       <View className="flex-1">
//         <View className="flex-row items-start justify-between mb-1">
//           <Text
//             className="text-base font-bold text-[#1a1a1a] flex-1 mr-2"
//             numberOfLines={1}
//           >
//             {item.product.name}
//           </Text>
//           <TouchableOpacity onPress={() => onRemove(item.id)}>
//             <MaterialIcons name="close" size={20} color="#9CA3AF" />
//           </TouchableOpacity>
//         </View>

//         <Text className="mb-3 text-sm text-gray-500" numberOfLines={1}>
//           {item.product.variant || item.product.description}
//         </Text>

//         <View className="flex-row items-center justify-between">
//           {/* Price */}
//           <Text className="text-xl font-bold text-[#007AFF]">
//             ${(item.product.price * quantity).toFixed(2)}
//           </Text>

//           {/* Quantity Controls */}
//           <View className="flex-row items-center gap-3">
//             <TouchableOpacity
//               onPress={handleDecrement}
//               className="items-center justify-center bg-gray-100 rounded-full w-9 h-9"
//             >
//               <MaterialIcons name="remove" size={18} color="#1a1a1a" />
//             </TouchableOpacity>

//             <Text className="text-base font-bold text-[#1a1a1a] min-w-[20px] text-center">
//               {quantity}
//             </Text>

//             <TouchableOpacity
//               onPress={handleIncrement}
//               className="w-9 h-9 rounded-full bg-[#007AFF] items-center justify-center"
//               style={{
//                 shadowColor: "#007AFF",
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 4,
//                 elevation: 3,
//               }}
//             >
//               <MaterialIcons name="add" size={18} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// // ─── Main Cart Screen ────────────────────────────────────────────────────────

// const Cart = () => {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();

//   const userId = useSelector((state: RootState) => state.auth.userId);
//   const [getCart, { data, isLoading }] = useGetCartMutation();
//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch cart on mount
//   useEffect(() => {
//     if (userId) {
//       handleGetCart();
//     }
//   }, [userId]);

// const handleGetCart = async () => {
//   if (!userId) return;

//   setRefreshing(true);

//   try {
//     await getCart({ userId }).unwrap();
//   } catch (err) {
//     console.error("Error fetching cart:", err);
//   } finally {
//     setRefreshing(false); // ✅ VERY IMPORTANT
//   }
// };

//   const handleUpdateQuantity = async (itemId: string, quantity: number) => {
//     try {
//       // Call your update quantity mutation here
//       // await updateCartItemQuantity({ userId, itemId, quantity });
//       console.log("Update quantity:", itemId, quantity);
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//     }
//   };

//   const handleRemoveItem = async (itemId: string) => {
//     try {
//       // Call your remove item mutation here
//       // await removeFromCart({ userId, itemId });
//       handleGetCart(); // Refresh cart
//     } catch (err) {
//       console.error("Error removing item:", err);
//     }
//   };

//   const handleClearAll = async () => {
//     try {
//       // Call your clear cart mutation here
//       // await clearCart({ userId });
//       handleGetCart(); // Refresh cart
//     } catch (err) {
//       console.error("Error clearing cart:", err);
//     }
//   };

//   const cartItems = data?.items || [];

//   // Calculate totals
//   const subtotal = cartItems.reduce((sum: number, item: any) => {
//     return sum + item.product.price * (item.quantity || 1);
//   }, 0);

//   const shipping = subtotal > 0 ? (subtotal >= 500 ? 0 : 25) : 0;
//   const grandTotal = subtotal + shipping;

//   return (

//     <View className="flex-1 bg-[#F8F9FA]">
//       {/* Header */}
//       <View
//         className="px-6 pb-4 bg-white"
//         style={{ paddingTop: insets.top + 12 }}
//       >
//         <View className="flex-row items-center justify-between">
//           <View className="flex-row items-center gap-3">
//             <TouchableOpacity
//               onPress={() => router.back()}
//               className="items-center justify-center w-12 h-12 bg-gray-100 rounded-full"
//             >
//               <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
//             </TouchableOpacity>
//             <Text className="text-2xl font-bold text-[#1a1a1a]">Your Cart</Text>
//           </View>

//           {cartItems.length > 0 && (
//             <TouchableOpacity onPress={handleClearAll}>
//               <Text className="text-base font-semibold text-[#007AFF]">
//                 Clear All
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>

//       {/* Loading State */}
//       {isLoading && (
//         <View className="items-center justify-center flex-1">
//           <ActivityIndicator size="large" color="#007AFF" />
//           <Text className="mt-4 text-gray-500">Loading your cart...</Text>
//         </View>
//       )}

//       {/* Empty Cart */}
//       {!isLoading && cartItems.length === 0 && (
//         <View className="items-center justify-center flex-1 px-6">
//           <View className="items-center justify-center w-24 h-24 mb-6 bg-gray-100 rounded-full">
//             <MaterialIcons name="shopping-cart" size={48} color="#9CA3AF" />
//           </View>
//           <Text className="mb-2 text-xl font-bold text-gray-900">
//             Your cart is empty
//           </Text>
//           <Text className="mb-6 text-center text-gray-500">
//             Add items to get started
//           </Text>
//           <TouchableOpacity
//             onPress={() => router.push("/home")}
//             className="px-6 py-3 rounded-full bg-[#007AFF]"
//             style={{
//               shadowColor: "#007AFF",
//               shadowOffset: { width: 0, height: 4 },
//               shadowOpacity: 0.3,
//               shadowRadius: 8,
//               elevation: 4,
//             }}
//           >
//             <Text className="font-bold text-white">Start Shopping</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Cart Items */}
//       {!isLoading && cartItems.length > 0 && (
//         <ScrollView
//           className="flex-1"
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 24 }}
//         >
// {/* Free Shipping Banner */}
// <View className="mx-6 mt-4 mb-6">
//   <View
//     className="bg-[#E5F2FF] rounded-2xl p-4 flex-row items-center"
//     style={{
//       shadowColor: "#007AFF",
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.08,
//       shadowRadius: 8,
//       elevation: 2,
//     }}
//   >
//     <View className="items-center justify-center w-12 h-12 mr-3 bg-white rounded-full">
//       <MaterialIcons
//         name="local-shipping"
//         size={24}
//         color="#007AFF"
//       />
//     </View>
//     <View className="flex-1">
//       <Text className="text-base font-bold text-[#007AFF] mb-0.5">
//         Free Express Shipping
//       </Text>
//       <Text className="text-sm text-[#007AFF]/70">
//         Your order qualifies for premium delivery
//       </Text>
//     </View>
//   </View>
// </View>

//           {/* Cart Items List */}
//           <View className="px-6">
//             {cartItems.map((item: any) => (
//               <CartItem
//                 key={item.id}
//                 item={item}
//                 onUpdateQuantity={handleUpdateQuantity}
//                 onRemove={handleRemoveItem}
//               />
//             ))}
//           </View>

//           {/* Order Summary */}
//           <View className="mx-6 mt-4">
//             <View className="flex-row items-center justify-between mb-3">
//               <Text className="text-base text-gray-500">Subtotal</Text>
//               <Text className="text-lg font-bold text-[#1a1a1a]">
//                 ${subtotal.toFixed(2)}
//               </Text>
//             </View>

//             <View className="flex-row items-center justify-between mb-6">
//               <Text className="text-base text-gray-500">Shipping</Text>
//               <Text
//                 className="text-lg font-bold"
//                 style={{ color: shipping === 0 ? "#10B981" : "#1a1a1a" }}
//               >
//                 {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
//               </Text>
//             </View>

//             <View className="flex-row items-center justify-between py-4 border-t border-gray-200">
//               <Text className="text-xl font-bold text-[#1a1a1a]">
//                 Grand Total
//               </Text>
//               <Text className="text-2xl font-bold text-[#1a1a1a]">
//                 ${grandTotal.toFixed(2)}
//               </Text>
//             </View>
//             {/* Checkout Button */}
//             {!isLoading && cartItems.length > 0 && (
//               <View className="px-2 pb-1">
//                 <TouchableOpacity
//                   // onPress={() => router.push('/checkout')}
//                   className="flex-row items-center justify-center w-full p-4 rounded-full"
//                   style={{
//                     backgroundColor: "#007AFF",
//                     shadowColor: "#007AFF",
//                     shadowOffset: { width: 0, height: 2 },
//                     shadowOpacity: 0.3,
//                     shadowRadius: 12,
//                     elevation: 6,
//                   }}
//                 >
//                   <Text className="mr-2 text-lg font-bold text-white">
//                     Proceed to Checkout
//                   </Text>
//                   <MaterialIcons name="arrow-forward" size={20} color="#fff" />
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// export default Cart;

import { useGetCartMutation } from "@/src/services/cartApi";
import { RootState } from "@/src/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── Cart Item Component ─────────────────────────────────────

function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: any;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const [quantity, setQuantity] = React.useState(item.quantity || 1);

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
            ${(item.product.price * quantity).toFixed(2)}
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
}

// ─── Main Cart Screen ────────────────────────────────────────

const Cart = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const userId = useSelector((state: RootState) => state.auth.userId);

  const [getCart, { data, isLoading }] = useGetCartMutation();

  const [refreshing, setRefreshing] = useState(false);

  const cartItems = data?.items || [];

  // ─── Fetch on mount ─────────────────

  useEffect(() => {
    if (userId) {
      handleGetCart();
    }
  }, [userId]);

  const handleGetCart = async () => {
    if (!userId) return;

    setRefreshing(true);

    try {
      await getCart({ userId }).unwrap();
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setRefreshing(false); // ✅ important
    }
  };

  // ─── Actions ─────────────────

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    console.log("Update quantity:", itemId, quantity);

    // after update → refresh cart
    handleGetCart();
  };

  const handleRemoveItem = async (itemId: string) => {
    console.log("Remove item:", itemId);

    // after remove → refresh cart
    handleGetCart();
  };

  const handleClearAll = async () => {
    console.log("Clear all");

    handleGetCart();
  };

  // ─── Totals ─────────────────

  const subtotal = cartItems.reduce((sum: number, item: any) => {
    return sum + item.product.price * (item.quantity || 1);
  }, 0);

  const shipping = subtotal > 0 ? (subtotal >= 500 ? 0 : 25) : 0;
  const grandTotal = subtotal + shipping;

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

      {/* Loading */}
      {isLoading && !refreshing && (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#007AFF" />
          <Text className="mt-4 text-gray-500">Loading your cart...</Text>
        </View>
      )}

      {/* Empty */}
      {!isLoading && cartItems.length === 0 && (
        <View className="items-center justify-center flex-1 px-6">
          <MaterialIcons name="shopping-cart" size={60} color="#9CA3AF" />
          <Text className="mt-4 text-xl font-bold">Your cart is empty</Text>
        </View>
      )}

      {/* Items */}
      {!isLoading && cartItems.length > 0 && (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
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
          <View className="mx-6 mt-4">
            <View className="flex-row justify-between mb-2">
              <Text>Subtotal</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mb-4">
              <Text>Shipping</Text>
              <Text>{shipping === 0 ? "FREE" : `$${shipping}`}</Text>
            </View>

            <View className="flex-row justify-between py-4 border-t">
              <Text className="text-xl font-bold">Total</Text>
              <Text className="text-xl font-bold">
                ${grandTotal.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity className="p-4 bg-[#007AFF] rounded-full items-center">
              <Text className="text-lg font-bold text-white">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Cart;
