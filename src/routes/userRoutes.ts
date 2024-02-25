import express from 'express';

import { getUserAuthInfo, login, register } from "../controllers/UserController";

const router = express.Router();

router.post('/register', register)
router.post ('/login', login)
router.get('/get-user-auth-info', getUserAuthInfo )

export default router;