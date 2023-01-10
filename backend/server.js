import express from "express";
import data from "./data.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config(); //fetch variables in the dotenv file

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.m);
  });

const app = express();

app.use("/api/seed", seedRouter);

app.use("/api/products", productRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
