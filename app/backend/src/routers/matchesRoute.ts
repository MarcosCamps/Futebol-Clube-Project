import { Router } from 'express';
import { listOfMatches, addMatch } from '../controllers/matchesController';

require('express-async-errors');

const router = Router();

router.get('/', listOfMatches);
router.post('/', addMatch);

export default router;
