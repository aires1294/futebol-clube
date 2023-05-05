import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoard';

// export default class LeaderBoardController {
//   constructor(
//     private _serviceLeaderBoard = new LeaderBoardService(),
//   ) {}

//     public async getResultsHome(_req: Request, _res: Response): Promise<Response | void {
//         const leader = await this._serviceLeaderBoard.getAllResults('home');
//         res.status(200).json(leader)
//     }

// }

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
}
