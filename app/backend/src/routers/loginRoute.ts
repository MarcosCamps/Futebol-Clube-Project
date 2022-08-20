import { Router } from 'express';
import Controller from '../controllers/loginController';
import Service from '../services/loginService';
import { validateToken } from '../middleware/validateToken';

require('express-async-errors');

const loginService = new Service();
const loginController = new Controller(loginService);

const router = Router();

router.get('/validate', validateToken);
router.post('/', loginController.login);

export default router;
