import pool from "../database/dbConnection.js"
import { ApiError } from "../utils/ApiError.js"

class ProductService {

        static createProduct = async( {name, price, brand, type, warranty, startDate, serialNumber, image, status} )=> {

        try{

        const result = await pool.query("INSERT INTO users ( name, price, brand, type, warranty, startDate, serialNumber, image, status) VALUES ($1, $2, $3) RETURNING *", [ name, price, brand, type, warranty, startDate, serialNumber, image, status])
        return result.rows[0]
        

        }catch(error){
            throw error
        }

    }
    static getProduct = async(id)=> {

        try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id])
        
        if(result.rows.length === 0 ){
            throw new ApiError(StatusCodes.NOT_FOUND, "Item not found")

        }
        return result.rows[0]
        } catch (error) {
            throw error            
        }

    }

     static getProducts = async()=> {

        try{

        const result = await pool.query("SELECT * FROM products")
        return result.rows
        }catch(error){
            throw error
        }

    }



static updateProduct = async (id, data) => {
  try {
    const { name, brand, type, warranty, startDate, serialNumber, price, status, image } = data;

  const result = await pool.query(
  `UPDATE products SET name = $1, brand = $2, type = $3, warranty = $4, startDate = $5, serialNumber = $6, price = $7, status = $8, image = $9 WHERE id = $10 RETURNING *`,
  [name, brand, type, warranty, startDate, serialNumber, price, status, image, [id]]
);

    if (result.rows.length === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};



static deleteProduct = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

}


export default ProductService