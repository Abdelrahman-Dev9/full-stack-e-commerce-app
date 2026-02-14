import { Router } from "express";
import {
  addProductToCart,
  getCartProducts,
  removeProductFromCart,
} from "../controllers/cart.controller";
import { validation } from "../middleware/validations";
import { cartSchema, getCartSchema } from "../validations/cart.validation";

const cartRouter = Router();

cartRouter.get("/getCartProducts", validation(getCartSchema), getCartProducts);
cartRouter.post("/addProductToCart", validation(cartSchema), addProductToCart);
cartRouter.delete(
  "/removeProductFromCart",
  validation(cartSchema),
  removeProductFromCart
);

export default cartRouter;
