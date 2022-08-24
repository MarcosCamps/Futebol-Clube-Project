import { NextFunction } from 'express';
import matchesModel from '../database/models/matches';
import teamsModel from '../database/models/teams';
import { iMatches } from '../interfaces/iMatches';
import ThrowError from '../middleware/ThrowError';
import { getTeamById } from './teamsService';

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
const teamWithoutId = 'There is no team with such id!';

const validateTeams = async (match: iMatches, next: NextFunction) => {
  const { homeTeam, awayTeam } = match;
  if (homeTeam === awayTeam) return next(new ThrowError(401, notPossible));
  const homeTeamExists = await getTeamById(homeTeam);
  const awayTeamExistis = await getTeamById(awayTeam);
  // const homeTeamExists = await teamsModel.findOne({ where: { id: homeTeam } });
  // const awayTeamExistis = await teamsModel.findOne({ where: { id: awayTeam } });
  if (!homeTeamExists || !awayTeamExistis) return next(new ThrowError(404, teamWithoutId));
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
