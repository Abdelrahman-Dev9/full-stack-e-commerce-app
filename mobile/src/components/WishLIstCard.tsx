import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, View, TouchableOpacity, Text, Image } from "react-native";
import { CardProps } from "./ItemCard";

// ─── Screen Constants ─────────────────────────────────────
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

// ─── Wishlist Card ───────────────────────────────────────
export const WishlistCard = ({ item, onRemove, onMoveToCart }: CardProps) => {
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
          onPress={() => onRemove(item.product.id)}
          className="absolute items-center justify-center w-10 h-10 bg-blue-100 rounded-full top-3 right-3"
        >
          <MaterialIcons name="favorite" size={20} color="red" />
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
          {item.product.price}
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
};

export default WishlistCard;
