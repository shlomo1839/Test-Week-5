import express from 'express';
import { registerUser, getMyProfile } from '../controllers/users.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerUser);

// GET /api/users/me
router.get('/me', getMyProfile);

export default router;