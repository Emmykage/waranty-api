import { StatusCodes } from "http-status-codes"
import { ApiError } from "../utils/ApiError.js"
import { Product } from "../model/product.js"
import { User } from "../model/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginUser = async(req, res, next)=> {
    const {email, password} = req.body
    try {
        if(!email, !password) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required")

        }
        const user = await User.findOne({email})
        const user_v = await bcrypt.compare(password, user.password)

        if(user && user_v ){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id

            }
        }, 

        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"})
        res.status(200).json({accessToken: accessToken, user_v, data: user, message:"user login"})

        }else{

            throw new ApiError(StatusCodes.BAD_GATEWAY, "Invalid Password")
        }

    } catch (error) {
        next(error)
        
    }
}

export const registerUser = async(req, res, next) => {
    try {
        const {email, password, username} = req.body

        if(!email || !password || !username){
            throw new ApiError(StatusCodes.BAD_REQUEST, "All field should be presetn")

        }
        const userExist = await User.findOne({email})



        if(userExist){
            throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, "user already exists") 
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        console.log(hashedPassword)
        const user = await User.create({
            email, 
            password: hashedPassword, 
            username
        })


        if(user){
        res.status(StatusCodes.CREATED).json({data: {id: user.id, email: user.email, username:  user.username}, message: "user created"})

        }else{
            throw new ApiError(StatusCodes.FORBIDDEN, "Request was not valid")
        }

    

    } catch (error) {
        // res.json({mssage: error.message})
        next(error)

        
    }
}
export const currentUser = async(req, res, next) => {
    const id  = req.user.id

    console.log(id, "[ID]: Id fetched")
    try {
        if(!id) {
            throw new ApiError(StatusCodes.NOT_FOUND, "ID not found")
        }

        const user = await Product.findById(req.params.id)

        if(!user){
            throw new ApiError(StatusCodes.NOT_FOUND, "Item not found")

        }


        res.status(StatusCodes.OK).json({data: user, message: "Product created"})

    } catch (error) {
        next(error)

    }

}
export const updateProducts = async (req, res, next) => {
      try {
        const id = req.params.id
        if(!id) {
            throw new ApiError(StatusCodes.NOT_FOUND, "ID not found")
        }
        const user = User.findById()

          if(!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
        }

        const updateUser = await User.findByIdAndUpdate(
            id, 
            req.body,
            {new: true}
        )

      

    
        res.json({data: updateUser, message: "Product created"})

    } catch (error) {
        // res.json({mssage: error.message})
        next(error)

        
    }
}
export const delUser = async(req, res, next) => {
     try {
        const id = req.params.id
        if(!id) {
            throw new ApiError(StatusCodes.NOT_FOUND, "ID not found")
        }
        // const product = await Product.findById()
        // console.log(product)

        //   if(!product) {
        //     throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
        // }



        await User.findByIdAndDelete(id)

        await User.deleteOne({_id: id})
      

    
        res.json({ message: "USer deleted"})

    } catch (error) {
        // res.json({mssage: error.message})
        next(error)

        
    }
}
