import { Router } from 'express';
import { getData } from '../controllers/apiController.js';

const router = Router();

// GET API endpoint
router.get('/data', getData);

export default router;