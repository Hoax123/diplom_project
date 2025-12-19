import {Cart} from "../models/cart.js";
import {Product} from "../models/product.js";

export async function getCart(req, res) {
    const cart = await Cart.findOne({userId: req.user.id}).populate("items.productId")
    return res.status(200).json({success: true, data: cart || {items: [] } })
}

export async function addToCart(req, res) {
    const {productId, quantity = 1} = req.body

    if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({success: false, error: "Количество должно быть целым положительным числом!"})
    }

    const existingProduct = await Product.findById(productId)
    if (!existingProduct) {
        return res.status(404).json({success: false, error: "Товар не найден"})
    }

    let cart = await Cart.findOne({userId: req.user.id})

    if (!cart) {
        await Cart.create({
            userId: req.user.id,
            items: [{productId, quantity}],
        })

        const freshCart = await Cart.findOne({userId: req.user.id}).populate("items.productId")

        return res.status(200).json({success: true, data: freshCart})
    }

    const existing = cart.items.find(item => item.productId.toString() === productId.toString())

    if (existing) {
        existing.quantity += quantity
    } else {
        cart.items.push({productId, quantity})
    }
    await cart.save()

    const freshCart = await Cart.findOne({userId: req.user.id}).populate("items.productId")

    return res.status(200).json({success: true, data: freshCart})
}

export async function removeFromCart(req, res) {
    const {productId} = req.params

    const existingProduct = await Product.findById(productId)
    if (!existingProduct) {
        return res.status(404).json({success: false, error: "Товар не найден"})
    }

    const cart = await Cart.findOne({userId: req.user.id})

    if (!cart) {
        return res.status(404).json({success: false, error: "Корзина не найдена"})
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId)
    await cart.save()

    const freshCart = await Cart.findOne({userId: req.user.id}).populate("items.productId")

    return res.status(200).json({success: true, data: freshCart})
}