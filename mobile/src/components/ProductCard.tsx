import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

// ─────────────────────────────────────────────
// Product Card Component
// ─────────────────────────────────────────────
export const ProductCard = ({
  product,
  onAddToWishlist,
  onAddToCart,
}: {
  product: any;
  onAddToWishlist: (id: string) => void;
  onAddToCart: (id: string) => void;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  // Favorite (Wishlist) handler
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onAddToWishlist(product.id);
  };

  // Add to Cart handler
  const handleCartPress = async () => {
    if (addedToCart) return; // prevent multiple taps
    setLoadingCart(true);
    try {
      await onAddToCart(product.id);
      setAddedToCart(true);
    } catch (err) {
      console.log("Cart Error:", err);
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <View
      style={{
        width: CARD_WIDTH,
        marginBottom: 16,
        borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Image & Favorite */}
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: product.image }}
          style={{
            width: "100%",
            height: CARD_WIDTH * 1.2,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={handleFavorite}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "rgba(255,255,255,0.9)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={18}
            color={isFavorite ? "#EF4444" : "#9CA3AF"}
          />
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={{ padding: 14 }}>
        <Text
          numberOfLines={1}
          style={{ fontWeight: "bold", fontSize: 16, marginBottom: 2 }}
        >
          {product.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}
        >
          {product.description}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#3B82F6",
            marginBottom: 8,
          }}
        >
          {product.price}
        </Text>

        {/* Add to Cart Button */}
        <TouchableOpacity
          onPress={handleCartPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            borderRadius: 12,
            backgroundColor: addedToCart ? "#10B981" : "#007AFF", // green if added
          }}
          disabled={loadingCart || addedToCart}
        >
          <MaterialIcons
            name={addedToCart ? "check" : "shopping-bag"}
            size={16}
            color="#fff"
          />
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              marginLeft: 8,
              fontSize: 12,
            }}
          >
            {loadingCart ? "Adding..." : addedToCart ? "Added" : "Move to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ProductCard;
