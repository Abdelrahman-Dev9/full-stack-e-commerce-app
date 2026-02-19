import { useAddToCartMutation } from "@/src/services/cartApi";
import { RootState } from "@/src/store/store";
import React from "react";
import { Text, View, Button } from "react-native";
import { useSelector } from "react-redux";

const Cart = () => {
  const [addToCart, { isLoading, error }] = useAddToCartMutation();
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleAdd = async (productId: string) => {
    if (!userId) {
      console.log("User not logged in");
      return;
    }
    try {
      await addToCart({ userId, productId }).unwrap();
      console.log("Added to cart");
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Cart</Text>

      {/* Example button to add a product */}
      <Button
        title={isLoading ? "Adding..." : "Add Product 123"}
        onPress={() => handleAdd("123")}
      />
      {error && (
        <Text style={{ color: "red" }}>Error: {JSON.stringify(error)}</Text>
      )}
    </View>
  );
};

export default Cart;
