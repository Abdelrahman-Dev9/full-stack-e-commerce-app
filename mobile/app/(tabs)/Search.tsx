// import { View, Text, TextInput, TouchableOpacity } from "react-native";
// import React, { useState } from "react";
// import { MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";

// const Search = () => {
//   const [searchText, setSearchText] = useState("Nike Air");

//   return (
//     <View>
//       {/* Header */}
//       <View className="px-4 pb-4 mt-20 border-b border-gray-100">
//         <View className="flex-row items-center gap-3 mb-4">
//           <TouchableOpacity
//             onPress={() => router.back()}
//             className="items-center justify-center w-10 h-10"
//           >
//             <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
//           </TouchableOpacity>
//           <Text className="text-xl font-bold text-[#1a1a1a]">Search</Text>
//         </View>

//         {/* Search Input */}
//         <View className="flex-row items-center h-14 px-4 rounded-full border-2 border-[#007AFF] bg-white">
//           <MaterialIcons name="search" size={22} color="#007AFF" />
//           <TextInput
//             className="flex-1 ml-3 text-base text-[#1a1a1a]"
//             placeholder="Search products..."
//             placeholderTextColor="#9CA3AF"
//             value={searchText}
//             onChangeText={setSearchText}
//           />
//           {searchText.length > 0 && (
//             <TouchableOpacity onPress={() => setSearchText("")}>
//               <MaterialIcons name="close" size={20} color="#9CA3AF" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Search;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

// ─── Mock Data ───────────────────────────────────────────────────────────────

const RECENT_SEARCHES = [
  "Nike Air Force 1",
  "Adidas Ultraboost",
  "Running Shoes",
  "Sneakers",
];

const TRENDING_SEARCHES = [
  { id: "1", text: "Winter Jacket", count: "2.5k searches" },
  { id: "2", text: "Smart Watch", count: "1.8k searches" },
  { id: "3", text: "Wireless Earbuds", count: "1.2k searches" },
  { id: "4", text: "Backpack", count: "950 searches" },
];

const POPULAR_CATEGORIES = [
  { id: "1", name: "Shoes", icon: "👟", color: "#FFE5E5" },
  { id: "2", name: "Clothing", icon: "👕", color: "#E5F2FF" },
  { id: "3", name: "Watches", icon: "⌚", color: "#FFF4E5" },
  { id: "4", name: "Bags", icon: "👜", color: "#F0E5FF" },
  { id: "5", name: "Electronics", icon: "📱", color: "#E5FFE9" },
  { id: "6", name: "Sports", icon: "⚽", color: "#FFE5F5" },
];

const SEARCH_SUGGESTIONS = [
  { id: "1", text: "Nike Air Max", type: "product" },
  { id: "2", text: "Nike Air Jordan", type: "product" },
  { id: "3", text: "Nike Air Force", type: "product" },
  { id: "4", text: "Air Max 90", type: "trending" },
];

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Nike Air Force 1",
    price: 120,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    brand: "Nike",
  },
  {
    id: "2",
    name: "Nike Air Max 90",
    price: 150,
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400",
    brand: "Nike",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function SearchResultCard({ product }: { product: any }) {
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
      <Image
        source={{ uri: product.image }}
        className="w-full bg-gray-50"
        style={{ height: CARD_WIDTH * 1.2 }}
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="mb-1 text-xs tracking-wider text-gray-400 uppercase">
          {product.brand}
        </Text>
        <Text
          className="text-sm font-bold text-[#1a1a1a] mb-1"
          numberOfLines={1}
        >
          {product.name}
        </Text>
        <Text className="text-lg font-bold text-[#007AFF]">
          ${product.price}
        </Text>
      </View>
    </View>
  );
}

