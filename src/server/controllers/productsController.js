import {Product} from "../models/product.js";
import {validateProduct} from "../utils/validator.js";
import mongoose from "mongoose";

async function createProduct(data) {
    const validationErrors = validateProduct(data);
    if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '))
    }

    const product = await Product.create(data)
    return product;
}

async function getProducts() {
    const products = await Product.find()
    return products
}

async function deleteProduct(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("неверный Id товара")
    }

    const deleted = await Product.deleteOne({_id: id})
    return deleted
}

async function updateProduct(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("неверный Id товара")
    }

    const validationErrors = validateProduct(data);
    if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '))
    }

    const updated = await Product.findByIdAndUpdate(id, data, {
        new: true,
    })
    return updated
}

export {createProduct, deleteProduct, updateProduct, getProducts}