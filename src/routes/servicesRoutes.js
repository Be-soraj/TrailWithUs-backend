import express from 'express';
import { 
  createServices,
  getServices,
  getServicesById,
  updateServices,
  deleteServices
} from '../controllers/servicesController.js';

const router = express.Router();

router.post('/', createServices);
router.get('/', getServices);
router.get('/:id', getServicesById);
router.put('/:id', updateServices);
router.delete('/:id', deleteServices);

export default router;