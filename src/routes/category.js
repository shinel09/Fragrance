import express from 'express';
import { createCategory, deleteCategory, getOneCategory, updateCategory, getAllCategory } from '../controllers/category.js';
import { isLoggedIn } from '../middlewares/auth.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();


router.post("/create", isLoggedIn, isAdmin, createCategory)
router.get("/categories", getAllCategory)
router.get("/category/:categoryId", getOneCategory)
router.delete("/delete/:categoryId", isLoggedIn, isAdmin, deleteCategory)
router.put("/update/:categoryId", isLoggedIn, isAdmin, updateCategory)



export default  router;