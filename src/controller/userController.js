import { StatusCodes } from "http-status-codes"
import { ApiError } from "../utils/ApiError.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserService from "../services/userServices.js"

export const loginUser = async(req, res, next)=> {
    const {email, password} = req.body
    try {
        if(!email, !password) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required")

        }
        const user = await UserService.loginUser(email)
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
        {expiresIn: "1d"})
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

        console.log("[creating user]: User creation initialized")
        const {email, password, username} = req.body

        if(!email || !password || !username){
            throw new ApiError(StatusCodes.BAD_REQUEST, "All field should be preset")

        }



        const user = await UserService.registerUser({email, password, username})
        if(user){
        res.status(StatusCodes.CREATED).json({data: {id: user.id, email: user.email, username:  user.username}, message: "user created"})

        }else{
            throw new ApiError(StatusCodes.FORBIDDEN, "Request was not valid")
        }   

    } catch (error) {
        next(error)

        
    }
}

export const getUsers = async(req, res, next) => {

    console.log(id, "[FETCH USERS]: users is being retrieved")
    try {
       

        const users = await UserService.getUsers()
        if(!users){
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found")

        }
        res.status(StatusCodes.OK).json({data: users, message: "users fetched"})

    } catch (error) {
        next(error)

    }

}
export const currentUser = async(req, res, next) => {
    const id  = req.user.id

    console.log(id, "[FETCHED ID]: current user is being retrieved")
    try {
        if(!id) {
            throw new ApiError(StatusCodes.NOT_FOUND, "ID not found")
        }


        const user = await UserService.currentUser(id)
         

        if(!user){
            throw new ApiError(StatusCodes.NOT_FOUND, "user not found")

        }

        res.status(StatusCodes.OK).json({data: user, message: "user fetched"})

    } catch (error) {
        next(error)

    }

}
export const updateUser = async (req, res, next) => {
      try {
        const id = req.params.id ?? req.user.id
        if(!id) {
            throw new ApiError(StatusCodes.NOT_FOUND, "ID not found")
        }
        
        const updatedUser =  await UserService.updateUser(id, req.body)

    
        res.json({data: updatedUser, message: "Product created"})

    } catch (error) {
        // res.json({mssage: error.message})
        next(error)

        
    }
}

export const updateCurrentUser = async (req, res, next) => {
      try {
        const id =  req.user.id
        if(!id) {
            throw new ApiError(StatusCodes.NOT_FOUND, "ID not found")
        }
        
        const updatedUser =  await UserService.updateUser(id, req.params.body)

    
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

        await UserService.deleteUser(id)    
        res.json({ message: "USer deleted"})

    } catch (error) {
        // res.json({mssage: error.message})
        next(error)

        
    }
}
