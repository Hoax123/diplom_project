import {Cart} from "../models/cart.js";
import mongoose from "mongoose";

export async function getCart(req, res) {
    const cart = await Cart.findOne({userId: req.user.id}).populate("items.productId")
    return res.json({success: true, data: cart || {items: [] } })
}

export async function addToCart(req, res) {
    const {productId, quantity = 1} = req.body
    let cart = await Cart.findOne({userId: req.user.id})

    if (!cart) {
        cart = await Cart.create({
            userId: req.user.id,
            items: [{productId, quantity}],
        })

        return res.json({success: true, data: cart})
    }

    const existing = cart.items.find(item => item.productId.toString() === productId)

    if (existing) {
        existing.quantity += quantity
    } else {
        cart.items.push({productId, quantity})
    }
    await cart.save()

    return res.json({success: true, data: cart})
}

export async function removeFromCart(req, res) {
    const {productId} = req.params
    const cart = await Cart.findOne({userId: req.user.id})

    if (!cart) {
        return res.json({success: false, error: "Cart not found"})
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId)
    await cart.save()

    return res.json({success: true, data: cart})
}