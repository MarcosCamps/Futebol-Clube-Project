import { NextFunction, Request, Response } from 'express';
import { getListOfMatches, createMatch, finishMatch,
  validateTeams, updateMatch } from '../services/matchesService';

const listOfMatches = async (_req: Request, res: Response, _next: NextFunction) => {
  const getAllTeams = await getListOfMatches();
  res.status(200).json(getAllTeams);
};

const addMatch = async (req: Request, res: Response, next: NextFunction) => {
  await validateTeams(req.body, next);
  const newMatch = await createMatch(req.body);
  return res.status(201).json(newMatch);
};

const matchFinished = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await finishMatch(+id);
  return res.status(200).json({ message: 'Finished' });
};

const updatingMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await updateMatch(+id, homeTeamGoals, awayTeamGoals);
  return res.status(200).json({ message: 'Updated' });
};

export { listOfMatches, addMatch, matchFinished, updatingMatch };
