import express from 'express';
import { createProduct, updateProduct, searchProduct, relatedProduct, processPayment, getAllProducts} from '../controllers/product.js';
import { upload } from '../helpers/multer.js';
import { isLoggedIn } from '../middlewares/auth.js'
import { orderStatus } from '../controllers/order.js';


const router = express.Router();

router.post('/create', upload.array('images', 5), createProduct);
router.get("/all", getAllProducts)
// router.get("/:productId", getProductById)
// router.get("/slug/:slug", getBySlug)
router.put("/update/:productId", upload.array('images', 5), updateProduct)
// router.delete("/:productId", updateProduct)
router.post("/search", searchProduct)
router.get("/related/:productId", relatedProduct)

// payment
router.post("/payment", isLoggedIn, processPayment)

// orders





export default router;