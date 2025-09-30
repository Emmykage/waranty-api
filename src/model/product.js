import pool from "../database/dbConnection.js"

const createProductTable = async() => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    serialNumber VARCHAR(100),
    price DECIMAL(10,2),
    type VARCHAR(100),
    startDate TIMESTAMP,
    status VARCHAR(100),
    warranty VARCHAR(100),
    note TEXT,    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

    )
    `
    try {
        pool.query(queryText)
        console.log("[PRODUCT TRABLE CREATED]")
    } catch (error) {
        console.log("[ERROR: Error creating product table]")
        
    }

}

export default createProductTable