import mongoose, { syncIndexes } from "mongoose"

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Succesfully connected to the database")
    } catch (error) {
        console.error("Errored occured while connecting to the database", error)
        process.exit(1); //Exit with failure

    }
}   