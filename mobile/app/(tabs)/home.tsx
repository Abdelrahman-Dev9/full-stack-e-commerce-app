// import { View, Text, Image } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Home = () => {
//   return (
//     <SafeAreaView className="flex-1 bg-black">
//       {/* ── Header ── */}
//       <View className="flex-row items-center justify-between ">
//         <View>
//           <Text className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
//             Welcome back
//           </Text>
//           <Text className="text-2xl font-bold tracking-tight text-white">
//             Alexander
//           </Text>
//         </View>

//         {/* Avatar with glow */}
//         <View>
//           <View
//             className="absolute inset-0 rounded-full"
//             style={{
//               backgroundColor: "#0d7ff2",
//               opacity: 0.4,
//               borderRadius: 999,
//               transform: [{ scale: 1.15 }],
//             }}
//           />
//           <Image
//             source={{
//               uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGHwjvpWUaqTusRRVMxcCddA3ZM6YottUmkxhEkKGOU6s6hXkzPlrnfLjq5VMJR_j3fcuWmmtBBwG92it1-fDTz26N17iDU0Bwtt7VV47P7pZ6qefXR17ZCAsAV8Pl2SqTsQ8yoff-JTgnJG6xyCCHAyMEgOb_SWU4hO9jHdu90Jea1_-bvbWtvZhIP07984GavOvZu78Nu2dZY3nBnWquAGoEeEb0tA3T3iZ8JUJFtZEBJPzL0lPJ9BCiqZF7JBax0Tin_saHpGIU",
//             }}
//             className="w-12 h-12 rounded-full"
//             style={{ borderWidth: 2, borderColor: "#0d7ff2" }}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Home;

import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
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

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6"
        >
          {["New In", "Timepieces", "Apparel", "Jewelry", "Travel"].map(
            (item, index) => (
              <View key={index} className="items-center mr-4">
                <LinearGradient
                  colors={["#0d7ff2", "#2563eb"]}
                  className="items-center justify-center w-16 h-16 rounded-full"
                >
                  <MaterialIcons name="auto-awesome" size={24} color="white" />
                </LinearGradient>

                <Text className="text-[10px] mt-2 font-bold uppercase text-blue-500">
                  {item}
                </Text>
              </View>
            )
          )}
        </ScrollView>

        {/* Featured */}
        <View className="px-6 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold">Editor{"'"}s Spotlight</Text>
            <Text className="font-semibold text-blue-500">View Gallery</Text>
          </View>

          <ImageBackground
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8bNG35YiJjJF7Wf4V_2qBVaT869sbMmYbjFkjn-1blDXxUTsjTvJ77MXryE8KO7UB6vQrIqF7ucoN10GmBqoH_9ede4MurFzUuzYF36YVmRR5gS1Na8Oa5J0DGHiiE6wY6ULHSaKHWh0uoMDg7cRJZ5zYU52L_yQZhLXyePu3lUBNt3k6CShOFFn19mkgD3rwt0b9NdXynaEjJ2cRrP2hbjGfcMO5uPfHpzxIUni6S77m6An5cQ4S9J8pBrz0AT-nlVbLdcJd7jka",
            }}
            className="h-[380px] rounded-2xl overflow-hidden justify-end p-4"
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              className="p-6"
            >
              <Text className="mb-2 text-xs text-white">Limited Edition</Text>

              <Text className="text-2xl font-bold text-white">
                Oceanic Chrono X
              </Text>

              <Text className="mb-4 text-sm text-gray-300">
                Precision-engineered marine grade titanium.
              </Text>

              <View className="flex-row items-center justify-between">
                <Text className="text-xl font-bold text-blue-400">$12,450</Text>

                <TouchableOpacity className="items-center justify-center w-12 h-12 bg-white rounded-full">
                  <MaterialIcons name="shopping-bag" size={22} />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Promotion */}
        <View className="px-6 mt-10">
          <View className="flex-row items-center h-32 bg-blue-600 rounded-2xl">
            <View className="p-4">
              <Text className="mb-1 text-xs text-white uppercase">
                Summer Series
              </Text>

              <Text className="text-lg font-bold text-black">
                Private Access:
              </Text>

              <Text className="text-lg font-bold text-black">
                20% Curated Picks
              </Text>
            </View>

            <TouchableOpacity className="absolute right-0 px-10 py-2 m-2 mr-10 bg-white rounded-full">
              <Text className="text-lg font-bold text-center text-blue-600">
                Unlock
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recently Viewed */}
        <View className="px-6 mt-10">
          <Text className="mb-4 text-xl font-bold">Recently Viewed</Text>

          <View className="flex-row justify-between">
            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAEyQH5g_VOcNUPsSo5TkZaC8SevbWrVLZ5P02KkIuQjxOX98tUKwebXU7Ocfz4z62MKdv8bcKr1rYJknYVItfPFsdn6Vqw9kE3Rb8jC-7fhrNuu_lowfT-885sj4U8NxXVJOowQoL48YQMbdSJCJQ5fFrKQ_JIH30AKbotGDejNqwAl89OH0yCHT24r7HFiLOIztpFlgcYcsG92vPnIn8vwMj_hSQK9i_iIq5_ZC40_hro1QqVwdwfbNYJfUIHMQX8zoGIKpJvrmGH",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCkuGMIkdGx5wQUkMb_1Di41xp1ULaIHgZ3O9FDba7yBSMBjkuAAiO3Dee2LaQ-qDDZAGLSkNVXP7Fae5We1VNXa_MwofRCsYp0GLMK0NVHdDrijAQgW3o6BeX2KDZzkzGCgfRUazY2q-Wb6uTTZz4yt_kslQus8mIuEmRA_yQcOqrk40L9jBqiWx6TvsK8IkWYIg_KruAwh-uuqyf86cO0DwKoXH5DL_oXz8UzwOlYUZoKGEGGQEzS2c5OsQyG_A2ENMYD2haTa1Ze",
            ].map((img, i) => (
              <View key={i} className="w-[48%]">
                <ImageBackground
                  source={{ uri: img }}
                  className="h-48 overflow-hidden rounded-xl"
                />

                <Text className="mt-2 font-semibold">Item {i + 1}</Text>

                <Text className="font-bold text-blue-500">$450</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
