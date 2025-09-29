import express from "express"
import { createProducts, delProduct, getProduct, getProducts, updateProducts } from "../controller/productController.js"
import { currentUser, delUser, loginUser, registerUser } from "../controller/userController.js"
import validateToken from "../middleware/validateTokenHandler.js"

const router = express.Router()

router.post("/login", loginUser)

router.get("/current_user", validateToken, currentUser)
router.post("/register", registerUser)
router.patch("/:id", updateProducts)
router.delete("/:id", delUser)


export default router