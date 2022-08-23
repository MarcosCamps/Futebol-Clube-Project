import { NextFunction, Request, Response } from 'express';
import getListOfMatches from '../services/matchesService';

const listOfMatches = async (_req: Request, res: Response, _next: NextFunction) => {
  const getAllTeams = await getListOfMatches();
  res.status(200).json(getAllTeams);
};

export default listOfMatches;
