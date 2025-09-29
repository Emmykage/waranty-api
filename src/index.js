import express from "express"
import dotenv from "dotenv"
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"
import { ErrorHandler } from "./middleware/errorHandler.js"
import { dbConnection } from "./database/dbConnection.js"
dotenv.config()
const app = express()

const port = process.env.PORT

app.use(express.json())


app.use("/api/v1/products", productRouter)
app.use("/api/v1/users", userRouter)
app.use(ErrorHandler.handle)

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})

dbConnection()

console.log("first", port)