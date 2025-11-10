import dotenv from "dotenv";
dotenv.config();

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import productsRouter from "./routes/productsRouter.js"
import authRouter from "./routes/authRouter.js";
import cartRouter from "./routes/cartRouter.js"

const app = express()
const port = 5003

app.use(cors({origin: "*"}))
app.use(express.json())

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING
)
    .then(() => console.log("mongodb connected!"))
    .catch((err) => console.log(err))

app.use('/api/products', productsRouter)
app.use('/api/auth', authRouter)
app.use('/api/cart', cartRouter)

app.listen(port, () => {
    console.log("Server is running on port " + port)
})