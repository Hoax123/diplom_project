import express from 'express'
const router = express.Router()
import {createProduct, getProducts, deleteProduct, updateProduct} from "../controllers/productsController.js";
import {auth} from "../middlewares/auth.js";
import {requireRole} from "../middlewares/role.js";

router.get('/', async (req, res) => {
    try {
        const products = await getProducts()
        res.status(200).json({success: true, data: products})
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
})

router.post('/',
    auth,
    requireRole(['admin']),
    async (req, res) => {
    try {
        const createdProduct = await createProduct(req.body)
        res.status(201).json({success: true, data: createdProduct})
    } catch (error) {
        res.status(400).json({success: false, error: error.message})
    }
})

router.delete('/:id',
    auth,
    requireRole(['admin']),
    async (req, res) => {
    try {
        const deletedProduct = await deleteProduct(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({success: false, error: 'Данный товар не найден'})
        }

        res.status(200).json({success: true, data: deletedProduct})
    } catch (error) {
        res.status(400).json({success: false, error: error.message})
    }
})

router.put('/:id',
    auth,
    requireRole(['admin']),
    async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({success: false, error: 'Данный товар не найден'})
        }

        res.status(200).json({success: true, data: updatedProduct})
    } catch (error) {
        res.status(400).json({success: false, error: error.message})
    }
})

export default router;