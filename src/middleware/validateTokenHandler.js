import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { StatusCodes } from "http-status-codes"


const validateToken = async(req, res, next) => {
    try {
        let token
        let authHeader = req.headers.Authorization || req.headers.authorization
        
        if(authHeader  && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1]
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded )=> {
                if(err){
                    console.log("[Token]:", err.message)

                    throw new ApiError(StatusCodes.UNAUTHORIZED, err.message)
                }

                req.user = decoded.user
                next()


                console.log(decoded)
            })

            if(!token){
                throw new ApiError(StatusCodes.UNAUTHORIZED, "Token is not present")
            }

        }else{
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token")
        }
    } catch (error) {
        next(error)
        
    }

}

export default validateToken