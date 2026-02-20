import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text } from "react-native";

// ─── Types ───────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  image: string;
}

export interface WishlistItem {
  id: string;
  product: Product;
}

export interface CardProps {
  item: WishlistItem;
  onRemove: (id: string) => void;
  onMoveToCart: (id: string) => void;
}

// ─── First Item Card ─────────────────────────────────────
export const FirstItemCard = ({ item, onRemove, onMoveToCart }: CardProps) => {
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
            {item.product.price}
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
};

export default FirstItemCard;
