import express from 'express';
import { getCurrentUser, getContacts } from '../controllers/userController.js';

const router = express.Router();

router.get('/current-user', getCurrentUser);
router.get('/contacts', getContacts);

export default router;
