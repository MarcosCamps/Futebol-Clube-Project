import { NextFunction, Request, Response } from 'express';
import getTeams from '../services/teamsService';

const teams = async (_req: Request, res: Response, _next: NextFunction) => {
  const getAllTeams = await getTeams();
  res.status(200).json(getAllTeams);
};

export default teams;
