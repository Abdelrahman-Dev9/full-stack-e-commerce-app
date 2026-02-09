import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
