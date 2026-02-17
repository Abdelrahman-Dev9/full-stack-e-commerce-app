import z from "zod";

export const addProductSchema = z.object({
  name: z.string().min(3),
  price: z
    .string()
    .regex(/^\$\d{1,3}(?:\.\d{3})*(?:[.,]\d+)?$/, "Invalid price format"),
  description: z.string().min(3),
  image: z.string().min(3),
  discount: z.string().min(1).optional(),
  categoryId: z.string().min(3),
});
