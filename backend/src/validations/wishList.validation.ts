import z from "zod";

export const wishListSchema = z.object({
  userId: z.string().min(3),
  productId: z.string().min(3),
});
export const getWishListSchema = z.object({
  userId: z.string().min(3),
});
