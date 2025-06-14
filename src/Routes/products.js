import express from "express";
import productModel from "../models/product.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(201).json(products);
  } catch (error) {
    res
      .status(500)
      .console.error(error)
      .json({ message: "Could not find product" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const searchedProduct = await productModel.findById(id);
    res.status(201).json(searchedProduct);
  } catch (error) {
    res
      .status(500)
      .console.error(error)
      .json({ message: "could not find product or product does not exist" });
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const products = await productModel.find({});
//     const deletedProduct = await productModel.deleteOne(id);
//     res.status(201).json(products);
//   } catch (error) {
//     res
//       .status(500)
//       .console.error(error)
//       .json({ message: "could not find product or product does not exist" });
//   }
// });

export default router;
