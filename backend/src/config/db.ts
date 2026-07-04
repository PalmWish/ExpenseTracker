import mongoose from "mongoose";

    const connectDB = async () => {
        try{
            await mongoose.connect(process.env.MONGO_URL!);

            console.log("Connected Successfully!");
        }
        catch (error){
            console.error("Mongo error:", error)
            process.exit(1)
        }
    } 

export default connectDB