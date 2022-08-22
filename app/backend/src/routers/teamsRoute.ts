import { Router } from 'express';
import { teams, getById } from '../controllers/teamsController';

require('express-async-errors');

const router = Router();

router.get('/', teams);
router.get('/:id', getById);

export default router;
