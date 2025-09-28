import { StatusCodes } from "http-status-codes"
import { ApiError } from "../utils/ApiError.js"
import { Product } from "../model/product.js"

export const getProducts = async(req, res)=> {
    try {
            const products = await Product.find()
            res.status(200).json({data: products, message:"Get all product"})

    } catch (error) {
        next(error)
        
    }
}

export const createProducts = async(req, res, next) => {
    try {
        const {name, price, brand, type, warranty, startDate, serialNumber, image, status} = req.body
        console.log("request body is ", name)

        if(!name){
            res.status(400)
            throw new ApiError(StatusCodes.BAD_REQUEST, "All field should be presetn")

        }

        const product = await Product.create({
            name, price, brand, type, warranty, startDate, serialNumber, image, status
        })

    
        res.json({data: product, message: "Product created"})

    } catch (error) {
        // res.json({mssage: error.message})
        next(error)

        
    }
}
export const getProduct = async(req, res, next) => {
    const id  = req.params.id

    console.log(id, "[ID]: Id fetched")
    try {
        if(!id) {
            throw new ApiError(StatusCodes.NOT_FOUND, "ID not found")
        }

        const product = await Product.findById(req.params.id)

        if(!product){
            throw new ApiError(StatusCodes.NOT_FOUND, "Item not found")

        }
        console.log(product)
        res.status(StatusCodes.OK).json({data: product, message: "Product created"})

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
        const product = Product.findById()

          if(!product) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
        }

        const updateProduct = await Product.findByIdAndUpdate(
            id, 
            req.body,
            {new: true}
        )

      

    
        res.json({data: updateProduct, message: "Product created"})

    } catch (error) {
        // res.json({mssage: error.message})
        next(error)

        
    }
}
export const delProduct = async(req, res, next) => {
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



        await Product.findByIdAndDelete(id)
      

    
        res.json({ message: "Product deleted"})

    } catch (error) {
        // res.json({mssage: error.message})
        next(error)

        
    }
}
