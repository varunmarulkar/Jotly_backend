import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },

    isVerified:{
        type:Boolean,
        default:false
    },
    
    verificationCodeExpiry: Date,

    verificationCode:String

},{timestamps:true})

const UserModel=mongoose.model("User",userSchema)

export default UserModel