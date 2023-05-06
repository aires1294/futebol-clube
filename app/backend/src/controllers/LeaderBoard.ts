import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard';

export default class LeaderBoardController {
  public static async getHomeLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const response = await LeaderBoardService.getHomeLeaderboard();
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  public static async getAwayLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const response = await LeaderBoardService.getAwayLeaderboard();
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
