import express from 'express';
import * as usersControl from '../controllers/users.js';

const router = express.Router();


router.route('/api/auth/')
    .post(usersControl.registerUser)

router.route('/api/users/')
    .post(usersControl.getMyProfile)


export default router;