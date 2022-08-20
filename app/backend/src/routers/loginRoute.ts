import { Router } from 'express';
import Controller from '../controllers/loginController';
import Service from '../services/loginService';

require('express-async-errors');

const loginService = new Service();
const loginController = new Controller(loginService);

const router = Router();

router.post('/', loginController.login);

export default router;
