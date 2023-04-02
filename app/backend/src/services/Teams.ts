// import { Model } from 'sequelize';
import Teams from '../database/models/Teams';
// import sequelize = require('sequelize');

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
