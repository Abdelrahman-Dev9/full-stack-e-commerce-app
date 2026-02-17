import { Router } from "express";
import {
  addCategory,
  addProduct,
  getCategories,
  getCategory,
} from "../controllers/product.controller";
import { validation } from "../middleware/validations";
import {
  addCategorySchema,
  getCategorySchema,
} from "../validations/category.validation";
import { addProductSchema } from "../validations/product.validation";

const productRouter = Router();

productRouter.post("/addProduct", validation(addProductSchema), addProduct);
productRouter.post("/addCategory", validation(addCategorySchema), addCategory);
productRouter.get("/getCategory", validation(getCategorySchema), getCategory);
productRouter.get("/getCategories", getCategories);

export default productRouter;
