import { Router } from "express";
import {
  addCategory,
  addProduct,
  getCategory,
} from "../controllers/product.controller";
import { validation } from "../middleware/validations";
import {
  addCategorySchema,
  getCategorySchema,
} from "../validations/category.validation";
import { addProductSchema } from "../validations/product.validation";

const productRouter = Router();

productRouter.post("/product", validation(addProductSchema), addProduct);
productRouter.post("/category", validation(addCategorySchema), addCategory);
productRouter.get("/category", validation(getCategorySchema), getCategory);

export default productRouter;
