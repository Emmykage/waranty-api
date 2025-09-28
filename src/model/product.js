//  id: 1,
//     name: 'Smartphone X1',
//     brand: 'TechBrand',
//     type: 'Electronics',
//     warranty: '12 months',
//     startDate: '2024-01-15',
//     serialNumber: 'SN123456789',
//     price: '$499',
//     image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500',
//     status: 'Active',


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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