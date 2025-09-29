import express from "express"
import { createProducts, delProduct, getProduct, getProducts, updateProducts } from "../controller/productController.js"
import validateToken from "../middleware/validateTokenHandler.js"

const router = express.Router()

router.get("/", getProducts )
router.get("/:id", getProduct)

router.post("/", validateToken, createProducts)
router.patch("/:id", validateToken, updateProducts)
router.delete("/:id", validateToken, delProduct)

export default router