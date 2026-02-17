import z from "zod";

export const getCategorySchema = z.object({
  id: z.string().min(3, "Invalid id"),
});

export const addCategorySchema = z.object({
  name: z.string().min(3),
  icon: z.string().url().min(3),
  gradientFrom: z.string().min(3),
  gradientTo: z.string().min(3),
  image: z.string().min(3),
});

// export const updateCategorySchema = z.object({
//   name: z.string().min(3).optional(),
//   icon: z.string().min(3).optional(),
//   gradientFrom: z.string().min(3).optional(),
//   gradientTo: z.string().min(3).optional(),
//   image: z.string().min(3).optional(),
// });

// export const deleteCategorySchema = z.object({
//   id: z.string().min(3),
// });
