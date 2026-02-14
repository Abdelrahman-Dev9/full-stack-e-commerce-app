import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/auth.routes";
import productRouter from "./routes/product.routes";
import wishListRouter from "./routes/wishList.routes";
import cartRouter from "./routes/cart.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", router);
app.use("/api", productRouter);
app.use("/api", wishListRouter);
app.use("/api", cartRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
