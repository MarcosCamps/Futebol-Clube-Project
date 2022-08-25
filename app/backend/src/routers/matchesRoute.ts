import { Router } from 'express';
import {
  listOfMatches,
  addMatch,
  matchFinished,
  updatingMatch,
} from '../controllers/matchesController';
import tokenInvalid from '../middleware/invalidToken';

require('express-async-errors');

const router = Router();

router.get('/', listOfMatches);
router.post('/', tokenInvalid, addMatch);
router.patch('/:id', updatingMatch);
router.patch('/:id/finish', matchFinished);

export default router;
