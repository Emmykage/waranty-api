import dotenv from "dotenv"
import { Pool } from "pg";

dotenv.config()
console.log("[DB PASSWORDs]", process.env.DB_PASSWORD)

const pool = new Pool({
    // user: process.env.USER,
    // host: process.env.HOST,
    // database: process.env.DATABASE,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT
  connectionString: process.env.DATABASE_URL,
   ssl: {
    rejectUnauthorized: false, // required for Render
  },


})

pool.on("connect", ()=> {
    console.log("Conection pool established with db")
})


export default pool;