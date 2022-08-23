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

export default getListOfMatches;
