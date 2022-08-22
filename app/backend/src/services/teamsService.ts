import teamsModel from '../database/models/teams';

const getTeams = async (): Promise<any> => {
  const teams = await teamsModel.findAll({
    raw: true,
  });
  return teams;
};

export default getTeams;
