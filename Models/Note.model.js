import mongoose from "mongoose";

const noteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required:true
    },

    title:{
        type:String,
        required:true,
        maxlength:100
    },

    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const NoteModel=mongoose.model("Note",noteSchema)
export default NoteModel