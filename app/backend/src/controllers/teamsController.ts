import { NextFunction, Request, Response } from 'express';
import { getTeams, getTeamById } from '../services/teamsService';

const teams = async (_req: Request, res: Response, _next: NextFunction) => {
  const getAllTeams = await getTeams();
  res.status(200).json(getAllTeams);
};

const getById = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const teamId = await getTeamById(+id);
  res.status(200).json(teamId);
};

export { teams, getById };
