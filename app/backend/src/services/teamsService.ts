import teamsModel from '../database/models/teams';

const getTeams = async (): Promise<any> => {
  const teams = await teamsModel.findAll({
    raw: true,
  });
  return teams;
};

const getTeamById = async (id: number): Promise<any> => {
  const teamById = await teamsModel.findOne({
    where: { id },
    raw: true,
  });
  return teamById;
};

export { getTeams, getTeamById };
