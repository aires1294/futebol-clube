import { Request, Response } from 'express';
import MatchesService from '../services/Matches';

export default class MatchesController {
  static async getMatches(_req: Request, res: Response): Promise< Response | void> {
    const matches = await MatchesService.getMatches();
    return res.status(200).json(matches);
  }
}
