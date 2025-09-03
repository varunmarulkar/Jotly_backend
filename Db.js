import mongoose from "mongoose";

function Dbconnect(){
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected")
    } catch (error) {
        console.log("Database not connected")
    }
}

export default Dbconnect