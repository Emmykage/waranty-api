import { StatusCodes } from "http-status-codes"
import { ApiError } from "../utils/ApiError.js"
import ProductService from "../services/productService.js"

export const getProducts = async(req, res, next)=> {
    try {
            const products = await ProductService.getProducts()
            res.status(200).json({data: products, message:"Get all product"})

    } catch (error) {
        next(error)
        
    }
}

// @access private

export const createProduct = async(req, res, next) => {
    try {
        const {name, price, brand, type, warranty, startDate, serialNumber, image, status} = req.body
        if(!name){
            res.status(400)
            throw new ApiError(StatusCodes.BAD_REQUEST, "All field should be presetn")

        }

        const product = await ProductService.createProduct(req.body)
    
        res.json({data: product, message: "Product created"})

    } catch (error) {

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

        const product = await ProductService.getProduct(id)

        res.status(StatusCodes.OK).json({data: product, message: "Product created"})

    } catch (error) {
        next(error)

    }

}

// @access private

export const updateProduct = async (req, res, next) => {
      try {
        const id = req.params.id
        if(!id) {
            throw new ApiError(StatusCodes.NOT_FOUND, "ID not found")
        }
      
        const updateProduct = await ProductService.updateProduct(id, req.body)    
        res.json({data: updateProduct, message: "Product updated"})

    } catch (error) {
        next(error)

        
    }
}


// @access private

export const delProduct = async(req, res, next) => {
     try {
        const id = req.params.id
        if(!id) {
            throw new ApiError(StatusCodes.NOT_FOUND, "ID not found")
        }
        const deletedProduct = await ProductService.deleteProduct(id)
      

    
        res.json({data: deletedProduct,  message: "Product deleted"})

    } catch (error) {
        next(error)

        
    }
}
