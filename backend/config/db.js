import mongoose from "mongoose";

export const connectDB = async () => {
    // Set the strictQuery option before connecting to MongoDB
    mongoose.set('strictQuery', true);

    try {
        // Attempt to connect to MongoDB
        await mongoose.connect("mongodb+srv://sumitkamble1252:jdBVCo4PoX925K3u@fatomato.bs9r3l2.mongodb.net/?retryWrites=true&w=majority&appName=FATomato");
        console.log("DB Connected");
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
};
