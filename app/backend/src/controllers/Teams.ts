import { Request, Response } from 'express';
import TeamsService from '../services/Teams';

export default class TeamsController {
//   constructor(private teamsService = new TeamsService()) {}
  static async getTeams(_req: Request, res: Response): Promise<Response | void> {
    const teams = await TeamsService.getTeams();
    return res.status(200).json(teams);
  }
}
