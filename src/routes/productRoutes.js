import express from "express"
import { createProducts, delProducts, getProduct, getProducts, updateProducts } from "../controller/productController.js"

const router = express.Router()

router.get("/", getProducts )

router.get("/:id", getProduct)
router.post("/", createProducts)
router.patch("/:id", updateProducts)
router.delete("/:id", delProducts)


export default router