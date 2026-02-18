import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Search = () => {
  const [searchText, setSearchText] = useState("Nike Air");

  return (
    <View>
      {/* Header */}
      <View className="px-4 pb-4 border-b border-gray-100">
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
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <MaterialIcons name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Search;
