import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetCategoriesQuery } from "@/src/services/categoriesApi";
import { useGetProductsByCategoryMutation } from "@/src/services/productsApi";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAddToWishListMutation } from "@/src/services/wishlistApi";
import { useAddToCartMutation } from "@/src/services/cartApi";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

// ─────────────────────────────────────────────
// Product Card Component
// ─────────────────────────────────────────────
function ProductCard({
  product,
  onAddToWishlist,
  onAddToCart,
}: {
  product: any;
  onAddToWishlist: (id: string) => void;
  onAddToCart: (id: string) => void;
}) {
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
          ${product.price}
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
}

// ─────────────────────────────────────────────
// Category Chip Component
// ─────────────────────────────────────────────
function CategoryChip({
  category,
  isActive,
  onPress,
}: {
  category: any;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: "center", marginRight: 20 }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 6,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: isActive ? "#3B82F6" : "#F3F4F6",
        }}
      >
        <Image
          source={{ uri: category.icon }}
          style={{
            width: 28,
            height: 28,
            tintColor: isActive ? "#fff" : "#6B7280",
          }}
          resizeMode="contain"
        />
      </View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "600",
          color: isActive ? "#3B82F6" : "#6B7280",
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Main Screen
// ─────────────────────────────────────────────
const CategoryProductsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [sortBy, setSortBy] = useState<
    "relevance" | "price-low" | "price-high"
  >("relevance");

  // Mutations
  const [addToWishlist] = useAddToWishListMutation();
  const [addToCart] = useAddToCartMutation();

  const handleAddToWishlist = async (productId: string) => {
    if (!userId) return;
    try {
      await addToWishlist({ userId, productId }).unwrap();
    } catch (err) {
      console.log("Wishlist Error:", err);
    }
  };

  const handleAddToCart = async (productId: string) => {
    if (!userId) return;
    try {
      await addToCart({ userId, productId }).unwrap();
    } catch (err) {
      console.log("Cart Error:", err);
    }
  };

  // Products API
  const [getProductsByCategory, { data, isLoading, error }] =
    useGetProductsByCategoryMutation();
  const { data: categories } = useGetCategoriesQuery();

  useEffect(() => {
    if (id) getProductsByCategory({ id });
  }, [id, getProductsByCategory]);

  const products = useMemo(() => data?.products?.[0]?.products ?? [], [data]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 16,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 12,
              letterSpacing: 1,
              color: "#6B7280",
              textTransform: "uppercase",
            }}
          >
            Welcome back
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1a1a1a" }}>
            Alexander
          </Text>
        </View>
        <ImageBackground
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGHwjvpWUaqTusRRVMxcCddA3ZM6YottUmkxhEkKGOU6s6hXkzPlrnfLjq5VMJR_j3fcuWmmtBBwG92it1-fDTz26N17iDU0Bwtt7VV47P7pZ6qefXR17ZCAsAV8Pl2SqTsQ8yoff-JTgnJG6xyCCHAyMEgOb_SWU4hO9jHdu90Jea1_-bvbWtvZhIP07984GavOvZu78Nu2dZY3nBnWquAGoEeEb0tA3T3iZ8JUJFtZEBJPzL0lPJ9BCiqZF7JBax0Tin_saHpGIU",
          }}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F3F4F6",
            borderRadius: 16,
            paddingHorizontal: 12,
            height: 56,
          }}
        >
          <MaterialIcons name="search" size={22} color="#9CA3AF" />
          <TextInput
            placeholder="Search luxury collections"
            style={{ flex: 1, marginLeft: 12, fontSize: 16 }}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Top Row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            paddingBottom: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/home")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F3F4F6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="arrow-back" size={20} color="#1a1a1a" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 14, color: "#6B7280" }}>
              Found{" "}
              <Text style={{ fontWeight: "bold", color: "#1a1a1a" }}>
                {products.length}
              </Text>{" "}
              results
            </Text>
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#3B82F6" }}>
              Sort by:{" "}
              <Text style={{ textTransform: "capitalize" }}>
                {sortBy.replace("-", " ")}
              </Text>
            </Text>
            <MaterialIcons name="unfold-more" size={18} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20, paddingHorizontal: 24 }}
        >
          {categories?.map((category: any) => (
            <CategoryChip
              key={category.id}
              category={category}
              isActive={id === category.id}
              onPress={() => router.replace(`/home/${category.id}`)}
            />
          ))}
        </ScrollView>

        {/* Products Grid */}
        {!isLoading && !error && products.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 24,
            }}
          >
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
        )}

        {/* Loading */}
        {isLoading && (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={{ marginTop: 12, color: "#6B7280" }}>
              Loading products...
            </Text>
          </View>
        )}

        {/* Error */}
        {error && (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <MaterialIcons name="error-outline" size={64} color="#EF4444" />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
              Error loading products
            </Text>
          </View>
        )}

        {/* Empty */}
        {!isLoading && !error && products.length === 0 && (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <MaterialIcons name="search-off" size={64} color="#D1D5DB" />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
              No products found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryProductsScreen;
