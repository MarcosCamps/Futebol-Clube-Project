import matchesModel from '../database/models/matches';
import teamsModel from '../database/models/teams';
import { iMatches } from '../interfaces/iMatches';

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
export { getListOfMatches, createMatch, finishMatch };
