import express from 'express';
import { encryptMessage, decryptMessage } from '../controllers/messages.js';


const router = express.Router();

// POST /api/messages/encrypt
router.post('/encrypt', encryptMessage);

// POST /api/messages/decrypt
router.post('/decrypt', decryptMessage);

export default router;