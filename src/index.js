import express from "express"
import dotenv from "dotenv"
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js"
import { ErrorHandler } from "./middleware/errorHandler.js"
import pool from "./database/dbConnection.js"
import cors from "cors"
import  "./services/initializer.js"
dotenv.config()
const app = express()

const port = process.env.PORT


// app.get("/", async (req, res) => {
//     const result = await pool.query("SELECT current_database()")
//     console.log(result)
//     res.send(`${result.rows[0].current_database}`)
// })
app.use(express.json())
app.use(cors())



app.use("/api/v1/products", productRouter)
app.use("/api/v1/users", userRouter)
app.use(ErrorHandler.handle)


    app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})


