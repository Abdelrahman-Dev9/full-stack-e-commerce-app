import { Router } from "express";
import {
  addToWishlist,
  deleteFromWishlist,
  getWishList,
} from "../controllers/wishList.controller";
import { validation } from "../middleware/validations";
import {
  getWishListSchema,
  wishListSchema,
} from "../validations/wishList.validation";

const wishListRouter = Router();

wishListRouter.get("/getWishList", validation(getWishListSchema), getWishList);
wishListRouter.post(
  "/addToWishlist",
  validation(wishListSchema),
  addToWishlist
);
wishListRouter.delete(
  "/deleteFromWishlist",
  validation(wishListSchema),
  deleteFromWishlist
);

export default wishListRouter;
