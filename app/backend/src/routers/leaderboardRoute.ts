import { Router } from 'express';
import classificationTeam from '../controllers/leaderboardController';

require('express-async-errors');

const router = Router();

router.get('/home', classificationTeam);

export default router;
