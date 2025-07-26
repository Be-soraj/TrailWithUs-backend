import express from 'express';
import { createUser } from '../controllers/userController.js';

const router = express.Router();
router.post('/', createUser); // Simplified route handler
export default router;