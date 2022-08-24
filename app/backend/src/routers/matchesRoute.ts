import { Router } from 'express';
import { listOfMatches, addMatch, matchFinished } from '../controllers/matchesController';

require('express-async-errors');

const router = Router();

router.get('/', listOfMatches);
router.post('/', addMatch);
router.patch('/:id/finish', matchFinished);

export default router;
