import { Request, Response } from 'express';
import TeamsService from '../services/Teams';

export default class TeamsController {
//   constructor(private teamsService = new TeamsService()) {}
  static async getTeams(_req: Request, res: Response): Promise<Response | void> {
    const teams = await TeamsService.getTeams();
    return res.status(200).json(teams);
  }

  static async getTeamById(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const team = await TeamsService.getTeamById(Number(id));
    return res.status(200).json(team);
  }
}
