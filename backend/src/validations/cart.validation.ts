import z from "zod";

export const cartSchema = z.object({
  userId: z.string().min(3),
  productId: z.string().min(3),
});

export const getCartSchema = z.object({
  userId: z.string().min(3),
});
