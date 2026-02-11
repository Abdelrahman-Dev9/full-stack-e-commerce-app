import { z } from "zod";

export const addressSchema = z.object({
  phone: z.string().min(11),
  city: z.string().min(2),
  area: z.string().min(2),
  street: z.string().min(2),
  building: z.string().min(1),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  note: z.string().optional(),
});
