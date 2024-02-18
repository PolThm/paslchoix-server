import express from 'express';

import { getUsername, login, register, verifyJWT } from "../controllers/UserController";

const router = express.Router();

router.post('/register', register)
router.post ('/login', login)
router.get('/get-username', getUsername )

export default router;