function CategoryChip({
  category,
  onPress,
}: {
  category: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center mr-3"
      style={{ width: 80 }}
    >
      <View
        className="items-center justify-center w-16 h-16 mb-2 rounded-2xl"
        style={{
          backgroundColor: category.color,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text className="text-3xl">{category.icon}</Text>
      </View>
      <Text
        className="text-xs font-semibold text-center text-gray-700"
        numberOfLines={1}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Main Search Screen ──────────────────────────────────────────────────────

const Search = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] =
    useState<string[]>(RECENT_SEARCHES);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Simulate search
  useEffect(() => {
    if (searchText.length > 0) {
      setShowSuggestions(true);
      setIsSearching(true);

      // Simulate API delay
      const timeout = setTimeout(() => {
        setSearchResults(MOCK_PRODUCTS);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      setShowSuggestions(false);
      setSearchResults([]);
    }
  }, [searchText]);

  const handleSearch = (query: string) => {
    setSearchText(query);
    setShowSuggestions(false);

    // Add to recent searches
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleClearRecent = (searchTerm: string) => {
    setRecentSearches(recentSearches.filter((item) => item !== searchTerm));
  };

  const handleClearAllRecent = () => {
    setRecentSearches([]);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View
        className="px-4 pb-4 border-b border-gray-100"
        style={{ paddingTop: insets.top + 12 }}
      >
        <View className="flex-row items-center gap-3 mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center justify-center w-10 h-10"
          >
            <MaterialIcons name="arrow-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-[#1a1a1a]">Search</Text>
        </View>

        {/* Search Input */}
        <View className="flex-row items-center h-14 px-4 rounded-full border-2 border-[#007AFF] bg-white">
          <MaterialIcons name="search" size={22} color="#007AFF" />
          <TextInput
            className="flex-1 ml-3 text-base text-[#1a1a1a]"
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={() => handleSearch(searchText)}
            autoFocus={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <MaterialIcons name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search Suggestions (when typing) */}
        {showSuggestions && searchText.length > 0 && (
          <View className="px-6 py-4">
            {SEARCH_SUGGESTIONS.filter((s) =>
              s.text.toLowerCase().includes(searchText.toLowerCase())
            ).map((suggestion) => (
              <TouchableOpacity
                key={suggestion.id}
                onPress={() => handleSearch(suggestion.text)}
                className="flex-row items-center py-3 border-b border-gray-100"
              >
                <MaterialIcons
                  name={
                    suggestion.type === "trending" ? "trending-up" : "search"
                  }
                  size={20}
                  color="#9CA3AF"
                />
                <Text className="flex-1 text-base text-[#1a1a1a] ml-3">
                  {suggestion.text}
                </Text>
                <MaterialIcons name="north-west" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Search Results */}
        {!showSuggestions && searchText.length > 0 && (
          <View className="px-6 py-4">
            <Text className="text-lg font-bold text-[#1a1a1a] mb-4">
              {searchResults.length} Results for {searchText}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {searchResults.map((product) => (
                <SearchResultCard key={product.id} product={product} />
              ))}
            </View>
          </View>
        )}

        {/* Default View (no search) */}
        {!searchText && (
          <View>
            {/* Popular Categories */}
            <View className="py-6">
              <Text className="text-lg font-bold text-[#1a1a1a] px-6 mb-4">
                Popular Categories
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24 }}
              >
                {POPULAR_CATEGORIES.map((category) => (
                  <CategoryChip
                    key={category.id}
                    category={category}
                    onPress={() => handleSearch(category.name)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View className="px-6 py-4">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-lg font-bold text-[#1a1a1a]">
                    Recent Searches
                  </Text>
                  <TouchableOpacity onPress={handleClearAllRecent}>
                    <Text className="text-sm font-semibold text-[#007AFF]">
                      Clear All
                    </Text>
                  </TouchableOpacity>
                </View>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSearch(search)}
                    className="flex-row items-center justify-between py-3 border-b border-gray-100"
                  >
                    <View className="flex-row items-center flex-1">
                      <MaterialIcons name="history" size={20} color="#9CA3AF" />
                      <Text className="text-base text-[#1a1a1a] ml-3">
                        {search}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleClearRecent(search)}
                      className="p-2 ml-2"
                    >
                      <MaterialIcons name="close" size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Trending Searches */}
            <View className="px-6 py-4">
              <Text className="text-lg font-bold text-[#1a1a1a] mb-4">
                Trending Searches
              </Text>
              {TRENDING_SEARCHES.map((trending) => (
                <TouchableOpacity
                  key={trending.id}
                  onPress={() => handleSearch(trending.text)}
                  className="flex-row items-center justify-between py-3 border-b border-gray-100"
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-8 h-8 rounded-full bg-[#FFE5E5] items-center justify-center">
                      <MaterialIcons
                        name="trending-up"
                        size={18}
                        color="#FF4444"
                      />
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="text-base font-semibold text-[#1a1a1a]">
                        {trending.text}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {trending.count}
                      </Text>
                    </View>
                  </View>
                  <MaterialIcons name="north-east" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Empty Results */}
        {!showSuggestions &&
          searchText.length > 0 &&
          searchResults.length === 0 &&
          !isSearching && (
            <View className="items-center justify-center px-6 py-20">
              <View className="items-center justify-center w-20 h-20 mb-4 bg-gray-100 rounded-full">
                <MaterialIcons name="search-off" size={40} color="#9CA3AF" />
              </View>
              <Text className="mb-2 text-xl font-bold text-gray-900">
                No results found
              </Text>
              <Text className="text-center text-gray-500">
                Try searching with different keywords
              </Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
};

export default Search;
