import { Request, Response, NextFunction } from 'express';
import filterTeams from '../services/leaderboardService';

const classificationTeam = async (req: Request, res: Response, _next: NextFunction) => {
  const data = await filterTeams();
  res.status(200).json(data);
};

export default classificationTeam;
