import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/auth.routes";
import productRouter from "./routes/product.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", router);
app.use("/api", productRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
