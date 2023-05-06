import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard';

const msgError = 'Internal Server Error';

export default class LeaderBoardController {
  public static async getHomeLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const response = await LeaderBoardService.getHomeLeaderboard();
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(msgError);
    }
  }

  public static async getAwayLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const response = await LeaderBoardService.getAwayLeaderboard();
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(msgError);
    }
  }

  public static async leaderBoard(req: Request, res: Response): Promise<void> {
    try {
      const response = await LeaderBoardService.leaderBoard();
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(msgError);
    }
  }
}
