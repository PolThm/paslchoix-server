import express from 'express';

import {isUserAuth, login, register} from "../controllers/UserController";

const router = express.Router();

router.post('/register', register)
router.post ('/login', login)
router.get('/is-user-auth', isUserAuth )

export default router;