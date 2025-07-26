import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;