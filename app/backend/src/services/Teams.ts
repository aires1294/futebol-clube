import Teams from '../database/models/Teams';

interface TeamsData {
  id: number;
  teamName: string;
}
export default class TeamsService {
  static async getTeams(): Promise<TeamsData[]> {
    const teams = await Teams.findAll();
    return teams;
  }

  static async getTeamById(id: number): Promise<TeamsData | null> {
    const team = await Teams.findByPk(id);
    return team;
  }
}
