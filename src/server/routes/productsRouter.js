import express from 'express'
const router = express.Router()
import {createProduct, getProducts, deleteProduct, updateProduct} from "../controllers/productsController.js";

router.get('/', async (req, res) => {
    try {
        const products = await getProducts()
        res.json({success: true, data: products})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
})

router.post('/', async (req, res) => {
    try {
        const createdProduct = await createProduct(req.body)
        res.json({success: true, data: createdProduct})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await deleteProduct(req.params.id);

        if (!deletedProduct) {
            return res.json({success: false, error: 'Product not found'})
        }

        res.json({success: true, data: deletedProduct})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);

        if (!updatedProduct) {
            return res.json({success: false, error: 'Product not found'})
        }

        res.json({success: true, data: updatedProduct})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
})

export default router;