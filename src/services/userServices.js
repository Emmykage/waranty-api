import { StatusCodes } from "http-status-codes"
import pool from "../database/dbConnection.js"
import { ApiError } from "../utils/ApiError.js"
import bcrypt from "bcryptjs"

class UserService {
    static loginUser = async(email)=> {
        try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])

        if(result.rows.length === 0){
            throw new ApiError(StatusCodes.NOT_FOUND, "user not found")
        }
        return result.rows[0]    
        } catch (error) {
            throw error
            
        }

    }

     static registerUser = async({email, username, password})=> {

        try{

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        const userExist =  result.rows[0]
        if(userExist){
            throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, "user already exists") 

        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const userResult = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword])

        const user = userResult.rows[0]
        return user

        }catch(error){
            throw error
        }

    }
    static getUsers = async () => {
        try {
       const result = await pool.query("SELECT * FROM users WHERE ")
        const users = result.rows
        return users
        } catch (error) {
            throw error
            
        }

    
    }

    static currentUser = async (id) => {
        try{
            
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])

        if(result.rows.length === 0){
            throw new ApiError(StatusCodes.NOT_FOUND, "user not found")
        }
        return result.rows[0]
        }catch(err){
            throw err
        }

    }

    static updateUser = async (id, data) => {
       const fields = [];
        const values = [];
        let index = 1;

        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = $${index}`);
            values.push(value);
            index++;
        }

        values.push(id);

        const query = `
            UPDATE users
            SET ${fields.join(", ")}
            WHERE id = $${index}
            RETURNING *;
        `;

        const result = await pool.query(query, values);
        return result.rows[0];

    }


       static deleteUser = async (id, data) => {
        try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", id)

          if(!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
        }

        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])
        const deletedeUser = result.rows[0]     
        return deletedeUser

        } catch (error) {
            throw error
            
        }

    }
}


export default UserService