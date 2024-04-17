import express from 'express';
import { Register, forgotPassword, resetPassword, login } from '../controllers/auth.js';
import { upload } from '../helpers/multer.js';
import { deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

// routes
router.post('/register', upload.single('image'), Register)
router.post('/login', login)
router.get('/users', getAllUsers)
router.get('/user/:userId', getOneUser)
router.put('/update/:userId',isLoggedIn, upload.single('image'), updateUser)
router.delete('/delete/:userId', deleteUser)



// forget password
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router