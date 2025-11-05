import {Product} from "../models/product.js";

async function createProduct(data) {
    const product = await Product.create(data)
    return product;
}

async function getProducts() {
    const products = await Product.find()
    return products
}

async function deleteProduct(id) {
    const deleted = await Product.deleteOne({_id: id})
    return deleted
}

async function updateProduct(id, data) {
    const updated = await Product.findByIdAndUpdate(id, data, {
        new: true,
    })
    return updated
}

export {createProduct, deleteProduct, updateProduct, getProducts}