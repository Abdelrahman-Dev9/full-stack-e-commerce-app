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

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2; // 2 columns with padding

// ─── Product Card Component ─────────────────────────────────────────────────

function ProductCard({ product }: { product: any }) {
  const [isFavorite, setIsFavorite] = useState(false);

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
          source={{ uri: product.image }}
          className="w-full bg-gray-100"
          style={{ height: CARD_WIDTH * 1.2 }}
          resizeMode="cover"
        />

        {/* Badge - if product has badge property */}
        {product.badge && (
          <View
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: product.badge === "NEW" ? "#1a1a1a" : "#3B82F6",
            }}
          >
            <Text className="text-[9px] font-black text-white uppercase tracking-wider">
              {product.badge === "SALE" && product.discount
                ? `-${product.discount}%`
                : product.badge}
            </Text>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className="absolute items-center justify-center rounded-full top-3 right-3 w-9 h-9 bg-white/90"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 2,
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
      <View className="p-3.5">
        <Text
          className="text-base font-bold text-[#1a1a1a] mb-0.5"
          numberOfLines={1}
        >
          {product.name}
        </Text>
        <Text className="text-xs text-gray-500 mb-2.5" numberOfLines={1}>
          {product.description}
        </Text>

        <View className="flex-row items-center justify-between">
          <View>
            {product.originalPrice && (
              <Text className="text-xs text-gray-400 line-through mb-0.5">
                ${product.originalPrice}
              </Text>
            )}
            <Text className="text-lg font-bold text-[#3B82F6]">
              ${product.price}
            </Text>
          </View>

          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-[#3B82F6] items-center justify-center"
            style={{
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <MaterialIcons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── Category Chip Component ────────────────────────────────────────────────

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
    <TouchableOpacity onPress={onPress} className="items-center mr-5">
      <View
        className="items-center justify-center mb-2 rounded-full w-14 h-14"
        style={{
          backgroundColor: isActive ? "#3B82F6" : "#F3F4F6",
          shadowColor: isActive ? "#3B82F6" : "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isActive ? 0.3 : 0.05,
          shadowRadius: isActive ? 8 : 4,
          elevation: isActive ? 4 : 1,
        }}
      >
        <Image
          source={{ uri: category.icon }}
          className="w-7 h-7"
          resizeMode="contain"
          style={{ tintColor: isActive ? "#fff" : "#6B7280" }}
        />
      </View>
      <Text
        className="text-[10px] font-semibold"
        style={{ color: isActive ? "#3B82F6" : "#6B7280" }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Main Screen ────────────────────────────────────────────────────────────

const CategoryProductsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [sortBy, setSortBy] = useState<
    "relevance" | "price-low" | "price-high"
  >("relevance");

  // API Hooks
  const [getProductsByCategory, { data, isLoading, error }] =
    useGetProductsByCategoryMutation();

  const { data: categories } = useGetCategoriesQuery();

  // Fetch when id changes
  useEffect(() => {
    if (id) {
      getProductsByCategory({ id });
    }
  }, [id]);

  // Extract products safely
  const products = useMemo(() => {
    return data?.products?.[0]?.products ?? [];
  }, [data]);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-12 pb-4">
        <View>
          <Text className="text-xs tracking-widest text-gray-500 uppercase">
            Welcome back
          </Text>
          <Text className="text-2xl font-bold text-gray-900">Alexander</Text>
        </View>

        <ImageBackground
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGHwjvpWUaqTusRRVMxcCddA3ZM6YottUmkxhEkKGOU6s6hXkzPlrnfLjq5VMJR_j3fcuWmmtBBwG92it1-fDTz26N17iDU0Bwtt7VV47P7pZ6qefXR17ZCAsAV8Pl2SqTsQ8yoff-JTgnJG6xyCCHAyMEgOb_SWU4hO9jHdu90Jea1_-bvbWtvZhIP07984GavOvZu78Nu2dZY3nBnWquAGoEeEb0tA3T3iZ8JUJFtZEBJPzL0lPJ9BCiqZF7JBax0Tin_saHpGIU",
          }}
          className="w-12 h-12 overflow-hidden rounded-full"
        />
      </View>

      {/* Search */}
      <View className="px-6 py-4">
        <View className="flex-row items-center px-4 bg-gray-100 rounded-xl h-14">
          <MaterialIcons name="search" size={22} color="#9ca3af" />
          <TextInput
            placeholder="Search luxury collections"
            className="flex-1 ml-3 text-base"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        className="mt-3"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pb-3">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/home")}
            className="items-center justify-center w-10 h-10 bg-gray-100 rounded-full"
          >
            <MaterialIcons name="arrow-back" size={20} color="#1a1a1a" />
          </TouchableOpacity>

          <View className="items-center flex-1">
            <Text className="text-sm text-gray-500">
              Found{" "}
              <Text className="font-bold text-[#1a1a1a]">
                {products.length}
              </Text>{" "}
              results
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              /* Open sort/filter modal */
            }}
            className="flex-row items-center gap-1"
          >
            <Text className="text-sm font-semibold text-[#3B82F6]">
              Sort by:{" "}
              <Text className="capitalize">{sortBy.replace("-", " ")}</Text>
            </Text>
            <MaterialIcons name="unfold-more" size={18} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Categories Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5"
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 8 }}
        >
          {categories?.map((category) => (
            <CategoryChip
              key={category.id}
              category={category}
              isActive={id === category.id}
              onPress={() => {
                router.replace(`/home/${category.id}`);
              }}
            />
          ))}
        </ScrollView>

        {/* Products Header */}
        <View className="px-6 mb-4">
          <Text className="text-xl font-bold text-[#1a1a1a]">Products</Text>
        </View>

        {/* Loading State */}
        {isLoading && (
          <View className="items-center mt-20">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="mt-4 text-gray-500">Loading products...</Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View className="items-center px-6 mt-20">
            <MaterialIcons name="error-outline" size={64} color="#EF4444" />
            <Text className="mt-4 text-lg font-bold text-gray-900">
              Error loading products
            </Text>
            <Text className="mt-2 text-center text-gray-500">
              Please try again later
            </Text>
          </View>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <View
            className="px-6"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <View className="items-center px-6 mt-20">
            <MaterialIcons name="search-off" size={64} color="#D1D5DB" />
            <Text className="mt-4 text-lg font-bold text-gray-900">
              No products found
            </Text>
            <Text className="mt-2 text-center text-gray-500">
              Try adjusting your filters or search for something else
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryProductsScreen;
