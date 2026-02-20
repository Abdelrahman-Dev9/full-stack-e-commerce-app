import { Image, Text, TouchableOpacity, View } from "react-native";

// ─────────────────────────────────────────────
// Category Chip Component
// ─────────────────────────────────────────────
export const CategoryChip = ({
  category,
  isActive,
  onPress,
}: {
  category: any;
  isActive: boolean;
  onPress: () => void;
}) => {
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
};
export default CategoryChip;
