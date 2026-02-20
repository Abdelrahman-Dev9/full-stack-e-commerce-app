import CategoryChip from "@/src/components/CategoryChip";
import ProductCard from "@/src/components/ProductCard";
import { useAddToCartMutation } from "@/src/services/cartApi";
import { useGetCategoriesQuery } from "@/src/services/categoriesApi";
import { useGetProductsByCategoryMutation } from "@/src/services/productsApi";
import { useAddToWishListMutation } from "@/src/services/wishlistApi";
import { RootState } from "@/src/store/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

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
