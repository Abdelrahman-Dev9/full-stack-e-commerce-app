import { Router } from "express";
import {
  addCategory,
  addProduct,
  getCategories,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/product", addProduct);
productRouter.post("/category", addCategory);
productRouter.get("/category", getCategories);

export default productRouter;
