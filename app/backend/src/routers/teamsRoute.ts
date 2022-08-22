import { Router } from 'express';
import teams from '../controllers/teamsController';

require('express-async-errors');

const router = Router();

router.get('/', teams);

export default router;
