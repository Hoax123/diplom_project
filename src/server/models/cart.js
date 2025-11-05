import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cart: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true,
    }
})

export const Cart = mongoose.model("Cart", cartSchema);