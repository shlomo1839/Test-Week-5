import express from 'express';
import * as msssgControl from '../controllers/messages.js';


const router = express.Router();


router.route('/api/messages/')
    .post(msssgControl.encryptMessage)
    .post(msssgControl.decryptMessage)

export default router;