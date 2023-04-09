import { Request, Response } from 'express';
import MatchesService from '../services/Matches';

export default class MatchesController {
  static async getMatches(req: Request, res: Response): Promise< Response | void> {
    try {
      const { inProgress } = req.query;
      const matches = await MatchesService.getMatches(inProgress === 'true');
      return res.status(200).json(matches);
    } catch (error) {
      return res.status(400).json({ message: 'Internal server error' });
    }
  }
}
