import { Request, Response } from 'express';
import MatchesService from '../services/Matches';

export default class MatchesController {
  static async getMatches(req: Request, res: Response): Promise< Response | void> {
    const { inProgress } = req.query;
    console.log('estou aqui', inProgress);
    if (inProgress === undefined) {
      const matches = await MatchesService.getAllMatches();
      return res.status(200).json(matches);
    }

    const matches = await MatchesService
      // .getMatches(inProgress as unknown as boolean);
      .getMatches(inProgress === 'true');

    return res.status(200).json(matches);
  }
}
