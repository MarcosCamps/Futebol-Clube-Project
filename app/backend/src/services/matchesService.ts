import { NextFunction } from 'express';
import matchesModel from '../database/models/matches';
import teamsModel from '../database/models/teams';
import { iMatches } from '../interfaces/iMatches';
import ThrowError from '../middleware/ThrowError';

const getListOfMatches = async (): Promise<iMatches[]> => {
  const teams = await matchesModel.findAll({
    include: [
      {
        model: teamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: teamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ],
  });
  return teams;
};
const notPossible = 'It is not possible to create a match with two equal teams';

const validateTeams = (match: iMatches, next: NextFunction) => {
  const { homeTeam, awayTeam } = match;
  if (homeTeam === awayTeam) return next(new ThrowError(401, notPossible));
};

const createMatch = async (match: iMatches): Promise<iMatches> => {
  match.inProgress = true;
  const data = await matchesModel.create(match);
  return data;
};

const finishMatch = async (id: number) => {
  await matchesModel.update({
    inProgress: false,
  }, { where: { id } });
  return true;
};

export { getListOfMatches, createMatch, finishMatch, validateTeams };
