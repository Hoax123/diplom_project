import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Имя товара обязательно'],
    },
    category: {
        type: String,
        required: [true, 'Категория товара обязательна'],
    },
    price: {
        type: Number,
        required: [true, 'Цена товара обязательна'],
    },
    quantity: {
        type: Number,
        required: [true, 'Количество товара обязательно'],
    },
    image: {
        type: String,
        required: [true, 'Изображение для товара обязательно'],
    }
})

export const Product = mongoose.model("Product", productSchema);