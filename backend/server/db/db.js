import mongoose from "mongoose";
mongoose.set('strictQuery', false)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to mongodb on port ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB;