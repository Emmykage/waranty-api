import pool from "../database/dbConnection.js"
import { ApiError } from "../utils/ApiError.js"
import { updateItem } from "./index.js"

class ProductService {

        static createProduct = async( {name, price, brand, type, warranty, startDate, serialNumber, image_url, status} )=> {

        try{

        const result = await pool.query("INSERT INTO products ( name, price, type, warranty, startDate, serialNumber, image_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [ name, price, type, warranty, startDate, serialNumber, image_url, status])
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
    const updatedProduct = await updateItem(id, "products", data);
    return updatedProduct
  } catch (error) {
    throw error
    
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