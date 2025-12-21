import dotenv from "dotenv";
dotenv.config();

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import productsRouter from "./routes/productsRouter.js"
import authRouter from "./routes/authRouter.js";
import cartRouter from "./routes/cartRouter.js"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://188.225.42.6"],
    credentials: true,
}))
app.options("*", cors({
    origin: ["http://localhost:5173", "http://188.225.42.6"],
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING
)
    .then(() => console.log("mongodb connected!"))
    .catch((err) => console.log(err))

app.use('/api/products', productsRouter)
app.use('/api/auth', authRouter)
app.use('/api/cart', cartRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT)
})