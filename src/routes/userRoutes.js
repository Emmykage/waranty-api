import express from "express"
import { currentUser, delUser, loginUser, registerUser, updateUser } from "../controller/userController.js"
import validateToken from "../middleware/validateTokenHandler.js"
import validateUser from "../middleware/imputValidator.js"

const router = express.Router()

router.post("/login", loginUser)

router.get("/current_user", validateToken, currentUser)
router.post("/register", validateUser, registerUser)
router.patch("/:id", updateUser)
router.delete("/:id", delUser)


export default router