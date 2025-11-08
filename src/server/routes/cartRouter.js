import {auth} from "../middlewares/auth.js";
import {requireRole} from "../middlewares/role.js";
import {addToCart, removeFromCart, getCart} from "../controllers/cartController.js";
import express from "express";

const router = express.Router();

router.get('/', auth, requireRole(['user']), getCart);
router.post('/add', auth, requireRole(['user']), addToCart);
router.delete('/:productId', auth, requireRole(['user']), removeFromCart);

export default router;