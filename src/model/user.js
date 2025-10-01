import pool from "../database/dbConnection.js"

const creatUserTable = async() => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

    )
    `
    try {
        pool.query(queryText)
        console.log("[USER TRABLE CREATED]")
    } catch (error) {
        console.log("[ERROR: Error creating user]")
        
    }
}

export default creatUserTable