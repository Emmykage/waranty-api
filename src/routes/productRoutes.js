import express from "express"
import { createProducts, delProduct, getProduct, getProducts, updateProducts } from "../controller/productController.js"

const router = express.Router()

router.get("/", getProducts )

router.get("/:id", getProduct)
router.post("/", createProducts)
router.patch("/:id", updateProducts)
router.delete("/:id", delProduct)


export default router