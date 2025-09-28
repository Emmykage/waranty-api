import express from "express"
import dotenv from "dotenv"
import productRouter from "./routes/productRoutes.js"
dotenv.config()
const app = express()

const port = process.env.PORT


app.use("/api/v1/products", productRouter)

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})

console.log("first", port)