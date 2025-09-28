import mongoose from "mongoose"

export const dbConnection = () =>{
    const dbUrl = process.env.MONGODB_URL

    mongoose.connect(dbUrl).then(()=>{
        console.log("connected to db")
    }).catch((err) =>{
        console.log("Error connecting to db")
    })

}