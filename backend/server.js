import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

mongoose
  .connect("mongodb://localhost/ecommerce")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);

app.use("/api/products", productRouter);

app.use("/api/users", userRouter);

app.use("/api/orders", orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/ecommerce/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/ecommerce/build/index.html"))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = "0.0.0.0";
app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
