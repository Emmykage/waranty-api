import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
     user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    warranty: {
        type: String,
        required: true
    } ,
    startDate: {
        type: Date,
        required: true
    } 
    , 
    serialNumber: {
        type: String,
        required: true
    },  
    price: {
        type: Number,
        required: true
    }, 
    status: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})



export const Product = mongoose.model("Product", productSchema)