import { NextFunction, Request, Response } from 'express';
import { getListOfMatches, createMatch, finishMatch } from '../services/matchesService';
import { validateToken } from '../middleware/validateToken';

const listOfMatches = async (_req: Request, res: Response, _next: NextFunction) => {
  const getAllTeams = await getListOfMatches();
  res.status(200).json(getAllTeams);
};

const addMatch = async (req: Request, res: Response, _next: NextFunction) => {
  await validateToken;
  const newMatch = await createMatch(req.body);
  return res.status(201).json(newMatch);
};

const matchFinished = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await finishMatch(+id);
  return res.status(200).json({ message: 'Finished' });
};

export { listOfMatches, addMatch, matchFinished };
