import express from "express";
import Product from "../models/productmodel.js";
import User from "../models/userModel.js";
import data from "../json/data.js";

const seedRouter = express.Router();
seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers, createdProducts });
});

export default seedRouter;
