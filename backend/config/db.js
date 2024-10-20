import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://greatstack:999999999@cluster0.epeuz.mongodb.net/food-del").then(()=>{console.log("DB Conected");
    }) 
}