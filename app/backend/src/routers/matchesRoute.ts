import { Router } from 'express';
import listOfMatches from '../controllers/matchesController';

require('express-async-errors');

const router = Router();

router.get('/', listOfMatches);

export default router;
