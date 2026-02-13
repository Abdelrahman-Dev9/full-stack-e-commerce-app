import z from "zod";

export const addProductSchema = z.object({
  name: z.string().min(3),
  price: z.string().min(1),
  description: z.string().min(3),
  image: z.string().min(3),
  discount: z.string().min(1).optional(),
  categoryId: z.string().min(3),
});
