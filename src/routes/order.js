import express from "express";
import { deleteOrder, getAllOrders, getOrderById, orderStatus, searchOrdersByDate } from "../controllers/order.js";


const router = express.Router();


router.put("/order-status/:orderId", orderStatus)
router.get("/all", getAllOrders)
router.put("/:orderId", getOrderById)
router.put("/orderId", deleteOrder)
router.get("/search/term", searchOrdersByDate)

export default router;