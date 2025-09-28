import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
,
   
    phome: {
        type: String,
        required: true
        }
}, {
    timestamps: true, 
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
          ret.id = ret._id.toString();
          delete ret._id;
          delete ret.__v;
          return ret;
        },
      }
})


// userSchema.virtual("profile", {
//     ref: "UserProfile", // The related model
//     localField: "_id",  // The User's ID field
//     foreignField: "user", // The User field in UserProfile
//     justOne: true, // Because it's a one-to-one relationship
// });

// userSchema.pre( "save", async (next: any) => {
//     let user = this as UserDocument;

//     if(!user.isModified("password")){
//         return next()
//     }

//     const salt = await bcrypt.genSalt()

// })
export const User = mongoose.model("User", userSchema)